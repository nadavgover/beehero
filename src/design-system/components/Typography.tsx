import React, { CSSProperties, useRef } from 'react'
import styled, { css } from 'styled-components'

const TypographyVariant = {
  h1: 'h1',
  body1: 'body1',
  caption1: 'caption1',
} as const

// eslint-disable-next-line @typescript-eslint/no-redeclare
type TypographyVariant = (typeof TypographyVariant)[keyof typeof TypographyVariant]

interface FontDefinition {
  fontSize: CSSProperties['fontSize']
  lineHeight: CSSProperties['lineHeight']
}

const fontDefinitionsByTypographyVariant: Record<TypographyVariant, FontDefinition> = {
  [TypographyVariant.h1]: { fontSize: '40px', lineHeight: '48px' },
  [TypographyVariant.body1]: { fontSize: '18px', lineHeight: '22px' },
  [TypographyVariant.caption1]: { fontSize: '13px', lineHeight: '18px' },
}

const Text = styled.p<{ variant: TypographyVariant; $bold?: boolean; $truncate?: boolean }>`
  font-family: Inter, sans-serif;
  font-weight: ${({ $bold }) => ($bold ? 700 : 400)};

  ${({ variant }) => {
    const variantFontDefinition = fontDefinitionsByTypographyVariant[variant]

    return css`
      font-size: ${variantFontDefinition.fontSize};
      line-height: ${variantFontDefinition.lineHeight};
    `
  }}

  ${({ $truncate }) =>
    $truncate &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
`

interface TypographyProps {
  children: React.ReactNode
  variant?: TypographyVariant
  bold?: boolean
  truncate?: boolean
  className?: string
}

function Typography({ children, variant = TypographyVariant.body1, bold, truncate, className }: TypographyProps) {
  const ref = useRef<HTMLParagraphElement>(null)

  const addTooltipOnHover = () => {
    const element = ref.current

    // Only add tooltip if truncate was passed
    if (!truncate || !element) {
      return
    }

    // Check if overflow
    // 'title' attribute is the native way to add a tooltip
    if (element.offsetWidth < element.scrollWidth && !element.hasAttribute('title')) {
      element.setAttribute('title', element.innerText)
    }
  }

  return (
    <Text
      ref={ref}
      variant={variant}
      $bold={bold}
      $truncate={truncate}
      className={className}
      onMouseEnter={addTooltipOnHover}
    >
      {children}
    </Text>
  )
}

export default Typography
