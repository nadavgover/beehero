import ButtonBase, { ButtonProps, colorByVariant } from './Button'
import IconBase, { IconName } from './Icon'
import styled from 'styled-components'

type IconButtonProps = ButtonProps & {
  iconName: IconName
}

const Button = styled(ButtonBase)`
  background-color: transparent;

  &:hover {
    background-color: transparent;
  }
`

const Icon = styled(IconBase)`
  color: ${colorByVariant['primary'].color};

  &:hover {
    color: ${colorByVariant['primary'].hoverColor};
  }
`

function IconButton({ iconName, ...props }: IconButtonProps) {
  return (
    // @ts-expect-error legacyRef type not working
    <Button {...props}>
      <Icon name={iconName} />
    </Button>
  )
}

export default IconButton
