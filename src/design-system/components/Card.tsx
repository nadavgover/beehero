import React from 'react'
import styled, { css } from 'styled-components'
import IconButton from './IconButton'

const CloseButton = styled(IconButton)`
  position: absolute;
  inset-inline-end: 0;
  top: 0;
  padding: ${({ theme }) => theme.spacing(1)};
`

const Container = styled.div<{ $isClickable: boolean }>`
  position: relative;
  border-radius: ${({ theme }) => theme.spacing(1)};
  border: 1px solid ${({ theme }) => theme.palette.amber[400]};
  padding: ${({ theme }) => theme.spacing(1.5)};

  ${({ $isClickable, theme }) =>
    $isClickable &&
    css`
      cursor: pointer;

      &:hover {
        background-color: ${theme.palette.amber[50]};
      }
    `}
`

interface CardProps {
  children: React.ReactNode
  onClose?: () => void
  onClick?: () => void
  className?: string
}

function Card({ children, onClose, onClick, className }: CardProps) {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClose?.()
  }
  return (
    <Container className={className} $isClickable={Boolean(onClick)} onClick={onClick}>
      {children}
      {onClose && <CloseButton iconName="xmark" onClick={handleClose} />}
    </Container>
  )
}

export default Card
