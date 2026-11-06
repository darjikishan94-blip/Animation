# Physics Animations

Step-by-step animations of textbook physics questions. Each animation runs in two ways:

1. **The question** (what opens first): only the situation and the values the question gives, plus a
   *What is asked* panel. Nothing the students have to find, such as a time, a speed, an energy or a
   force, is shown.
2. **The solution** (after **Show answers**): the animation restarts as the full worked solution, with
   every force, time, energy and power, and the calculated values.

Every animation is a single, self-contained `.html` file. It needs no installation and opens in any
web browser (Chrome, Edge, Safari or Firefox, on a computer or a phone).

## The library: every exercise question, Classes 9–12

All end-of-chapter exercise questions of the NCERT physics chapters are here: Class 11 and Class 12 *Physics*,
and the physics chapters of the Class 10 *Science* and Class 9 *Science: Exploration* books — 532 questions,
270 of them animated (the rest, such as multiple-choice, definitions and one-line calculations, have a page with
the question and a full worked answer). Every page opens on the question as given; **Show answers** replays it
as the worked solution.

### Finding a question (for example, Class 11, Chapter 4, Question 8)

1. **By address.** Every question has a fixed address:

   ```
   class-<NN>/<physics|science>/ch<NN>-<chapter-name>/q<NN>.html
   ```

   Class 11, Chapter 4 (Laws of Motion), Question 8 is `class-11/physics/ch04-laws-of-motion/q08.html`.
   Question numbers are always two digits (`q08`, `q15`). Classes 11–12 use `physics`; Classes 9–10 use `science`.
2. **By search.** Open `index.html` (the whole library) → the class → type into the search box, for example
   `4.8`, `chapter 4 question 8`, or a word from the question such as `lift`.
3. **By asking Claude.** `catalog.json` lists every question with its class, chapter, number, title, status and
   file, so Claude (or any program) can look up “Class 11 chapter 4 question 8” directly.

Each chapter folder also has an `index.html` listing all its questions. `PROGRESS.md` shows the counts per chapter.

### Chapters

| Class | Ch | Title | Questions | Animated | Folder |
|---|---|---|---|---|---|
| 9 | 4 | Describing Motion Around Us | 16 | 10 | `class-09/science/ch04-describing-motion-around-us/` |
| 9 | 6 | How Forces Affect Motion | 16 | 10 | `class-09/science/ch06-how-forces-affect-motion/` |
| 9 | 7 | Work, Energy and Simple Machines | 15 | 15 | `class-09/science/ch07-work-energy-and-simple-machines/` |
| 9 | 10 | Sound Waves: Characteristics and Applications | 15 | 10 | `class-09/science/ch10-sound-waves-characteristics-and-applications/` |
| 10 | 9 | Light – Reflection and Refraction | 17 | 8 | `class-10/science/ch09-light-reflection-and-refraction/` |
| 10 | 10 | The Human Eye and the Colourful World | 12 | 4 | `class-10/science/ch10-the-human-eye-and-the-colourful-world/` |
| 10 | 11 | Electricity | 18 | 6 | `class-10/science/ch11-electricity/` |
| 10 | 12 | Magnetic Effects of Electric Current | 9 | 4 | `class-10/science/ch12-magnetic-effects-of-electric-current/` |
| 11 | 1 | Units and Measurement | 17 | 6 | `class-11/physics/ch01-units-and-measurement/` |
| 11 | 2 | Motion in a Straight Line | 18 | 13 | `class-11/physics/ch02-motion-in-a-straight-line/` |
| 11 | 3 | Motion in a Plane | 22 | 13 | `class-11/physics/ch03-motion-in-a-plane/` |
| 11 | 4 | Laws of Motion | 23 | 23 | `class-11/physics/ch04-laws-of-motion/` |
| 11 | 5 | Work, Energy and Power | 23 | 12 | `class-11/physics/ch05-work-energy-and-power/` |
| 11 | 6 | System of Particles and Rotational Motion | 17 | 11 | `class-11/physics/ch06-system-of-particles-and-rotational-motion/` |
| 11 | 7 | Gravitation | 21 | 12 | `class-11/physics/ch07-gravitation/` |
| 11 | 8 | Mechanical Properties of Solids | 16 | 8 | `class-11/physics/ch08-mechanical-properties-of-solids/` |
| 11 | 9 | Mechanical Properties of Fluids | 20 | 9 | `class-11/physics/ch09-mechanical-properties-of-fluids/` |
| 11 | 10 | Thermal Properties of Matter | 20 | 8 | `class-11/physics/ch10-thermal-properties-of-matter/` |
| 11 | 11 | Thermodynamics | 8 | 3 | `class-11/physics/ch11-thermodynamics/` |
| 11 | 12 | Kinetic Theory | 10 | 3 | `class-11/physics/ch12-kinetic-theory/` |
| 11 | 13 | Oscillations | 18 | 9 | `class-11/physics/ch13-oscillations/` |
| 11 | 14 | Waves | 19 | 8 | `class-11/physics/ch14-waves/` |
| 12 | 1 | Electric Charges and Fields | 23 | 6 | `class-12/physics/ch01-electric-charges-and-fields/` |
| 12 | 2 | Electrostatic Potential and Capacitance | 11 | 7 | `class-12/physics/ch02-electrostatic-potential-and-capacitance/` |
| 12 | 3 | Current Electricity | 9 | 5 | `class-12/physics/ch03-current-electricity/` |
| 12 | 4 | Moving Charges and Magnetism | 13 | 6 | `class-12/physics/ch04-moving-charges-and-magnetism/` |
| 12 | 5 | Magnetism and Matter | 7 | 4 | `class-12/physics/ch05-magnetism-and-matter/` |
| 12 | 6 | Electromagnetic Induction | 8 | 4 | `class-12/physics/ch06-electromagnetic-induction/` |
| 12 | 7 | Alternating Current | 8 | 4 | `class-12/physics/ch07-alternating-current/` |
| 12 | 8 | Electromagnetic Waves | 10 | 4 | `class-12/physics/ch08-electromagnetic-waves/` |
| 12 | 9 | Ray Optics and Optical Instruments | 31 | 10 | `class-12/physics/ch09-ray-optics-and-optical-instruments/` |
| 12 | 10 | Wave Optics | 6 | 5 | `class-12/physics/ch10-wave-optics/` |
| 12 | 11 | Dual Nature of Radiation and Matter | 11 | 3 | `class-12/physics/ch11-dual-nature-of-radiation-and-matter/` |
| 12 | 12 | Atoms | 9 | 3 | `class-12/physics/ch12-atoms/` |
| 12 | 13 | Nuclei | 10 | 2 | `class-12/physics/ch13-nuclei/` |
| 12 | 14 | Semiconductor Electronics | 6 | 2 | `class-12/physics/ch14-semiconductor-electronics/` |

(Class 9 Chapter 7 was built earlier as four hand-made pages; its questions open as tabs, for example
`work-energy-q8-q10.html#q9`.)

### Library pages on claude.ai

Each class is also published as a private page on the owner's claude.ai account (the repository files are the
long-term copies):

| Class | Page |
|---|---|
| 9 | <https://claude.ai/artifact/JLJmrQpT5FCYs2vUSu2yki> |
| 10 | <https://claude.ai/artifact/SZTMukovPmUvyPcArvZK2M> |
| 11 | <https://claude.ai/artifact/HsVYfcXvDFgmCCWkxJRWKX> |
| 12 | <https://claude.ai/artifact/V9r416fLZchse2rxut7tbK> |

### How the library is built

The question text, given data, answers and animation code live in `tools/content/class-NN/chNN/`
(`chapter.py` plus `scenes-*.js`); `python3 tools/build_library.py` regenerates every page, the indexes,
`catalog.json` and `PROGRESS.md`. `tools/test_pages.js` checks that every page loads, fits one laptop screen and
draws nothing outside the picture. Where the NCERT text or answer key appears to contain a misprint, the page
says so and shows both values.

## Hand-built pages (Class 9, Chapter 7)

| Class | Subject | Chapter | Question | What it shows | Open | Added |
|---|---|---|---|---|---|---|
| 9 | Science (*Exploration*, NCERT) | 7 · Work, Energy and Simple Machines | Q1 · True or false | One short scene tests each of the five statements: pushing a wall that does not move, lifting a bucket, a box gaining energy, a still stretched rubber band, and a swinging pendulum. | [Q1](class-09/science/ch07-work-energy-and-simple-machines/work-energy-q1-q4.html#q1) | Nov 2026 |
| 9 | Science (*Exploration*, NCERT) | 7 · Work, Energy and Simple Machines | Q2 · Fill in the blanks | One scene per blank: force and displacement, a 1 N force moving a box 1 m, a moving mass, a raised mass, and the same work done in different times. | [Q2](class-09/science/ch07-work-energy-and-simple-machines/work-energy-q1-q4.html#q2) | Nov 2026 |
| 9 | Science (*Exploration*, NCERT) | 7 · Work, Energy and Simple Machines | Q3 · Ball at the top | A ball thrown straight up stops for an instant at its highest point and falls back. The force (*mg*) and the acceleration (*g*) never become zero; only the velocity does. | [Q3](class-09/science/ch07-work-energy-and-simple-machines/work-energy-q1-q4.html#q3) | Nov 2026 |
| 9 | Science (*Exploration*, NCERT) | 7 · Work, Energy and Simple Machines | Q4 · Energy changes | Nine short scenes (truck uphill, watch spring, photosynthesis, dam, matchstick, fire cracker, microphone, bulb, solar panel), each with an energy-flow diagram. | [Q4](class-09/science/ch07-work-energy-and-simple-machines/work-energy-q1-q4.html#q4) | Nov 2026 |
| 9 | Science (*Exploration*, NCERT) | 7 · Work, Energy and Simple Machines | Q5 · Elevator or stairs | A 50 kg student rises 72.5 m, first in an elevator and later up the stairs. The gain in potential energy is the same both ways (36,250 J). | [Q5](class-09/science/ch07-work-energy-and-simple-machines/work-energy-q5-q7.html#q5) | Nov 2026 |
| 9 | Science (*Exploration*, NCERT) | 7 · Work, Energy and Simple Machines | Q6 · Crane | Side by side: a crane lifts mass *m* to the 10th floor in time *t*, and to the 20th floor in 2*t*. Twice the energy, the same power. | [Q6](class-09/science/ch07-work-energy-and-simple-machines/work-energy-q5-q7.html#q6) | Nov 2026 |
| 9 | Science (*Exploration*, NCERT) | 7 · Work, Energy and Simple Machines | Q7 · Raising a flag | Two identical flags are raised with pulleys, one at speed *v* and one at 2*v*. The work done (*mgh*) is the same; the faster one needs twice the power. | [Q7](class-09/science/ch07-work-energy-and-simple-machines/work-energy-q5-q7.html#q7) | Nov 2026 |
| 9 | Science (*Exploration*, NCERT) | 7 · Work, Energy and Simple Machines | Q8 · Scooter and fuel | The same scooter speeds up to the same speed in the same time, first with the man alone (60 kg) and then with his son (40 kg) as well. Fuel used compares as 4 : 5. | [Q8](class-09/science/ch07-work-energy-and-simple-machines/work-energy-q8-q10.html#q8) | Oct 2026 |
| 9 | Science (*Exploration*, NCERT) | 7 · Work, Energy and Simple Machines | Q9 · Seesaw balance | A child (*W*) and an adult (2*W*) sit on a seesaw with sliding seats. At equal distances it tips; the adult slides to *d*/2 and it balances. | [Q9](class-09/science/ch07-work-energy-and-simple-machines/work-energy-q8-q10.html#q9) | Oct 2026 |
| 9 | Science (*Exploration*, NCERT) | 7 · Work, Energy and Simple Machines | Q10 · Ball thrown up | A 2 kg ball is thrown up at 20 m/s and, with air resistance, reaches 19.4 m. Shows the sign of the work done by gravity going up and coming down, and an energy bar. | [Q10](class-09/science/ch07-work-energy-and-simple-machines/work-energy-q8-q10.html#q10) | Oct 2026 |
| 9 | Science (*Exploration*, NCERT) | 7 · Work, Energy and Simple Machines | Q11 · Force graph | A 10 kg block is pushed by the force of Fig. 7.37 while the graph fills in under it. Its speed rises from 6 m/s to about 8.1 m/s; the acceleration is never negative. | [Q11](class-09/science/ch07-work-energy-and-simple-machines/work-energy-q11-q15.html#q11) | Nov 2026 |
| 9 | Science (*Exploration*, NCERT) | 7 · Work, Energy and Simple Machines | Q12 · Moon throw | The same throw on Earth and on the Moon (gravity 1/6). The Earth ball rises to 8 m; the Moon ball rises 6 times higher, to 48 m. | [Q12](class-09/science/ch07-work-energy-and-simple-machines/work-energy-q11-q15.html#q12) | Nov 2026 |
| 9 | Science (*Exploration*, NCERT) | 7 · Work, Energy and Simple Machines | Q13 · Car braking | A 1000 kg car follows Fig. 7.38: 35 m/s from A to B, then braking to rest at C. Its 6,12,500 J of kinetic energy turns into heat. | [Q13](class-09/science/ch07-work-energy-and-simple-machines/work-energy-q11-q15.html#q13) | Nov 2026 |
| 9 | Science (*Exploration*, NCERT) | 7 · Work, Energy and Simple Machines | Q14 · Ball on a track | A 0.5 kg ball on a frictionless track shaped like Fig. 7.39. About 6.3 m/s at P, stops at Q, and never reaches R. | [Q14](class-09/science/ch07-work-energy-and-simple-machines/work-energy-q11-q15.html#q14) | Nov 2026 |
| 9 | Science (*Exploration*, NCERT) | 7 · Work, Energy and Simple Machines | Q15 · Falling coconut | A 1.5 kg coconut falls 10 m onto wet sand (about 14.1 m/s at impact); a magnified close-up shows the 3000 N sand force stopping it in 5 cm. | [Q15](class-09/science/ch07-work-energy-and-simple-machines/work-energy-q11-q15.html#q15) | Nov 2026 |

**Chapter 7 is complete:** all 15 end-of-chapter questions (Revise, Reflect, Refine, NCERT pages 136–138)
have an animation, using the textbook's own wording and figures.

Questions that share a file are tabs on one page. Adding `#q3`, `#q8`, `#q12` and so on to the end of
the address opens that question's tab directly.

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
- **Show answers / Hide answers** (each question has its own button, at the right end of the button bar)
  switches between the two runs and starts the chosen one from the beginning. The solution run adds:
  - the worked answer below the picture;
  - an *Answer* line under each step's explanation;
  - everything the students have to work out, drawn on the animation (times, forces, energy and power
    bars, calculated values such as the 4 : 5 fuel ratio or the work done in joules).

  The page always opens on the question run, so it is safe to show to students first.
- Light and dark mode follow your device's setting.

## Folder layout

```
class-<NN>/<subject>/ch<NN>-<chapter-name>/<topic>-q<first>-q<last>.html
```

For example, `class-09/science/ch07-work-energy-and-simple-machines/work-energy-q8-q10.html`.
Question text is taken word for word from the NCERT textbook, and figures are redrawn from it.
When a new animation is added, it goes in the matching folder and gets a new row in the index above.
Every new animation must also open on a question run that shows only what the question gives, have
the same **Show answers** button for the solution run, and use the same one-screen layout (picture and
button bar fit the window; text column beside the picture).

## Originals

Each file was first published as a page on claude.ai, and the page is updated whenever the file changes.
The online originals are private to the owner's account, so the files in this repository are the
long-term copies.

| File | Original page | Published | Updated |
|---|---|---|---|
| `work-energy-q1-q4.html` | <https://claude.ai/artifact/M9Xmo1qpgRUttsNX66Xj2b> | 2 Nov 2026 | |
| `work-energy-q5-q7.html` | <https://claude.ai/artifact/7LpiQEmGxubu81E81tHkrQ> | 1 Nov 2026 (as Q3–Q7) | 2 Nov 2026: now Q5–Q7 |
| `work-energy-q8-q10.html` | <https://claude.ai/artifact/NQVh5HYwETSH2N1kZBh4oi> | 29 Oct 2026 | 31 Oct: Show answers, one-screen layout; 2 Nov: NCERT wording |
| `work-energy-q11-q15.html` | <https://claude.ai/artifact/3Z2uGaFSGgT4goxPCjC37A> | 1 Nov 2026 | 2 Nov 2026: Q11, Q13, Q14 added |
