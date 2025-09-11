### `Post-Project Reflection (of sorts)`

1. What I set out to build\
   A simple task tracker with CRUD features. The goal was to strengthen my full-stack fundamentals and complete an end-to-end project.

2. What I actually built\
   Full CRUD for tasks and projects, with activity logs\
   Routing with slugs and username\
   Consistent project and task pages with React forms and flows\
   Some basic mongodb schema design with populate() for relations

3. What I learned (Technical)\
   Full-stack workflow\
   Routing design\
   UI/UX consistency\
   State management\
   Performance concerns with populate()

5. What I learned (Non-technical)\
   The importance of scope control. Avoiding getting distracted and finishing features.\
   Structuring work like sprints and not losing focus overtime.\
   Experiencing the grind of daily coding and managing fluctuating motivation.

7. Strengths I demonstrated (I'll say it now, I might be a bit biased here)\
   Persistence. I showed up everyday, sat on the same chair, and kept building.\
   Systems thinking. As I build the app, I started questioning workflows, logging, and deployment beyond just CRUD.\
   Full-stack balance. Improved both frontend and backend skills. To what extent? I'd say past entry-level skills.

8. Weaknesses I noticed\
   Polishing and completeness. I left some features unfinished (account settings, search bar, mobile responsiveness).\
   No tests. No automated validation of reliability.\
   No deployment. I haven't shipped it. It is still in local/dev environment.

9. How this project sets me up for the next one\
  This project gave me a strong grounding in CRUD operations and basic workflows. More importantly, it exposed my gaps — testing, deployment, and polish — which I plan to address in TaskFlow: Workflow Edition, a
larger project with approval workflows, role-based permissions, and production deployment.



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
