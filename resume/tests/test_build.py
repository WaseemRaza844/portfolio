"""Guard factual selection and PDF markup boundaries, rather than styling."""
import importlib.util
from pathlib import Path
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
        self.assertEqual(module.date_label('February 2026'), 'February 2026')


if __name__ == '__main__':
    unittest.main()
