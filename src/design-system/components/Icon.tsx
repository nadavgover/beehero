import styled, { css } from 'styled-components'
import { ReactComponent as Location } from '../../assets/icons/location.svg'
import { ReactComponent as Envelope } from '../../assets/icons/envelope.svg'
import { ReactComponent as Briefcase } from '../../assets/icons/briefcase.svg'
import { ReactComponent as XMark } from '../../assets/icons/xmark.svg'

const icons = {
  location: Location,
  envelope: Envelope,
  briefcase: Briefcase,
  xmark: XMark,
} as const

export type IconName = keyof typeof icons

const IconContainer = styled.div<{ size: number }>`
  ${({ size, theme }) => css`
    width: ${theme.spacing(size)};
    height: ${theme.spacing(size)};
  `}
`

interface IconProps {
  name: IconName
  size?: number
  className?: string
}

function Icon({ name, size = 2, className }: IconProps) {
  const IconComponent = icons[name]
  return (
    <IconContainer className={className} size={size}>
      <IconComponent className={className} />
    </IconContainer>
  )
}

export default Icon
