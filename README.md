# Jess-pardy!

`Jess-pardy!` is a custom birthday-themed trivia game built for Jess using Next.js, React, TypeScript, and Tailwind CSS. It recreates a Jeopardy-style game board with team setup, score tracking, special challenge rounds, and a Final Jeopardy flow.

## What The App Does

- Lets the host create teams before starting the game.
- Shows a 5-category by 5-value trivia board.
- Opens each clue in a modal with reveal and scoring controls.
- Supports special `Jess Challenge` questions with double points and no penalty on failure.
- Includes manual score adjustments for the host during play.
- Runs a Final Jess-pardy round with secret wagers, judging, and winner reveal.
- Saves the current game state in `sessionStorage`, so a refresh does not immediately wipe progress in the same browser session.

## Tech Stack

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open the app:

[`http://localhost:3000`](http://localhost:3000)

## Available Scripts

- `npm run dev` starts the local development server.
- `npm run build` creates a production build.
- `npm run start` runs the production build locally.
- `npm run lint` runs ESLint.

## Game Flow

1. Add at least two teams on the setup screen.
2. Start the game to reveal the main board.
3. Pick the team selecting the next clue.
4. Reveal the answer and award points to the correct team.
5. Use the host controls to reset a question, adjust scores, or start Final Jess-pardy.
6. Lock wagers, judge the final responses, and reveal the winner.

## Content And Data

- Question content is defined in `src/lib/questions.ts`.
- Core game state and persistence live in `src/lib/useGameState.ts`.
- The main game screen is rendered from `src/app/page.tsx`.
- UI pieces for the board, clue modal, rules, team bar, and final round live in `src/components/`.

## Notes

- There are no environment variables required for local development right now.
- Progress is stored per browser session, so using the `Reset Game` button or clearing browser session storage will start fresh.

## GitHub

Remote repository:

[`https://github.com/adam-stanco/jesspardy`](https://github.com/adam-stanco/jesspardy)
