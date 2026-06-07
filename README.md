# CHRONOS - Luxury Watch E-Commerce Page

A product page was built for a fictional luxury watch brand called CHRONOS. The idea was to make something that actually looks and feels like a real online store, not just a basic HTML exercise.

No frameworks were used. Everything is plain HTML, CSS, and JavaScript.

Live demo: https://mohamedibrahim26.github.io/chronos-ecommerce

---

## Why I built this

I wanted to challenge myself with something more visual than a simple to-do app. E-commerce pages have a lot going on at once - animations, cart logic, user interactions, responsive layouts. I thought it would be a good way to practice all of that in one project.

---

## What it does

**Cart**
- You can add items to the cart from both the product grid and the featured section
- The cart slides in from the right as a drawer
- Quantity can be adjusted, items can be removed
- Everything saves to localStorage so it stays even after you refresh
- There are promo codes too: try `CHRONOS20` or `SAVE10`

**Product section**
- Six watches in a grid with filter tabs (All, Classic, Sport, Limited)
- Hovering a card reveals a quick add button
- The featured product section has a gallery switcher, color swatches, size selector, and a live countdown timer
- Stock level and an accordion for specs and shipping info

**Animations and visuals**
- The hero watch shows the actual current time and has a ticking second hand
- There is a 3D tilt effect on the hero and gallery that follows the mouse
- Cards and sections animate in as you scroll down
- Custom cursor with a ring that lags slightly behind for a premium feel
- Toast notifications pop up for cart actions

**Reviews section**
- Shows a rating breakdown with animated bars
- Three sample review cards with verified badges

---

## File structure

```
CHRONOS-Ecommerce/
├── index.html    - page structure and layout
├── styles.css    - all the styling and animations
└── script.js     - cart logic, interactions, DOM updates
```

---

## Tech used

- HTML5
- CSS3 (custom properties, keyframes, flexbox, grid)
- Vanilla JavaScript (ES6+)
- localStorage for cart persistence
- Google Fonts (Playfair Display, Inter)
- Hosted on GitHub Pages

---

## Running it locally

```bash
git clone https://github.com/mohamedibrahim26/chronos-ecommerce.git
cd chronos-ecommerce
```

Then just open `index.html` in your browser. No installs needed.

---

## Things I learnt

Working on this helped me get more comfortable with a few things I had only touched on before. The `IntersectionObserver` API for scroll animations was new to me. Getting the drag tilt effect to feel smooth with `requestAnimationFrame` took a bit of trial and error. The cart logic also got more complex than I expected once I added quantity controls and promo discounts.

