"""Guard factual selection and PDF markup boundaries, rather than styling."""
import importlib.util
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('resume_build', Path(__file__).parents[1] / 'build.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class SelectionTests(unittest.TestCase):
    def test_hidden_record_never_selected_even_explicitly(self):
        rows = [{'id': 'private', 'published': False}, {'id': 'public'},
                {'id': 'resume-hidden', 'resumePublished': False}]
        self.assertEqual(module.select(rows, ['private', 'public', 'resume-hidden']), [rows[1]])
        self.assertEqual(module.select(rows, 'all'), [rows[1]])

    def test_bad_id_fails_loudly(self):
        with self.assertRaises(ValueError):
            module.select([{'id': 'correct'}], ['typo'])

    def test_awarded_curriculum_is_not_replaced_by_catalog_total(self):
        row = {'id': 'rag', 'courses': [{}] * 10,
               'reportedProgress': {'completed': 8, 'total': 8}}
        self.assertEqual(module.progress(row), '8/8 courses')

    def test_incomplete_course_array_does_not_invent_ratio(self):
        self.assertEqual(module.progress({'id': 'fundamentals', 'courses': [{}] * 3}), '')

    def test_urls_and_markup(self):
        self.assertEqual(module.web_url('javascript:alert(1)'), '')
        self.assertEqual(module.web_url('./private.pdf'), '')
        self.assertIn('&lt;', module.esc('<script>'))
        self.assertIn('href="https://example.com/a?x=1&amp;y=2"',
                      module.anchor('Course', 'https://example.com/a?x=1&y=2'))

    def test_placeholder_dates_do_not_print(self):
        for value in ['Date to update', 'Target date to be updated', '', 'Completed']:
            self.assertEqual(module.date_label(value), '')
        self.assertEqual(module.date_label('February 2026'), '02/2026')
        self.assertEqual(module.date_label('Feb. 2025–Present'), '02/2025 - Present')
        self.assertEqual(module.date_label('Sep. 2024–Dec. 2024'), '09/2024 - 12/2024')

    def test_resume_only_visibility_can_override_website_hidden(self):
        self.assertTrue(module.eligible({'id': 'finance', 'published': False, 'resumePublished': True}))
        self.assertFalse(module.eligible({'id': 'hidden', 'published': False}))
        self.assertFalse(module.eligible({'id': 'resume-hidden', 'published': True, 'resumePublished': False}))

    def test_mojibake_punctuation_is_normalized(self):
        self.assertEqual(module.clean('AT&T Â· 2025â€“Present'), 'AT&T | 2025-Present')

    def test_contact_header_is_not_joined_character_by_character(self):
        renderer = (Path(__file__).parents[1] / 'latex_renderer.py').read_text(encoding='utf-8')
        self.assertIn('CONTACTS=contacts', renderer)
        self.assertNotIn("CONTACTS=r' \\quad '.join(filter(None, contacts))", renderer)


class LatexEscapingTests(unittest.TestCase):
    def test_course_titles_escape_latex_special_characters(self):
        import importlib.util

        path = Path(__file__).parents[1] / 'latex_renderer.py'
        spec = importlib.util.spec_from_file_location('resume_latex_renderer', path)
        renderer = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(renderer)

        self.assertEqual(
            renderer.tex('R&D 50%_AI {LLM} #1 $10 ~ ^ | < > \\'),
            r'R\&D 50\%\_AI \{LLM\} \#1 \$10 \textasciitilde{} \textasciicircum{} '
            r'\textbar{} \textless{} \textgreater{} \textbackslash{}',
        )

    def test_zero_course_progress_is_suppressed(self):
        self.assertEqual(module.progress({'id': 'x', 'reportedProgress': {'completed': 0, 'total': 4}}), '')
        self.assertEqual(module.progress({'id': 'x', 'reportedProgress': {'completed': 2, 'total': 4}}), '2/4 courses')

    def test_focused_variants_define_page_fill_target(self):
        variants = module.read_json(Path(__file__).parents[1] / 'variants.json')
        for key in ('generic', 'genai', 'aiml', 'wireless', 'healthcare', 'finance'):
            self.assertEqual(variants[key].get('minPages'), 3)
            self.assertEqual(variants[key].get('maxPages'), 3)
            self.assertGreaterEqual(variants[key].get('minLastPageChars', 0), 3000)
            self.assertGreaterEqual(variants[key].get('minPageTextChars', 0), 3000)

    def test_academic_variants_have_distinct_page_budgets(self):
        variants = module.read_json(Path(__file__).parents[1] / 'variants.json')
        self.assertEqual((variants['faculty']['minPages'], variants['faculty']['maxPages']), (3, 4))
        self.assertEqual((variants['faculty_comprehensive']['minPages'], variants['faculty_comprehensive']['maxPages']), (4, 5))
        self.assertEqual((variants['academic_cv']['minPages'], variants['academic_cv']['maxPages']), (5, 7))

    def test_utf8_output_writer_handles_phone_symbol(self):
        import importlib.util

        path = Path(__file__).parents[1] / 'latex_renderer.py'
        spec = importlib.util.spec_from_file_location('resume_latex_renderer_utf8', path)
        renderer = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(renderer)

        with tempfile.TemporaryDirectory() as temp:
            target = Path(temp) / 'extracted.txt'
            renderer.write_utf8_text(target, '☎ +1 732-803-9703 | résumé')
            self.assertEqual(target.read_text(encoding='utf-8'), '☎ +1 732-803-9703 | résumé')

    def test_latex_renderer_uses_explicit_utf8_for_text_io(self):
        source = (Path(__file__).parents[1] / 'latex_renderer.py').read_text(encoding='utf-8')
        self.assertIn("encoding='utf-8'", source)
        self.assertNotIn("write_text('\\n'.join(texts))", source)

    def test_reusable_variants_require_detailed_certifications(self):
        variants = module.read_json(Path(__file__).parents[1] / 'variants.json')
        for key in ('generic', 'comprehensive', 'genai', 'aiml', 'wireless', 'healthcare', 'finance'):
            self.assertTrue(variants[key].get('detailedCertificationDescriptions'))
        for key in ('faculty', 'faculty_comprehensive', 'academic_cv'):
            self.assertTrue(variants[key].get('compactCertifications'))

    def test_comprehensive_is_three_page_application_resume(self):
        variants = module.read_json(Path(__file__).parents[1] / 'variants.json')
        comprehensive = variants['comprehensive']
        self.assertEqual(comprehensive.get('minPages'), 3)
        self.assertEqual(comprehensive.get('maxPages'), 3)
        self.assertNotEqual(comprehensive.get('projectIds'), 'all')
        self.assertNotEqual(comprehensive.get('certificationIds'), 'all')
        self.assertNotEqual(comprehensive.get('publicationIds'), 'all')


if __name__ == '__main__':
    unittest.main()
