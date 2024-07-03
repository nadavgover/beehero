import { useQuery } from '@tanstack/react-query'
import { UsersResponse } from './userResponses'
import { axiosClient } from '../axios-client'

export function getUsersQueryKey() {
  return ['users']
}

async function fetchUsers() {
  const { data } = await axiosClient.get<UsersResponse>('/users')

  return data
}

export function useUsersQuery() {
  return useQuery({
    queryKey: getUsersQueryKey(),
    queryFn: fetchUsers,
  })
}
