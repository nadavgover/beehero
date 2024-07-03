import React, { CSSProperties } from 'react'
import styled, { css } from 'styled-components'
import { palette } from '../theme/palette'

const ButtonVariant = {
  primary: 'primary',
  secondary: 'secondary',
} as const

// eslint-disable-next-line @typescript-eslint/no-redeclare
type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant]

export type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  variant?: ButtonVariant
  className?: string
}

export const colorByVariant: Record<
  ButtonVariant,
  { color: CSSProperties['color']; hoverColor: CSSProperties['color'] }
> = {
  [ButtonVariant.primary]: { color: palette.amber[300], hoverColor: palette.amber[500] },
  [ButtonVariant.secondary]: { color: palette.amber[50], hoverColor: palette.amber[100] },
}

const ButtonBase = styled.button<ButtonProps & { $variant: ButtonVariant }>`
  border: 0;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.spacing(0.5)};

  ${({ $variant, theme }) => css`
    background-color: ${colorByVariant[$variant].color};

    &:hover {
      background-color: ${colorByVariant[$variant].hoverColor};
    }
  `}
`

function Button({ variant = ButtonVariant.primary, children, className, ...props }: ButtonProps) {
  return (
    <ButtonBase $variant={variant} className={className} {...props}>
      {children}
    </ButtonBase>
  )
}

export default Button
