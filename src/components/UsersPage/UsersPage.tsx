import { useCallback, useState } from 'react'
import styled from 'styled-components'
import UserCard from './UserCard'
import { useUsersQuery } from '../../api/user/userQueries'
import { Divider, Loader as LoaderBase, Page, Typography } from '../../design-system/components'
import UserPosts from './UserPosts'

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
  const [selectedUserId, setSelectedUserId] = useState<number>()

  const usersQuery = useUsersQuery({
    select: (users) => {
      return users.filter((user) => !closedUserIds.includes(user.id))
    },
  })

  const onUserCardClose = useCallback((userId: number) => {
    setClosedUserIds((prev) => [...prev, userId])
    setSelectedUserId((prev) => (prev === userId ? undefined : prev))
  }, [])

  const onUserCardClick = useCallback((userId: number) => {
    setSelectedUserId(userId)
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
            return <UserCard key={user.id} user={user} onClose={onUserCardClose} onClick={onUserCardClick} />
          })}
        </UserCardsContainer>
        {selectedUserId && (
          <>
            <Divider />
            <UserPosts userId={selectedUserId} />
          </>
        )}
      </Column>
    </Page>
  )
}

export default UsersPage
