# React Template

## Dependency Included

- React Router
- Tailwindcss

## Theme Variable

- **`--bg`, `--bg-2`, `--bg-3`**: Form the background layers of your application. The app transitions cleanly from high contrast in Light mode to deep space tones in Dark mode.
- **`--surface`, `--surface-2`**: Control component backgrounds. Elements like cards, panels, and dropdowns sit on `--surface` to distinguish them from the body grid.
- **`--border`, `--border-2`**: Handle separating borders. `--border-2` provides extra contrast for elements like inputs or active visual segments.
- **`--text`, `--text-2`, `--text-3`**: Structure typographic hierarchy. Primary reading relies on `--text`, descriptions use `--text-2`, and fields like input placeholders utilize `--text-3`.
- **`--accent`, `--accent-hover`, `--accent-light`**: The core branding engine. It handles button highlights, focus rings, text selection fills, and active indicators.
- **`--success`, `--warning`, `--danger` (along with `-light` pairings)**: Standard state metrics for status alerts, destructive processes (like delete buttons), validation forms, and success messages.

### Key Classes Included

1. **`.card`**: Applies a structural background box with clean border-radii.
2. **`.btn-primary`, `.btn-ghost`, `.btn-danger`**: Interactive button variants complete with hover translation micro-interactions.
3. **`.input` & `.label`**: Semantic input styling featuring a fluid focus highlight generated via CSS `color-mix()`.
4. **`.fade-up`**: An elegant introductory `@keyframes` animation.
5. **`.no-print`**: Instantly isolates and hides components (like sidebars or navbar links) from rendering if a user attempts to print the page.
