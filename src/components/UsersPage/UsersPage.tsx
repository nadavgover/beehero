import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useSearchParams } from 'react-router-dom'
import UserCard from './UserCard'
import { getUsersQueryKey, useUsersQuery } from '../../api/user/userQueries'
import { Divider, Loader as LoaderBase, Page, Typography } from '../../design-system/components'
import UserPosts from './UserPosts'
import { User } from '../../api/user/userModels'
import { useQueryClient } from '@tanstack/react-query'

const USER_ID_SEARCH_PARAM = 'userId'

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
  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()
  // const [closedUserIds, setClosedUserIds] = useState<number[]>([])
  const selectedUserId = parseInt(searchParams.get(USER_ID_SEARCH_PARAM) || '')

  const usersQuery = useUsersQuery()

  const onUserCardClose = useCallback(
    (userId: number) => {
      // Remove from state
      queryClient.setQueryData<User[]>(getUsersQueryKey(), (oldUsers): User[] | undefined => {
        if (!oldUsers) {
          return
        }

        const newUsers = oldUsers.filter((oldUser) => userId !== oldUser.id)

        return newUsers
      })

      // remove query param if needed
      if (userId === selectedUserId) {
        setSearchParams(undefined)
      }
    },
    [selectedUserId, setSearchParams],
  )

  const onUserCardClick = useCallback(
    (user: User) => {
      setSearchParams({ [USER_ID_SEARCH_PARAM]: `${user.id}` })
    },
    [setSearchParams],
  )

  if (!usersQuery.isSuccess) {
    // TODO: error state
    return <Loader />
  }

  const users = usersQuery.data

  const selectedUser = users.find((user) => user.id === selectedUserId)

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
