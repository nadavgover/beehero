import { useQuery } from '@tanstack/react-query'
import { UsersResponse } from './userResponses'
import { User } from './userModels'
import { axiosClient } from '../axios-client'

async function fetchUsers() {
  const { data } = await axiosClient.get<UsersResponse>('/users')

  return data
}

interface UseUsersQueryParams<Selected> {
  select?: (users: User[]) => Selected
}

export function useUsersQuery<Selected = User[]>({ select }: UseUsersQueryParams<Selected> = {}) {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    select,
  })
}
