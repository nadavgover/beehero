import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import IconButton from './IconButton'

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => `${theme.palette.neutral[700]}88`};
  display: flex;
  align-items: center;
  justify-content: center;
`

const riseUp = keyframes`
    0% {
        bottom: 0;
    }
    
    100% {
        bottom: 50%;
    }
`

const Content = styled.div<{ $withAnimation?: boolean }>`
  max-width: 60%;
  max-height: 80%;
  overflow-y: auto;
  background-color: ${({ theme }) => `${theme.palette.neutral[100]}`};
  border-radius: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(2)};
  position: absolute;
  left: 50%;
  bottom: 50%;
  transform: translate(-50%, 50%);

  ${({ $withAnimation }) =>
    $withAnimation &&
    css`
      animation-name: ${riseUp};
      animation-fill-mode: forwards;
      animation-duration: 1s;
      animation-timing-function: ease-in-out;
    `}
`

const CloseButton = styled(IconButton)`
  position: absolute;
  inset-inline-end: 0;
  top: 0;
  padding: ${({ theme }) => theme.spacing(1)};
`

interface PaneProps {
  children: React.ReactNode
  onClose: () => void
  withAnimation?: boolean
  className?: string
}

function Pane({ children, onClose, withAnimation, className }: PaneProps) {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClose?.()
  }

  return (
    <Backdrop className={className}>
      <Content $withAnimation={withAnimation}>
        {children}
        <CloseButton iconName="xmark" onClick={handleClose} />
      </Content>
    </Backdrop>
  )
}

export default Pane
