<h1 align="center">
  <br>
    <a href="https://gitfest.netlify.app/">
      <img src="src/assets/images/LogoRounded.png" alt="Gitfest" width="200">
    </a>
  <br>
  GitFest
  <br>
</h1>

<h4 align="center">Create a festival lineup
from your top <a href="https://github.com/" target="_blank">Github</a> repositories.</h4>

<p align="center">
  <img src="https://img.shields.io/github/stars/Igorcbraz/GitFest?style=social" alt="GitHub Stars"/>
  <img src="https://api.netlify.com/api/v1/badges/b695242e-c3af-482b-8025-5006cc795938/deploy-status" alt="Netlify Status"/>
  <img src="https://img.shields.io/github/license/Igorcbraz/GitFest" alt="MIT License"/>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#related">Related</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  <img src="src/assets/images/dark-template.png" alt="Final Result"/>
  <br>
  Festival Lineup Result
</p>

## Key Features

- Create your own Lineup, see your repositories like never before
- Dark/Light mode
  - Giving attention to prefer-color-scheme.
- Github OAuth integration
- Github API consuming
- Manipulating SVG
- Save the result as image

## How To Use (Next.js + TypeScript)

This project was migrated from Create React App to Next.js (App Router) with full feature parity. You'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) installed.

```bash
# Clone the repository
git clone https://github.com/Igorcbraz/GitFest
cd GitFest

# Copy environment variables
cp .env.example .env.local
# Edit .env.local and add your Supabase credentials

# Install dependencies
npm install

# Run in development
npm run dev

# Lint
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

The following variables must be set in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_PROJECT_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_API_KEY=your_supabase_anon_key
```

### Production

Deploy on any Next.js compatible platform (Vercel, Netlify with Next adapter, etc.). Ensure the environment variables above are configured in the hosting provider.

### Migration Notes

- React Router replaced by Next.js App Router (`app/` folder).
- Global state and theme context moved to `app/context/AuthContext.tsx`.
- Supabase client now uses `NEXT_PUBLIC_` prefixed variables.
- All interactive components are Client Components ("use client").
- Pages: `Landing` -> `app/page.tsx`, `Home` -> `app/home/page.tsx` (protected by context state).
- Tailwind content paths updated for `app/`.

### Scripts

| Script  | Description                           |
| ------- | ------------------------------------- |
| `dev`   | Starts Next.js in development mode    |
| `build` | Creates an optimized production build |
| `start` | Starts the production server          |
| `lint`  | Runs ESLint (Next.js config)          |

> After migration there is no need for `react-scripts`. All previous functionality (OAuth, theme toggle, repository fetch, SVG generation) was preserved.

## Related

[Instafest](https://www.instafest.app/) - Version to create lineup by your top songs

## Support

<a href="https://www.buymeacoffee.com/igorcbraz" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/white_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

## You may also like...

- [Calculator](https://github.com/Igorcbraz/Calculadora) - Explain prefer-color-scheme with calculator project

## License

MIT

---

> [igorcbraz.me](https://igorcbraz.me) &nbsp;&middot;&nbsp;
> GitHub [@Igorcbraz](https://github.com/Igorcbraz) &nbsp;&middot;&nbsp;
> Linkedin [@Igorcbraz](https://www.linkedin.com/in/igorcbraz/)
