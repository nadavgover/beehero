import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import UserPostCard from './UserPostCard'
import { User } from '../../../api/user/userModels'
import { getPostsQueryKey, usePostsQuery } from '../../../api/post/postQueries'
import { Loader, Typography } from '../../../design-system/components'
import { Post } from '../../../api/post/postModels'
import EditPostPane from './EditPostPane'
import { useQueryClient } from '@tanstack/react-query'

const Title = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`

const UserPostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${({ theme }) => theme.spacing(3)};
`

interface UserPostsProps {
  user: User
}
function UserPosts({ user }: UserPostsProps) {
  const queryClient = useQueryClient()
  const [selectedPost, setSelectedPost] = useState<Post>()

  useEffect(() => {
    // When the user id changes, reset the selected post id
    setSelectedPost(undefined)
  }, [user])

  const postsQuery = usePostsQuery({
    userId: user.id,
  })

  const onUserPostCardClose = useCallback(
    (post: Post) => {
      // Remove from state
      queryClient.setQueryData<Post[]>(getPostsQueryKey(post.userId), (oldPosts): Post[] | undefined => {
        if (!oldPosts) {
          return
        }

        const newPosts = oldPosts.filter((oldPost) => post.id !== oldPost.id)

        return newPosts
      })

      // Remove selected post if it was removed
      setSelectedPost((prev) => (prev?.id === post.id ? undefined : prev))
    },
    [queryClient],
  )

  const onUserPostCardClick = useCallback((post: Post) => {
    setSelectedPost(post)
  }, [])

  if (!postsQuery.isSuccess) {
    // TODO: error state
    return <Loader />
  }

  const postsOfUser = postsQuery.data

  return (
    <>
      <Title variant="h1" truncate>
        Posts Of {user.name}
      </Title>
      <UserPostsContainer>
        {postsOfUser.map((post) => (
          <UserPostCard
            key={post.id}
            post={post}
            onClose={onUserPostCardClose}
            onClick={onUserPostCardClick}
            isSelected={post.id === selectedPost?.id}
          />
        ))}
      </UserPostsContainer>
      {selectedPost && <EditPostPane onClose={() => setSelectedPost(undefined)} post={selectedPost} />}
    </>
  )
}

export default UserPosts
