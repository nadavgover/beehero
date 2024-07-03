import { CSSProperties } from 'react'

const PaletteColorNumber = {
  50: 50,
  100: 100,
  200: 200,
  300: 300,
  400: 400,
  500: 500,
  600: 600,
  700: 700,
  800: 800,
  900: 900,
  950: 950,
} as const

// eslint-disable-next-line @typescript-eslint/no-redeclare
type PaletteColorNumber = (typeof PaletteColorNumber)[keyof typeof PaletteColorNumber]

type ColorDefinition = Record<PaletteColorNumber, CSSProperties['color']>

export const palette: Record<string, ColorDefinition> = {
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
}
