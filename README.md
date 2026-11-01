# Physics Animations

Step-by-step animations of textbook physics questions. Each one sets up the situation exactly as the
question describes it, then plays out what the physics predicts. Every animation opens with the answers
hidden; a **Show answers** button reveals them when you are ready.

Every animation is a single, self-contained `.html` file. It needs no installation and opens in any
web browser (Chrome, Edge, Safari or Firefox, on a computer or a phone).

## Index

| Class | Subject | Chapter | Question | What it shows | Open | Added |
|---|---|---|---|---|---|---|
| 9 | Science (*Exploration*, NCERT) | 7 · Work, Energy and Simple Machines | Q3 · Ball at the top | A ball thrown straight up stops for an instant at its highest point and falls back. Arrows show that the force (*mg*) and the acceleration (*g*) never become zero; only the velocity does. Students tick the four statements. | [Q3](class-09/science/ch07-work-energy-and-simple-machines/work-energy-q3-q7.html#q3) | Nov 2026 |
| 9 | Science (*Exploration*, NCERT) | 7 · Work, Energy and Simple Machines | Q5 · Elevator or stairs | A 50 kg student rises 72.5 m, first in an elevator and later up the stairs. The gain in potential energy is the same both ways (36,250 J): it depends only on the height. | [Q5](class-09/science/ch07-work-energy-and-simple-machines/work-energy-q3-q7.html#q5) | Nov 2026 |
| 9 | Science (*Exploration*, NCERT) | 7 · Work, Energy and Simple Machines | Q7 · Raising a flag | Two identical flags are raised with pulleys, one at speed *v* and one at 2*v*. The work done (*mgh*) is the same; the faster one needs twice the power. | [Q7](class-09/science/ch07-work-energy-and-simple-machines/work-energy-q3-q7.html#q7) | Nov 2026 |
| 9 | Science (*Exploration*, NCERT) | 7 · Work, Energy and Simple Machines | Q8 · Scooter and fuel | The same scooter speeds up to the same speed in the same time, first with the man alone (60 kg) and then with his son (40 kg) as well. Fuel energy used is compared with the kinetic energy gained. | [Q8](class-09/science/ch07-work-energy-and-simple-machines/work-energy-q8-q10.html#q8) | Oct 2026 |
| 9 | Science (*Exploration*, NCERT) | 7 · Work, Energy and Simple Machines | Q9 · Seesaw balance | A child (*W*) and an adult (2*W*) sit on a seesaw with sliding seats. At equal distances it tips; the adult slides to *d*/2 and it balances. | [Q9](class-09/science/ch07-work-energy-and-simple-machines/work-energy-q8-q10.html#q9) | Oct 2026 |
| 9 | Science (*Exploration*, NCERT) | 7 · Work, Energy and Simple Machines | Q10 · Ball thrown up | A 2 kg ball is thrown up at 20 m/s and, with air resistance, reaches 19.4 m. Shows the sign of the work done by gravity going up and coming down, and an energy bar. | [Q10](class-09/science/ch07-work-energy-and-simple-machines/work-energy-q8-q10.html#q10) | Oct 2026 |
| 9 | Science (*Exploration*, NCERT) | 7 · Work, Energy and Simple Machines | Q12 · Ball on the Moon | The same throw on Earth and on the Moon (gravity 1/6). The Earth ball rises to 8 m; the Moon ball rises 6 times higher, to 48 m. | [Q12](class-09/science/ch07-work-energy-and-simple-machines/work-energy-q11-q15.html#q12) | Nov 2026 |
| 9 | Science (*Exploration*, NCERT) | 7 · Work, Energy and Simple Machines | Q15 · Falling coconut | A 1.5 kg coconut falls 10 m onto wet sand (about 14.1 m/s at impact), and a magnified close-up shows the 3000 N sand force stopping it in 5 cm. | [Q15](class-09/science/ch07-work-energy-and-simple-machines/work-energy-q11-q15.html#q15) | Nov 2026 |

Questions that share a file are tabs on one page. Adding `#q3`, `#q8`, `#q12` and so on to the end of
the address opens that question's tab directly.

**Still to do in Chapter 7:** Q1 (true or false), Q2 (fill in the blanks) and Q4 (energy transformations)
are not motion problems, so how to animate them is still to be decided. Q6 (the crane) is waiting for the
textbook's exact wording, because it can be read in two ways. Q11, Q13 and Q14 are waiting for the
textbook's graphs (Fig. 7.37, 7.38 and 7.39).

## How to open an animation

**Option 1: website (easiest, once switched on).** On GitHub, open this repository's
**Settings → Pages**. Under *Build and deployment*, set *Source* to **Deploy from a branch**, choose
**main** and **/ (root)**, then click **Save**. After a minute or two the whole collection is at
<https://darjikishan94-blip.github.io/Animation/>, and the links in the index above open the animations
directly. Example:
<https://darjikishan94-blip.github.io/Animation/class-09/science/ch07-work-energy-and-simple-machines/work-energy-q8-q10.html#q9>

**Option 2: download the file.** Click the file on GitHub, choose **Download raw file** (the download
icon), then double-click the downloaded `.html` file. It opens in your browser and works offline. (Without
internet it uses your computer's standard fonts instead of the original ones; everything else is the same.)

Clicking an `.html` file on GitHub itself only shows its source code, not the animation.

## Controls

On a laptop, desktop or projector, the whole animation and all its buttons fit on one screen with no
scrolling. The picture sizes itself to the window, the buttons sit in one bar directly under it, and
the question and step explanation are in a column beside it. (On a phone the same parts are stacked.)

- **Play / Pause**: the Play button, a click on the picture, or the Space bar.
- **Step by step**: the ◀ ▶ buttons, the arrow keys, or the numbered step buttons below the picture.
- **Speed**: 0.5×, 1× or 1.5×. Tick *Pause after each step* to stop at every stage. (Both are in the
  column beside the picture.)
- **Show answers / Hide answers** (each question has its own button, at the right end of the button bar) reveals:
  - the worked answer below the picture;
  - an *Answer* line under each step's explanation;
  - the calculated values drawn on the animation itself (for example the 4 : 5 fuel ratio, the turning
    effects in *Wd*, and the work done in joules).

  The answers start hidden every time the page opens, so the page is safe to show to students first.
- Light and dark mode follow your device's setting.

## Folder layout

```
class-<NN>/<subject>/ch<NN>-<chapter-name>/<topic>-q<first>-q<last>.html
```

For example, `class-09/science/ch07-work-energy-and-simple-machines/work-energy-q8-q10.html`.
When a new animation is added, it goes in the matching folder and gets a new row in the index above.
Every new animation must also open with its answers hidden, have the same **Show answers** button, and
use the same one-screen layout (picture and button bar fit the window; text column beside the picture).

## Originals

Each file was first published as a page on claude.ai, and the page is updated whenever the file changes.
The online originals are private to the owner's account, so the files in this repository are the
long-term copies.

| File | Original page | Published | Updated |
|---|---|---|---|
| `work-energy-q3-q7.html` | <https://claude.ai/artifact/7LpiQEmGxubu81E81tHkrQ> | 1 Nov 2026 | |
| `work-energy-q8-q10.html` | <https://claude.ai/artifact/NQVh5HYwETSH2N1kZBh4oi> | 29 Oct 2026 | 31 Oct 2026: Show answers button and one-screen layout added |
| `work-energy-q11-q15.html` | <https://claude.ai/artifact/3Z2uGaFSGgT4goxPCjC37A> | 1 Nov 2026 | |
