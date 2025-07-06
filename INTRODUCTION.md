# Front-End Challenge

## 1. First look

- I kicked things off by mapping what actually could be evaluated:
  - React 18 already wired up, plus Jest and a tiny Express mock server.
  - The API latency is intentionally slow.
  - The scope is small, you can spin this up without using a full framework.

## 2. Two core problems

1. **Routing workflow**

- Routes are part of the spec, so I need to stop users from jumping to the next step.
  - React Router loaders run before a route renders, perfect for this project.

2. **Slow `colors` API request**

- Freezing the UI for 3 s between steps would be a UX crime.
  - Goal: handle the component later and cache the data when the user retries.

## 3. Solving the API lag problem

- At first I thought the challenge was about showing off React 18 features, maybe they wanted to see concurrency being managed here.
- But `use()` only lands in **React 19**, I was overthinking hard here.
- The real challenge was clear: **that slow colors API**. Users can't wait 3+ seconds staring at a blank screen.
- This is why I decided to keep a tool that can handle this scenario: **React Query**.
  - Perfect for this scenario: automatic loading states, error handling, and request caching
  - If users go back and forth between steps, the colors are cached, no more waiting
  - Built-in retry logic and error boundaries keep the UX smooth even when the API hiccups
  - Maybe a bazooka for this challenge, but it buys me speed and bulletproof cache control.

## 4. The password dilemma

- The API wants all fields at once, meaning I have to stash the password for the confirmation page.
- Storing raw passwords in a state store makes my eye twitch, but the spec doesn't let me split the endpoint.
- I parked the concern for now.

## 5. Picking a state store

- Initially I started with **Context API** since it was simpler for this small project.
- But then I hit a wall, I needed to access state inside React Router loaders, and that's where Context API falls short (it is doable with a workaround).
- I'd been reading [Daishi Kato's blog](https://blog.axlight.com/posts/thoughts-on-state-management-libraries-in-the-react-compiler-era/) about React Compiler and React Server Components, which left me pretty confused about the future of state management, we're in a moment of big changes and that creates some uncertainty.
- So I switched gears and considered my options:

| Candidate     | Why I passed                                                  |
| ------------- | ------------------------------------------------------------- |
| Context API   | Ran into trouble accessing state inside React Router loaders. |
| Redux Toolkit | Overkill for a two-page app.                                  |
| **Zustand**   | Lives _outside_ React, dead-simple API. Winner.               |

Zustand made perfect sense for this specific problem. I threw together a minimal class to house everything. I had to revisit it later on to organize it, but worth it.

## 6. Project scaffolding

- Time to organize the project. I didn't think twicem I grabbed a battle tested folder structure I'm familiar with and it fit like a glove.
- It's based on the [Bulletproof React](https://github.com/alan2207/bulletproof-react) pattern, but I simplified it for this challenge:
  - I'm not using the feature folder strcure.
  - Inside **`app/`** I keep `routes`, `providers`, `pages`.
  - Instead of the usual `api` folder structure, I created a **`services/`** folder for React Query hooks, makes it easier for reviewers to find the data fetching logic.

## 7. Styling choices

- Thought about Material UI, but it's looking kinda dated and clunky.
- Went with **shadcn/ui** components + Tailwind, already battle tested in my projects and super quick to style.
- Bonus: shadcn has an implementation of a signup block and plays nicely with `react-hook-form` + **Zod validation schemas**.

## 8. Lint, format, repeat

- Had to make sure I wouldn't fail since the goal was to nail this challenge, so I installed **Prettier** and **ESLint**, tweaked package scripts, cleaned up folders.
- Built out the UI with shadcn pieces and went hands on with the functionality.
- Also configured **path aliases** for clean imports, and added **Lucide React** icons for consistent iconography.

## 9. Tests

- I had some issues with my setup to the project, so I lose a little bit of time here to fix it.
- I can burn hours on testing, so I went straight to **React Testing Library**, a testing approach I'm comfortable with.
- Wrote some basics, honestly spent the least time here, but there's definitely room to improve this.

## 10. What still bugs me

- **Password in the store**. Leaving it there is giving me insomnia, but I didn't want to create a hash in the frontend just to soothe my conscience, seemed like overkill for the exercise.
- Test coverage could be way deeper, but time was ticking.
- Not using Web Content Accessibility Guidelines

## 11. Wrap-up

In roughly six hours I:

1. Audited the repo and spotted the real evaluation points.
2. Locked in React Router loaders for route-guarding.
3. Deployed React Query to hide API lag.
4. Started with Context API, hit a wall with loaders, switched to Zustand.
5. Implemented a battle-tested folder structure.
6. Styled everything with shadcn/ui + Tailwind.
7. Wired up ESLint/Prettier, wrote sanity-check tests.

Next steps: cleaner password handling and test hardening, but for the challenge's scope, I'm happy with the balance between polish and pragmatism.
