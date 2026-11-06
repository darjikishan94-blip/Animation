"""Build the physics animation library from tools/content.

    python3 -I tools/build_library.py            (run from the repository root)

For every chapter folder tools/content/class-NN/chNN/ with a chapter.py it writes
  class-NN/<subject>/chNN-<slug>/qNN.html   one page per exercise question (animated or worked answer only)
  class-NN/<subject>/chNN-<slug>/index.html the chapter's question list
(<subject> is 'physics' for Classes 11-12 and 'science' for the physics chapters of the Class 9-10 Science books.)
  class-NN/index.html                     the class library (also the claude.ai artifact's main page)
  class-NN/assets/engine.{js,css}         the shared engine (copied from tools/engine)
and at the repository root: index.html (the whole library), catalog.json (machine-readable list) and PROGRESS.md.

chapter.py defines CHAPTER = {'questions': [Q, ...]} where each Q has
  num ('4.8'), short (a few words), question (NCERT text, HTML), given [..], asked, drawn [..], answer [..], final,
  alt (canvas description) and scene ('q08.js', a file next to chapter.py defining `const SCENE = {...}`),
  or scene None with note (why there is no animation: the page then shows the question and a worked answer only).
"""
import json
import os
import re
import shutil
import sys
from html import escape

ROOT = os.getcwd()
TOOLS = os.path.join(ROOT, 'tools')
sys.path.insert(0, TOOLS)
from plan import PLAN  # noqa: E402

FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n'
         '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
         '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900'
         '&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap">')
EXTRA_PAGES = [   # pages built earlier by hand, listed in the library as they are
    {'class': 9, 'subject': 'science', 'chapter': 7, 'title': 'Work, Energy and Simple Machines', 'book': 'Science: Exploration (NCERT, Class 9)',
     'pages': [('Q1–Q4', 'class-09/science/ch07-work-energy-and-simple-machines/work-energy-q1-q4.html', ['7.1', '7.2', '7.3', '7.4']),
               ('Q5–Q7', 'class-09/science/ch07-work-energy-and-simple-machines/work-energy-q5-q7.html', ['7.5', '7.6', '7.7']),
               ('Q8–Q10', 'class-09/science/ch07-work-energy-and-simple-machines/work-energy-q8-q10.html', ['7.8', '7.9', '7.10']),
               ('Q11–Q15', 'class-09/science/ch07-work-energy-and-simple-machines/work-energy-q11-q15.html', ['7.11', '7.12', '7.13', '7.14', '7.15'])]},
]


def head(title, css):
    return (f'<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
            f'<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
            f'<title>{escape(title)}</title>\n{FONTS}\n<link rel="stylesheet" href="{css}">\n</head>\n<body>\n')


def li(items, ind='          '):
    return '\n'.join(f'{ind}<li>{x}</li>' for x in items)


def facts(q):
    return f'''    <div class="facts">
      <div>
        <h3>Given</h3>
        <ul>
{li(q['given'])}
        </ul>
      </div>
      <div>
        <h3>Asked</h3>
        <p>{q['asked']}</p>
      </div>
      <div>
        <h3>{'How the animation is drawn' if q.get('scene') else 'Why there is no animation'}</h3>
        <ul>
{li(q['drawn'] if q.get('scene') else [q.get('note', 'This question is a calculation with no physical situation to show.')])}
        </ul>
      </div>
      <div class="answer" hidden>
        <h3>Answer</h3>
        <ol>
{li(q['answer'])}
        </ol>
        <p class="final">{q['final']}</p>
      </div>
    </div>
'''


def question_page(cls, ch, q, prev_q, next_q, chdir):
    n = q['num']
    title = f'Class {cls} {lbl(cls)} · Exercise {n}'
    crumbs = (f'<a href="../../index.html">Class {cls} {lbl(cls)}</a> · '
              f'<a href="index.html">Ch. {ch["num"]} {escape(ch["title"])}</a>')
    nav = []
    nav.append(f'<a href="{prev_q["file"]}.html">‹ {prev_q["num"]}</a>' if prev_q else '<span>‹</span>')
    nav.append('<a href="index.html">All questions</a>')
    nav.append(f'<a href="{next_q["file"]}.html">{next_q["num"]} ›</a>' if next_q else '<span>›</span>')
    top = (f'  <header class="top solo">\n    <div class="titles">\n      <p class="eyebrow">{crumbs}</p>\n'
           f'      <h1>Exercise {n} · {escape(q["short"])}</h1>\n    </div>\n'
           f'    <nav class="qnav" aria-label="Questions">{"".join(nav)}</nav>\n  </header>\n\n')
    foot = (f'  <p class="foot">Question from the NCERT {escape(PLAN_BY_CLASS[cls]["book"])}, Chapter {ch["num"]} '
            f'({escape(ch["title"])}), Exercises. ')
    css = '../../assets/engine.css'
    if q.get('scene'):
        fname, _, block = q['scene'].partition('#')
        scene = open(os.path.join(chdir, fname), encoding='utf-8').read()
        if block:                                # several scenes in one file, each starting with a line //@@ <name>
            parts = re.split(r'^//@@ (\S+)\s*$', scene, flags=re.M)
            scene = dict(zip(parts[1::2], parts[2::2]))[block]
        body = (head(title, css) + '<div class="wrap">\n' + top +
                f'''  <section class="panel solo" id="q" aria-label="Exercise {n}">
    <div class="bench">
      <div class="view">
        <div class="stage" tabindex="0" title="Click to play or pause"><canvas width="960" height="540" role="img" aria-label="{escape(q['alt'])}"></canvas></div>
        <p class="narrow-hint">Scroll sideways inside the picture, or turn your phone sideways for a bigger view.</p>
        <div class="ctl"></div>
      </div>
      <div class="side">
        <p class="qline"><b>{n}</b> {q['question']}</p>
      </div>
    </div>
{facts(q)}  </section>

''' + foot + 'The first run shows only what the question gives; Show answers replays it as the full worked solution. '
                'Click the picture or press Space to play or pause; the arrow keys move between steps.</p>\n</div>\n'
                '<script src="../../assets/engine.js"></script>\n<script>\n' + scene +
                '\nEngine.mount(SCENE);\n</script>\n</body>\n</html>\n')
    else:
        body = (head(title, css) + '<div class="wrap">\n' + top +
                f'''  <section class="panel solo" id="q" aria-label="Exercise {n}">
    <p class="qline"><b>{n}</b> {q['question']}</p>
    <p><button type="button" class="btn reveal" id="show" aria-pressed="false" style="margin-left:0">Show answer</button></p>
{facts(q)}  </section>

''' + foot + '</p>\n</div>\n<script>\n'
                "const b = document.getElementById('show'), a = document.querySelector('.answer');\n"
                "b.addEventListener('click', () => { a.hidden = !a.hidden; b.setAttribute('aria-pressed', String(!a.hidden)); "
                "b.textContent = a.hidden ? 'Show answer' : 'Hide answer'; });\n</script>\n</body>\n</html>\n")
    return body


def chapter_index(cls, ch, qs):
    items = []
    for q in qs:
        st = 'animation' if q.get('scene') else 'worked answer'
        items.append(f'    <li><span class="n">{q["num"]}</span><span><a href="{q["file"]}.html">{escape(q["short"])}</a>'
                     f'<span class="tx">{escape(strip(q["question"]))[:150]}…</span></span><span class="st">{st}</span></li>')
    return (head(f'Class {cls} {lbl(cls)} · Ch. {ch["num"]} {ch["title"]}', '../../assets/engine.css') +
            f'<div class="wrap lib">\n  <p class="eyebrow"><a href="../../index.html">Class {cls} {lbl(cls)}</a></p>\n'
            f'  <h1>Ch. {ch["num"]} · {escape(ch["title"])}</h1>\n'
            f'  <p class="lede">NCERT exercise questions. Each animation opens on the question as given; press Show answers for the worked solution.</p>\n'
            f'  <ol class="qlist">\n' + '\n'.join(items) + '\n  </ol>\n</div>\n</body>\n</html>\n')


def strip(html):
    return re.sub(r'<[^>]+>', '', html)


SEARCH_JS = """<script>
const box = document.getElementById('find');
box.addEventListener('input', () => {
  const words = box.value.toLowerCase().split(/\\s+/).filter(Boolean);
  for (const el of document.querySelectorAll('[data-find]')) el.hidden = !words.every(w => el.dataset.find.includes(w));
});
</script>
"""


def class_index(cls, built):
    plan = PLAN_BY_CLASS[cls]
    cards = []
    rows = []
    for (num, title, slug, code) in plan['chapters']:
        b = built.get(num)
        if b:
            n_anim = sum(1 for q in b['questions'] if q.get('scene'))
            cards.append(f'    <a class="card" href="{sub(cls)}/ch{num:02d}-{slug}/index.html" data-find="{escape(f"ch {num} chapter {num} {title}".lower())}">'
                         f'<span class="k">Chapter {num}</span><span class="t">{escape(title)}</span>'
                         f'<span class="s">{len(b["questions"])} questions · {n_anim} animated</span></a>')
            for q in b['questions']:
                rows.append(f'    <li data-find="{escape((f"{q["num"]} ch {num} chapter {num} q {q["num"].split(".")[-1]} question {q["num"].split(".")[-1]} " + title + " " + q["short"] + " " + strip(q["question"])).lower())}" hidden>'
                            f'<span class="n">{q["num"]}</span><span><a href="{sub(cls)}/ch{num:02d}-{slug}/{q["file"]}.html">{escape(q["short"])}</a>'
                            f'<span class="tx">Ch. {num} {escape(title)}</span></span><span class="st">{"animation" if q.get("scene") else "worked answer"}</span></li>')
        elif (cls, num) in EXTRA_BY_CH:
            e = EXTRA_BY_CH[(cls, num)]; rel = lambda pth: pth.split('/', 1)[1]
            n_q = sum(len(x[2]) for x in e['pages'])
            cards.append(f'    <a class="card" href="{rel(e["pages"][0][1])}" data-find="{escape(f"ch {num} chapter {num} {title}".lower())}">'
                         f'<span class="k">Chapter {num}</span><span class="t">{escape(title)}</span><span class="s">{n_q} questions · all animated</span></a>')
            for (lab, pth, nums) in e['pages']:
                for qn in nums:
                    k = qn.split('.')[-1]
                    rows.append(f'    <li data-find="{escape(f"{qn} ch {num} chapter {num} q {k} question {k} {title}".lower())}" hidden>'
                                f'<span class="n">{qn}</span><span><a href="{rel(pth)}#q{k}">Question {qn}</a><span class="tx">Ch. {num} {escape(title)}</span></span><span class="st">animation</span></li>')
        else:
            cards.append(f'    <div class="card" data-find="{escape(f"ch {num} chapter {num} {title}".lower())}"><span class="k">Chapter {num}</span>'
                         f'<span class="t">{escape(title)}</span><span class="s">coming soon</span></div>')
    return (head(f'Class {cls} {lbl(cls)} Animations', 'assets/engine.css') +
            f'<div class="wrap lib">\n  <p class="eyebrow">NCERT exercise animations{"" if sub(cls) == "physics" else " · physics chapters of " + escape(plan["book"])}</p>\n  <h1>Class {cls} {lbl(cls)}</h1>\n'
            f'  <p class="lede">Every exercise question, chapter by chapter. Type to find a question, for example “4.8” or “chapter 4 question 8” or “lift”.</p>\n'
            f'  <input class="search" id="find" type="search" placeholder="Find a chapter or question…" aria-label="Find a chapter or question">\n'
            f'  <div class="cards">\n' + '\n'.join(cards) + '\n  </div>\n'
            f'  <h2 style="margin-top:24px">Matching questions</h2>\n  <ol class="qlist">\n' + '\n'.join(rows) + '\n  </ol>\n</div>\n' +
            SEARCH_JS.replace("el.hidden = !words.every", "el.hidden = (el.tagName === 'LI' && !words.length) || !words.every") +
            '</body>\n</html>\n')


def root_index(built_all):
    cards = []
    for p in PLAN:
        cls = p['class']
        done = len(built_all.get(cls, {})) + sum(1 for e in EXTRA_PAGES if e['class'] == cls)
        cards.append(f'    <a class="card" href="class-{cls:02d}/index.html"><span class="k">Class {cls}</span><span class="t">{escape(p["book"])}</span>'
                     f'<span class="s">{done} of {len(p["chapters"])} chapters ready</span></a>')
    for e in EXTRA_PAGES:
        if e['class'] in PLAN_BY_CLASS: continue   # listed inside its class page
        for (lab, path, nums) in e['pages']:
            cards.append(f'    <a class="card" href="{path}"><span class="k">Class {e["class"]} · Ch. {e["chapter"]} · {lab}</span>'
                         f'<span class="t">{escape(e["title"])}</span><span class="s">{escape(e["book"])}</span></a>')
    return (head('Physics Animation Library', 'class-11/assets/engine.css') +
            '<div class="wrap lib">\n  <p class="eyebrow">NCERT exercise animations</p>\n  <h1>Physics Animation Library</h1>\n'
            '  <p class="lede">Step-by-step animations of NCERT exercise questions. Each one opens on the question as given; '
            'Show answers replays it as the full worked solution.</p>\n  <div class="cards">\n' + '\n'.join(cards) +
            '\n  </div>\n</div>\n</body>\n</html>\n')


PLAN_BY_CLASS = {p['class']: p for p in PLAN}
EXTRA_BY_CH = {(e['class'], e['chapter']): e for e in EXTRA_PAGES}
sub = lambda cls: PLAN_BY_CLASS[cls]['subject']
lbl = lambda cls: 'Physics' if sub(cls) == 'physics' else 'Science'


def main():
    built_all, catalog = {}, []
    for p in PLAN:
        cls = p['class']
        cdir = os.path.join(ROOT, f'class-{cls:02d}')
        built = {}
        for (num, title, slug, code) in p['chapters']:
            chdir = os.path.join(TOOLS, 'content', f'class-{cls:02d}', f'ch{num:02d}')
            cfile = os.path.join(chdir, 'chapter.py')
            if not os.path.exists(cfile):
                if (cls, num) in EXTRA_BY_CH: continue   # hand-built pages, catalogued below
                catalog.append({'class': cls, 'subject': p['subject'], 'chapter': num, 'chapter_title': title, 'status': 'planned',
                                'ncert_pdf': f'https://ncert.nic.in/textbook/pdf/{code}.pdf'})
                continue
            env = {}
            exec(open(cfile, encoding='utf-8').read(), env)
            qs = env['CHAPTER']['questions']
            for q in qs:
                q['file'] = 'q' + q['num'].split('.')[-1].zfill(2)
            ch = {'num': num, 'title': title}
            out = os.path.join(cdir, p['subject'], f'ch{num:02d}-{slug}')
            os.makedirs(out, exist_ok=True)
            for i, q in enumerate(qs):
                html = question_page(cls, ch, q, qs[i - 1] if i else None, qs[i + 1] if i + 1 < len(qs) else None, chdir)
                open(os.path.join(out, q['file'] + '.html'), 'w', encoding='utf-8').write(html)
                catalog.append({'class': cls, 'subject': p['subject'], 'chapter': num, 'chapter_title': title, 'question': q['num'],
                                'title': q['short'], 'status': 'animated' if q.get('scene') else 'worked answer',
                                'file': f'class-{cls:02d}/{p["subject"]}/ch{num:02d}-{slug}/{q["file"]}.html',
                                'text': strip(q['question'])})
            open(os.path.join(out, 'index.html'), 'w', encoding='utf-8').write(chapter_index(cls, ch, qs))
            built[num] = {'questions': qs}
        if built or any(e['class'] == cls for e in EXTRA_PAGES):
            os.makedirs(os.path.join(cdir, 'assets'), exist_ok=True)
            for f in ('engine.js', 'engine.css'):
                shutil.copy(os.path.join(TOOLS, 'engine', f), os.path.join(cdir, 'assets', f))
            open(os.path.join(cdir, 'index.html'), 'w', encoding='utf-8').write(class_index(cls, built))
        built_all[cls] = built
    for e in EXTRA_PAGES:
        for (lab, path, nums) in e['pages']:
            for n in nums:
                catalog.append({'class': e['class'], 'subject': e['subject'], 'chapter': e['chapter'], 'chapter_title': e['title'],
                                'question': n, 'status': 'animated', 'file': path + '#q' + n.split('.')[-1]})
    open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8').write(root_index(built_all))
    json.dump(catalog, open(os.path.join(ROOT, 'catalog.json'), 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
    lines = ['# Progress', '', 'Generated by tools/build_library.py. A chapter is done when tools/content/class-NN/chNN/chapter.py exists.', '']
    for p in PLAN:
        lines += [f'## Class {p["class"]}', '', '| Ch | Title | Status | Questions | Animated |', '|---|---|---|---|---|']
        for (num, title, slug, code) in p['chapters']:
            b = built_all[p['class']].get(num)
            if b:
                lines.append(f'| {num} | {title} | done | {len(b["questions"])} | {sum(1 for q in b["questions"] if q.get("scene"))} |')
            elif (p['class'], num) in EXTRA_BY_CH:
                n_q = sum(len(x[2]) for x in EXTRA_BY_CH[(p['class'], num)]['pages'])
                lines.append(f'| {num} | {title} | done (hand-built pages) | {n_q} | {n_q} |')
            else:
                lines.append(f'| {num} | {title} | pending | | |')
        lines.append('')
    open(os.path.join(ROOT, 'PROGRESS.md'), 'w', encoding='utf-8').write('\n'.join(lines))
    print('built', {k: sorted(v) for k, v in built_all.items()})


if __name__ == '__main__':
    main()
