<div align="center">

# 🏋️ FitLog

**Workout Library. Train hard, log honest.**

A fast, responsive workout library where you browse lifts, check the details, and build a daily training plan.

</div>

---

## 📖 About

FitLog is a workout library web app built with Next.js. Browse a curated set of lifts covering every major muscle group, open any workout for full details, then add it to today's plan or save it for later. Track your totals, sort your list, and tick off exercises as you finish them.

## 🛠 Technologies Used

| Category | Tools |
| --- | --- |
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| UI Library | React |
| Styling | Tailwind CSS, daisyUI |
| Notifications | React Toastify |
| Fonts | Oswald via `next/font` |
| Images | `next/image` |

## ✨ Key Features

1. **Workout Library:** a responsive grid of workouts showing muscle groups, equipment, duration, calories and rating, with a loading animation while data is fetched.
2. **Workout Details:** a dedicated page for every workout, with toast feedback when you add it to your plan or save it for later.
3. **My Plan:** switch between **Today's Plan** and **Saved** tabs, with live totals for exercises, minutes and calories.
4. **Sort & Organise:** sort your list by Duration, Calories or Rating.
5. **Mark as Done & Remove:** complete or remove workouts in one click, with a toast confirming each action.

Also included: a custom 404 page, a fully responsive layout (mobile, tablet, desktop), and safe page reloads after deployment.



## 📁 Project Structure

```
src/
├── app/
│   ├── components/      # Shared UI, providers, page sections
│   ├── my-plan/         # /my-plan route
│   ├── workouts/[id]/   # Workout details route
│   └── not-found.tsx    # 404 page
├── assets/              # Logo and banner images
└── lib/                 # Workout data
```

<div align="center">
© 2026 FitLog — Workout Library. Train hard, log honest.
</div>