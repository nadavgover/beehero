import { useCallback, useState } from 'react'
import styled from 'styled-components'
import UserCard from './UserCard'
import { useUsersQuery } from '../../api/user/userQueries'
import { Divider, Loader as LoaderBase, Page, Typography } from '../../design-system/components'
import UserPosts from './UserPosts'
import { User } from '../../api/user/userModels'

const Loader = styled(LoaderBase)`
  height: 100dvh;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`

const Title = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`

const UserCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing(3)};
`

function UsersPage() {
  const [closedUserIds, setClosedUserIds] = useState<number[]>([])
  const [selectedUser, setSelectedUser] = useState<User>()

  const usersQuery = useUsersQuery({
    select: (users) => {
      return users.filter((user) => !closedUserIds.includes(user.id))
    },
  })

  const onUserCardClose = useCallback((userId: number) => {
    setClosedUserIds((prev) => [...prev, userId])
    setSelectedUser((prev) => (prev?.id === userId ? undefined : prev))
  }, [])

  const onUserCardClick = useCallback((user: User) => {
    setSelectedUser(user)
  }, [])

  if (!usersQuery.isSuccess) {
    // TODO: error state
    return <Loader />
  }

  const users = usersQuery.data

  return (
    <Page>
      <Column>
        <Title variant="h1">Users</Title>
        <UserCardsContainer>
          {users.map((user) => {
            return (
              <UserCard
                key={user.id}
                user={user}
                onClose={onUserCardClose}
                onClick={onUserCardClick}
                isSelected={user.id === selectedUser?.id}
              />
            )
          })}
        </UserCardsContainer>
        {selectedUser && (
          <>
            <Divider />
            <UserPosts user={selectedUser} />
          </>
        )}
      </Column>
    </Page>
  )
}

export default UsersPage
