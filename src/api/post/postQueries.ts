import { useQuery } from '@tanstack/react-query'
import { PostsResponse } from './postResponses'
import { Post } from './postModels'
import { axiosClient } from '../axios-client'

export function getPostsQueryKey(userId: number) {
  return ['posts', { userId }]
}

async function fetchPosts(userId: number) {
  const { data } = await axiosClient.get<PostsResponse>(`/posts?userId=${userId}`)

  return data
}

interface UsePostsQueryParams {
  userId: number
}

export function usePostsQuery({ userId }: UsePostsQueryParams) {
  return useQuery({
    queryKey: getPostsQueryKey(userId),
    queryFn: () => fetchPosts(userId),
  })
}
