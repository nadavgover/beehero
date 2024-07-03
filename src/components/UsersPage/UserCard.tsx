import React, { useCallback } from 'react'
import styled from 'styled-components'
import { User } from '../../api/user/userModels'
import { Card, Icon, Typography, CardHeader, CardContent } from '../../design-system/components'

const UserCardRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.5)};
`

const LowerCaseText = styled(Typography)`
  text-transform: lowercase;
`

interface UserCardProps {
  user: User
  onClose?: (userId: number) => void
  onClick?: (userId: number) => void
}

function UserCard({ user, onClose, onClick }: UserCardProps) {
  const handleClose = useCallback(() => {
    onClose?.(user.id)
  }, [onClose, user.id])

  const handleClick = useCallback(() => {
    onClick?.(user.id)
  }, [onClick, user.id])

  return (
    <Card onClose={handleClose} onClick={handleClick}>
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

        <UserCardRow>
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
