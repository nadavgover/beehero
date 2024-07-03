import React, { useCallback } from 'react'
import styled, { css } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { User } from '../../api/user/userModels'
import { Card as CardBase, Icon, Typography, CardHeader, CardContent } from '../../design-system/components'
import { CARD_HOVER_COLOR } from '../../design-system/components/Card'

const Card = styled(CardBase)<{ $isSelected?: boolean }>`
  ${({ $isSelected }) =>
    $isSelected &&
    css`
      background-color: ${CARD_HOVER_COLOR};

      &:hover {
        cursor: initial;
      }
    `}
`

const UserCardRow = styled.div<{ $clickable?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.5)};

  ${({ $clickable }) =>
    $clickable &&
    css`
      cursor: pointer;
      width: fit-content;
    `}
`

const LowerCaseText = styled(Typography)`
  text-transform: lowercase;
`

interface UserCardProps {
  user: User
  onClose?: (userId: number) => void
  onClick?: (user: User) => void
  isSelected?: boolean
}

function UserCard({ user, onClose, onClick, isSelected }: UserCardProps) {
  const navigate = useNavigate()

  const handleClose = useCallback(() => {
    onClose?.(user.id)
  }, [onClose, user.id])

  const handleClick = useCallback(() => {
    onClick?.(user)
  }, [onClick, user])

  const handleCoordinatesClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      const { lat, lng } = user.address.geo

      navigate(`/map/${lat}/${lng}`)
    },
    [navigate, user.address.geo],
  )

  return (
    <Card onClose={handleClose} onClick={handleClick} $isSelected={isSelected}>
      <CardHeader>
        <Typography variant="body1" truncate>
          {user.name} ({user.username})
        </Typography>
      </CardHeader>

      <CardContent>
        <UserCardRow>
          <Icon name="envelope" />
          <LowerCaseText variant="caption1" truncate>
            {user.email}
          </LowerCaseText>
        </UserCardRow>

        <UserCardRow $clickable onClick={handleCoordinatesClick}>
          <Icon name="location" />
          <Typography variant="caption1" truncate>
            lat: {user.address.geo.lat}, lng: {user.address.geo.lng}
          </Typography>
        </UserCardRow>

        <UserCardRow>
          <Icon name="briefcase" />
          <Typography variant="caption1" truncate>
            {user.company.name}
          </Typography>
        </UserCardRow>
      </CardContent>
    </Card>
  )
}

export default React.memo(UserCard)
