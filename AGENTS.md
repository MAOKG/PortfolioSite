# AGENTS.md

Purpose
This file helps agentic coding tools work in this repo without guessing. Keep changes aligned with existing tooling and conventions.

Repository overview
- Static personal website built with HTML, Sass, JavaScript, and jQuery.
- Bundled via Webpack; styles compiled from Sass; assets processed by loaders.

Commands (Yarn)
- Install: `yarn`
- Dev server: `yarn dev` (webpack-dev-server)
- Production build: `yarn build:prod` (webpack -p)
- Lint JS: `yarn lint` (eslint on `*.js`)
- Format JS: `yarn format` (prettier with repo options)

Tests
- No tests are configured in this repo. Do not add test instructions unless tests are introduced.

Cursor/Copilot rules
- No `.cursor/rules/`, `.cursorrules`, or `.github/copilot-instructions.md` detected.

Project layout
- `src/index.html`: HTML template loaded by HtmlWebpackPlugin.
- `src/js/app.js`: JS entry; imports styles/assets and bootstraps behavior.
- `src/js/functions.js`: DOM behavior, animations, and interactions (jQuery).
- `src/css/main.scss`: Sass entry; imports variables/mixins/base/partials.
- `src/css/base`: base styles and normalize.
- `src/css/partials`: section-specific styles.
- `src/css/utils`: variables, mixins, and Bourbon utilities.
- `src/assets`: images, icons, PDFs, robots.txt.

Tooling and configuration
- ESLint: AirBnB + Prettier in `.eslintrc.json`.
- Parser: `babel-eslint`; ECMAScript 2016; modules; JSX enabled.
- Rule override: allow `_id` for `no-underscore-dangle`.
- EditorConfig: 2-space indent, LF, trim trailing whitespace, final newline.
- Prettier (via script): single quotes, 120 print width, tab width 2, Flow parser.
- Babel: ES2015 + Stage-1 + env targets (last 2 browser versions), class properties, dynamic import.
- PostCSS: autoprefixer.

JavaScript style guidelines
- Use ES modules (`import`/`export`) and keep imports at the top of the file.
- Prefer single quotes and 2-space indentation to match Prettier and EditorConfig.
- Keep line length within 120 characters (Prettier setting).
- Use `const` by default; use `let` only when reassignment is required.
- Prefer named functions for readability in handlers; arrow functions are common for callbacks.
- Class names use PascalCase (e.g., `AboutAnimation`); functions/variables use camelCase.
- DOM interactions use jQuery; keep selectors consistent with existing patterns.
- Avoid unused imports and unused variables; adhere to ESLint defaults (AirBnB).
- Only use leading underscore for `_id` (per ESLint rule exception).
- Keep side-effect imports explicit (e.g., styles/assets in `app.js`).

Error handling expectations
- This is a client-only site; prefer guard checks over heavy error handling.
- For DOM operations, verify elements exist before use when behavior depends on them.
- Avoid throwing from UI event handlers unless you add explicit user-visible handling.

Sass/CSS conventions
- Entry file is `src/css/main.scss`; add new partials here in a logical section.
- Keep variables in `src/css/utils/_variables.scss` and mixins in `src/css/utils/_mixins.scss`.
- Use nested selectors sparingly and only to reflect DOM hierarchy (see `_header.scss`).
- Naming is class-based with BEM-ish modifiers (`.header`, `& &_logo`, `&.isOpen`).
- Prefer variables for colors and fonts; current palette lives in `_variables.scss`.
- Import order in `main.scss`: utils → base → partials.
- Maintain 2-space indentation, LF line endings, and trailing newline.
- Use Bourbon helpers where present; avoid duplicating Bourbon utilities.

Webpack/asset conventions
- JS entry: `src/js/app.js`.
- Sass compiled to `main.css` via ExtractTextPlugin.
- Assets (images/SVG/PDF/txt) are handled by url-loader/file-loader rules.
- Keep asset references relative to `src/` and import them from JS when needed.

When editing
- Follow existing conventions instead of introducing new frameworks or patterns.
- Keep changes minimal and scoped to the intended feature or fix.
- Do not modify build scripts unless necessary for the task.
