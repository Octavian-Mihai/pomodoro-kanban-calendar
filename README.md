<p align="center">
  <img src="https://i.postimg.cc/hvjXfB94/icon.png" width="360"/>
</p>

<p align="center">
  <a href="https://github.com/Octavian-Mihai/pomodoro-kanban-calendar/releases/latest">
    <img src="https://img.shields.io/github/v/release/Octavian-Mihai/pomodoro-kanban-calendar?cacheSeconds=60" />
  </a>
  <a href="https://github.com/Octavian-Mihai/pomodoro-kanban-calendar/releases/latest">
    <img src="https://img.shields.io/github/downloads/Octavian-Mihai/pomodoro-kanban-calendar/total?cacheSeconds=60" />
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/license-GPL--3.0-blue" />
  </a>
</p>

<h1 align="center">Pomodoro Logger :clock930:</h1>
<p align="center"><b>Invest your time easily.</b></p>

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for an architecture diagram.

> This is a fork of [zxch3n/PomodoroLogger](https://github.com/zxch3n/PomodoroLogger), built for **macOS on
> Apple Silicon**, with task deadlines and a cross-board task calendar added on top. See
> [What's New in This Fork](#whats-new-in-this-fork) for details.

Pomodoro Logger combines a [Pomodoro timer](https://en.wikipedia.org/wiki/Pomodoro_Technique), a
[Kanban board](https://en.wikipedia.org/wiki/Kanban_board), and local activity tracking, so you can plan your
work, focus on it, and see afterward where your time actually went — all without sending any data off your
machine.

<img align="right" src="https://i.postimg.cc/0j8FJ70x/image.png" height="280"/>

- Run focus/rest sessions with the [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique)
- Organize and schedule your tasks on an integrated Kanban board
- Set deadlines on tasks and see them all on a calendar
- Track which apps and windows you use during a session, **locally**
- Get an efficiency score for each session based on how much you got distracted

<br clear="right"/>

## Table of Contents

- [Pomodoro Technique](#pomodoro-technique-tomato)
- [Kanban Board](#kanban-board)
- [What's New in This Fork](#whats-new-in-this-fork)
- [Efficiency Analysis](#efficiency-analysis)
- [Data & Privacy](#data--privacy-chart_with_upwards_trend)
- [Download](#download)
- [Screenshots](#screenshots)
- [Development](#development)
- [Contribution](#contribution)
- [License](#license)

## Pomodoro Technique :tomato:

A Pomodoro session is a 25-minute focus block followed by a 5-minute break. During a focus block you work on
one task and ignore everything else — it's a simple habit that makes a real dent in procrastination and work
fatigue.

While you're focused, Pomodoro Logger quietly records the name and title of whatever app is in the foreground.
Titles carry a surprising amount of context on their own:

- `Pomodoro Technique - Wikipedia - Google Chrome`
- `DeepMind (@DeepMindAI) | Twitter - Google Chrome`
- `pomodoro-logger [~/code/pomodoro-logger] Application.tsx - WebStorm`

Because each session is linked back to the Kanban card you were working on, you can later see how often you
were pulled away by email or social apps, and how your time actually split across tasks — a much clearer
picture of your working hours than a plain timer gives you.

## Kanban Board

Tasks live on a Kanban board with `Todo`, `In Progress`, and `Done` lists (you can add more, but `In Progress`
and `Done` are required so the app can track and analyze time spent). Give a card an estimated time, and while
you're focused on it, Pomodoro Logger links your session to it automatically and tallies up the actual time
spent.

Keeping the `In Progress` list short — ideally just the one thing you're actually doing — makes those
estimates a lot more meaningful.

## What's New in This Fork

- **Task deadlines.** Cards have a "To Do Before" field. Set a deadline when creating or editing a card and it
  shows up as a color-coded badge — blue, amber within 24 hours, red once overdue. Cards in a list automatically
  reorder by soonest deadline first, with undated cards sinking to the bottom.
- **Calendar tab.** A new tab aggregates every deadline across all of your boards in one place. Switch between
  a month calendar and a scrollable list view, see overdue / due-today / upcoming counts at a glance, and click
  any task to jump straight to its card.
- **Native Apple Silicon build.** The `.dmg` is a genuine arm64 build — no Rosetta translation needed on
  M1/M2/M3/M4 Macs — and a couple of unmaintained native dependencies that didn't support Apple Silicon were
  removed so the app installs and builds cleanly on modern Macs.

## Efficiency Analysis

Pomodoro Logger keeps a configurable list of "distracting" apps. Whenever one of them shows up during a focus
session, your efficiency score for that session drops. Efficiency is calculated with
[a simple heuristic](./src/shared/efficiency/efficiency.png) and shown as a set of dots — the larger the hole
in a dot, the less efficient that session was.

<p align="center">
  <img width="150px" src="https://i.postimg.cc/Kzth8088/da.gif"/>
</p>

Click a dot to see that session's breakdown in detail:

<p align="center">
    <img width="600px" src="https://i.postimg.cc/SKWhN9Vb/image.png"/>
</p>

## Data & Privacy :chart_with_upwards_trend:

Pomodoro Logger only records activity while you're in a focus session, and only the name and title of the
focused application — nothing about the content on screen. All data is stored and processed **locally**; none
of it leaves your machine. You can import, export, or delete all of it at any time from Settings.

## Download

**macOS (Apple Silicon only).**

Go to the [releases page](https://github.com/Octavian-Mihai/pomodoro-kanban-calendar/releases/latest) and
download the `.dmg`.

> **First launch:** this build isn't notarized by Apple (notarization requires a paid Apple Developer Program
> membership), so Gatekeeper will say it "cannot be opened because the developer cannot be verified." Right-click
> the app in Finder and choose **Open** (or go to **System Settings → Privacy & Security → Open Anyway**) the
> first time you launch it. This is a one-time step.

Need Windows, Linux, or an Intel Mac build? This fork doesn't ship those — see the
[upstream project's releases](https://github.com/zxch3n/PomodoroLogger/releases) instead.

## Screenshots

| **Pomodoro** | **Show Countdown in Tray** |
|:-:|:-:|
| <img src="https://i.postimg.cc/Fs87Gx0w/choose-Focuse.gif" width="256"/> | <img src="https://i.postimg.cc/LsMhF6CT/tray.png" width="256"/> |
| **Session Finished** | **Switch Mode** |
| <img src="https://i.postimg.cc/fT9wWQ0g/session-Finished.gif" height="256"/> | <img src="https://i.postimg.cc/DZp202gR/switch-Mode.gif" height="256"/> |
| **Kanban Board** | **Draggable Card** |
| <img src="https://i.postimg.cc/rs136CfV/Kanban-Board.png" height="256"/> | <img src="https://i.postimg.cc/7Zrqft3P/moving-Around.gif" height="256"/> |
| **Estimate Your Time Spent** | **Search Your Cards** |
| <img src="https://i.postimg.cc/HxRzScHp/todo.png" height="256"/> | <img src="https://i.postimg.cc/CLBKZf97/search-Card.gif" height="256"/> |

| **Visualization** |
|:-:|
| <img src="https://i.postimg.cc/CKH5hT9V/vis.png" width="512"/> |
| <img src="https://i.postimg.cc/d150CRqH/vis1.png" width="512"/> |

## Development

```bash
yarn install       # install dependencies
yarn start         # run in dev mode (renderer + main, hot reload)
yarn build          # production build of renderer + main
yarn dist-mac       # build + package the arm64 .dmg with electron-builder
yarn test           # run the Jest test suite
yarn lint           # run tslint
```

## Contribution

Found a bug or have an idea for this fork? [Open an issue here](https://github.com/Octavian-Mihai/pomodoro-kanban-calendar/issues).

For the general contribution workflow, see [the Contribution Guide](./.github/CONTRIBUTION.md) from the
upstream project.

## License

[GPL-3.0 License](./LICENSE)

Copyright © 2019 Zixuan Chen.
