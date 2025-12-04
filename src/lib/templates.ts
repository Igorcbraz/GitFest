export type ThemeId = 'dark' | 'light' | 'gitfest-rio'

export interface ThemeSpec {
  id: ThemeId
  templateDomId: string
  getCss: () => Promise<string> | string
  fonts?: Array<{ name: string; path: string; replaceToken: string }>
}

async function loadTemplate1Css(): Promise<string> {
  const { readFileSync } = await import('node:fs')
  const path = await import('node:path')
  const cssPath = path.join(process.cwd(), 'src', 'components', 'Templates', 'Dark', 'styles.css')
  return readFileSync(cssPath, 'utf-8')
}

async function loadRockInRioCss(): Promise<string> {
  const { readFileSync } = await import('node:fs')
  const path = await import('node:path')
  const cssPath = path.join(process.cwd(), 'src', 'components', 'Templates', 'RockInRio', 'styles.css')
  return readFileSync(cssPath, 'utf-8')
}

export const ThemeRegistry: Record<ThemeId, ThemeSpec> = {
  dark: {
    id: 'dark',
    templateDomId: 'dark-template',
    getCss: loadTemplate1Css,
    fonts: [
      { name: 'Bebas Kai', path: '/fonts/BebasKai.otf', replaceToken: 'url(\'../fonts/BebasKai.otf\')' },
      { name: 'Lolapeluza', path: '/fonts/Lolapeluza.ttf', replaceToken: 'url(\'../fonts/Lolapeluza.ttf\')' }
    ]
  },
  light: {
    id: 'light',
    templateDomId: 'dark-template',
    getCss: loadTemplate1Css,
    fonts: [
      { name: 'Bebas Kai', path: '/fonts/BebasKai.otf', replaceToken: 'url(\'../fonts/BebasKai.otf\')' },
      { name: 'Lolapeluza', path: '/fonts/Lolapeluza.ttf', replaceToken: 'url(\'../fonts/Lolapeluza.ttf\')' }
    ]
  },
  'gitfest-rio': {
    id: 'gitfest-rio',
    templateDomId: 'gitfest-rio-template',
    getCss: loadRockInRioCss,
    fonts: [
      { name: 'Helvetica Neue', path: '/fonts/HelveticaNeue-medium.otf', replaceToken: 'url(\'../fonts/HelveticaNeue-medium.otf\')' },
    ]
  }
}

export function getThemeSpec(theme: ThemeId): ThemeSpec {
  return ThemeRegistry[theme]
}
