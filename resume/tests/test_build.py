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
        variants = module.load_variants()
        for key in ('generic', 'genai', 'aiml', 'wireless', 'healthcare', 'finance'):
            self.assertEqual(variants[key].get('minPages'), 3)
            self.assertEqual(variants[key].get('maxPages'), 3)
            self.assertGreaterEqual(variants[key].get('minLastPageChars', 0), 3000)
            self.assertGreaterEqual(variants[key].get('minPageTextChars', 0), 3000)

    def test_academic_variants_have_distinct_page_budgets(self):
        variants = module.load_variants()
        self.assertEqual((variants['faculty']['minPages'], variants['faculty']['maxPages']), (3, 4))
        self.assertEqual((variants['faculty_comprehensive']['minPages'], variants['faculty_comprehensive']['maxPages']), (4, 5))
        self.assertEqual((variants['academic_cv']['minPages'], variants['academic_cv']['maxPages']), (4, 7))

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
        variants = module.load_variants()
        for key in ('generic', 'comprehensive', 'genai', 'aiml', 'wireless', 'healthcare', 'finance'):
            self.assertTrue(variants[key].get('detailedCertificationDescriptions'))
        for key in ('faculty', 'faculty_comprehensive', 'academic_cv'):
            self.assertTrue(variants[key].get('compactCertifications'))

    def test_faculty_sources_and_outputs_are_separate(self):
        folder = Path(__file__).parents[1]
        industry = module.read_json(folder / 'variants.json')
        faculty = module.load_variants()
        for key in ('faculty', 'faculty_comprehensive', 'academic_cv'):
            self.assertNotIn(key, industry)
            self.assertIn(key, faculty)
            self.assertEqual(module.variant_output_dir(folder / 'output', key).name, 'faculty')
        self.assertEqual(module.variant_output_dir(folder / 'output', 'aiml').name, 'industry')

    def test_in_progress_5g_course_is_separately_labeled_in_faculty_documents(self):
        variants = module.load_variants()
        source = module.merge_source(module.read_source(), module.read_json(Path(__file__).parents[1] / 'content.json'))
        course = next(row for row in source['certifications'] if row['id'] == 'coursera-5g-network-fundamentals')
        self.assertEqual(course['status'], 'In progress')
        self.assertEqual(course['progressPercent'], 60)
        self.assertTrue(course['progressEstimated'])
        self.assertFalse(course.get('completionDate'))
        self.assertTrue(course.get('facultyDescription'))
        for key in ('faculty', 'faculty_comprehensive', 'academic_cv'):
            variant = variants[key]
            self.assertIn(course['id'], variant['certificationIds'])
            self.assertEqual(variant['pages'][0][-1]['title'], 'Self-Learning')
            self.assertTrue(variant['facultyLearningLayout'])
            self.assertEqual(variant['headerDegree'], 'Electrical and Computer Engineering')
            self.assertNotIn('Curriculum Vitae', variant['headline'])


    def test_faculty_profile_and_teaching_first_hierarchy(self):
        variants = module.load_variants()
        for key in ('faculty', 'faculty_comprehensive', 'academic_cv'):
            groups = variants[key]['pages'][0]
            self.assertEqual(groups[0]['title'], 'Academic Profile')
            self.assertEqual(groups[0]['items'][0], 'summary')
            self.assertEqual(groups[0]['items'][1]['id'], 'research_interests')
            self.assertEqual(groups[0]['items'][2]['id'], 'dissertation')
            experience = next(item for item in groups if item['title'] == 'Teaching, Research & Professional Experience')
            self.assertEqual(experience['items'][0]['id'], 'teaching_experience')
            self.assertEqual(experience['items'][1], 'teaching_areas')
            experience_ids = [x if isinstance(x, str) else x['id'] for x in experience['items']]
            self.assertIn('academic_experience', experience_ids)
            self.assertIn('industry_experience', experience_ids)
            ids = [x if isinstance(x, str) else x['id'] for group in groups for x in group['items']]
            self.assertEqual(len(ids), len(set(ids)))
            self.assertTrue({'publications', 'projects', 'education', 'skills', 'honors', 'certifications'}.issubset(ids))

    def test_industry_variants_keep_all_sections_with_grouped_hierarchy(self):
        variants = module.load_variants()
        for key in ('generic', 'comprehensive', 'genai', 'aiml', 'wireless', 'healthcare', 'finance'):
            groups = variants[key]['pages'][0]
            self.assertEqual([group['title'] for group in groups], [
                'Professional Profile', 'Professional Experience', 'Education',
                'Selected Projects & Research', 'Certifications & Professional Development'
            ])
            ids = [x if isinstance(x, str) else x['id'] for group in groups for x in group['items']]
            self.assertEqual(set(ids), {'summary', 'skills', 'experience', 'education',
                                        'projects', 'publications', 'certifications'})

    def test_renderer_defines_a_compact_subsection_style(self):
        renderer = (Path(__file__).parents[1] / 'latex_renderer.py').read_text(encoding='utf-8')
        template = (Path(__file__).parents[1] / 'template.tex').read_text(encoding='utf-8')
        self.assertIn('subsection(subtitle)', renderer)
        self.assertIn("entries.append((name, group_title if index == 0 else None, subtitle, True))", renderer)
        self.assertIn(r'\titleformat{\subsection}', template)

    def test_faculty_learning_dates_and_layout_keep_metadata_on_title_row(self):
        renderer_path = Path(__file__).parents[1] / 'latex_renderer.py'
        spec_renderer = importlib.util.spec_from_file_location('faculty_renderer', renderer_path)
        renderer_module = importlib.util.module_from_spec(spec_renderer)
        spec_renderer.loader.exec_module(renderer_module)
        course_month_year = renderer_module.course_month_year
        self.assertEqual(course_month_year('August 12, 2026'), 'Aug 2026')
        self.assertEqual(course_month_year('March 29, 2020'), 'Mar 2020')
        self.assertEqual(course_month_year(''), '')
        renderer = (Path(__file__).parents[1] / 'latex_renderer.py').read_text(encoding='utf-8')
        self.assertIn("begin{tabularx}", renderer)
        self.assertIn("title + r'} & '", renderer)
        self.assertIn("meta.append(tex(course_date))", renderer)
        self.assertNotIn("if len(row['title']) > 42:", renderer)
        self.assertIn("~{row['progressPercent']}%", renderer)

    def test_faculty_publications_use_columns_with_clickable_metadata(self):
        renderer = (Path(__file__).parents[1] / 'latex_renderer.py').read_text(encoding='utf-8')
        self.assertIn("if variant.get('headerDegree'):", renderer)
        self.assertIn("url = row.get('url')", renderer)
        self.assertIn("venue = tex(row.get('venue', ''))", renderer)
        self.assertIn("line2 = year +", renderer)
        self.assertIn("label = 'DOI'", renderer)
        self.assertIn("link(row['title'], url)", renderer)

    def test_faculty_course_descriptions_are_complete_and_short(self):
        variants = module.load_variants()
        source = module.merge_source(module.read_source(), module.read_json(Path(__file__).parents[1] / 'content.json'))
        lookup = {row['id']: row for row in source['certifications']}
        for key in ('faculty', 'faculty_comprehensive', 'academic_cv'):
            for course_id in variants[key]['certificationIds']:
                desc = lookup[course_id].get('facultyDescription')
                self.assertIsNotNone(desc, course_id)
                self.assertTrue(55 <= len(desc) <= 160, course_id)

    def test_header_links_and_right_aligned_course_layout(self):
        text = (Path(__file__).parents[1] / 'latex_renderer.py').read_text(encoding='utf-8')
        template = (Path(__file__).parents[1] / 'template.tex').read_text(encoding='utf-8')
        self.assertIn("contact_lines.append(r'\\ding{41}", text)
        self.assertIn("social_contacts.append(link('Coursera Courses'", text)
        self.assertIn("facultyLearningLayout", text)
        self.assertIn("raggedleft", text)
        self.assertIn('@@DEGREE@@', template)
        self.assertIn('@@TYPOGRAPHY@@', template)

    def test_faculty_has_balanced_research_and_teaching_lists(self):
        for key in ('faculty', 'faculty_comprehensive', 'academic_cv'):
            variant = module.load_variants()[key]
            self.assertGreaterEqual(len(variant.get('researchInterests', [])), 5)
            self.assertLessEqual(len('; '.join(variant['researchInterests'])), 225)
            self.assertLessEqual(len('; '.join(variant['teachingAreas'])), 225)
            self.assertTrue(variant['academicServiceBullets'])
            self.assertTrue(variant['mentoringBullets'])

    def test_faculty_experience_is_variant_specific_and_preserves_results(self):
        config = module.read_json(Path(__file__).parents[1] / 'content.json')
        results = config['experienceOverrides']
        for role in ('ou-research', 'comsats-research-associate', 'uet-research-scholar',
                     'teaching', 'att-current', 'impac'):
            self.assertTrue(results[role]['bulletsByVariant']['faculty'])
        research = ' '.join(results['ou-research']['bulletsByVariant']['faculty'])
        self.assertIn('100', research)
        self.assertIn('30%', research)
        internships = {row['id']: row for row in config['additionalExperience']}
        for role in ('att-labs-2024', 'futurewei-2022', 'att-labs-2022'):
            self.assertTrue(internships[role]['bulletsByVariant']['faculty'])
        self.assertIn('20%', ' '.join(internships['att-labs-2022']['bulletsByVariant']['faculty']))

    def test_faculty_pdf_layout_audit_is_in_both_workflows(self):
        root = Path(__file__).parents[2]
        for file in ('.github/workflows/build-resumes.yml',
                     '.github/workflows/deploy-pages.yml'):
            text = (root / file).read_text(encoding='utf-8')
            self.assertIn('python resume/validate_pdf_layout.py', text)

    def test_lafayette_cv_is_separate_and_teaching_centered(self):
        variants = module.load_variants()
        key = 'faculty_lafayette_college_assistant_professor_ece'
        self.assertIn(key, variants)
        tailored = variants[key]
        self.assertEqual(tailored['experienceText'], 'faculty')
        self.assertTrue(tailored['workAuthorization'].startswith('U.S. work authorization:'))
        self.assertIn('STEM OPT', tailored['workAuthorization'])
        self.assertNotIn('I-485 approved', tailored['workAuthorization'])
        self.assertEqual(tailored.get('pageBreakBefore'), [])
        self.assertIn('wearable-intelligence', tailored['projectIds'])
        self.assertEqual(module.variant_output_dir(Path('output'), key).name, 'faculty')
        self.assertIn('mentoring', tailored['pages'][0][2]['items'])

    def test_master_academic_cv_does_not_force_a_self_learning_page(self):
        cv = module.load_variants()['academic_cv']
        self.assertEqual(cv['pageBreakBefore'], [])
        source = (Path(__file__).parents[1] / 'latex_renderer.py').read_text(encoding='utf-8')
        self.assertNotIn(r'\\begin{minipage}{\\linewidth}', source)
        self.assertIn(r'\\Needspace{6\\baselineskip}', source)
        layout = (Path(__file__).parents[1] / 'validate_pdf_layout.py').read_text(encoding='utf-8')
        self.assertIn('excessive bottom whitespace', layout)

    def test_comprehensive_is_three_page_application_resume(self):
        variants = module.load_variants()
        comprehensive = variants['comprehensive']
        self.assertEqual(comprehensive.get('minPages'), 3)
        self.assertEqual(comprehensive.get('maxPages'), 3)
        self.assertNotEqual(comprehensive.get('projectIds'), 'all')
        self.assertNotEqual(comprehensive.get('certificationIds'), 'all')
        self.assertNotEqual(comprehensive.get('publicationIds'), 'all')


if __name__ == '__main__':
    unittest.main()
