import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import UserPostCard from './UserPostCard'
import { User } from '../../../api/user/userModels'
import { usePostsQuery } from '../../../api/post/postQueries'
import { Loader, Typography } from '../../../design-system/components'

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
  const [closedPostIds, setClosedPostIds] = useState<number[]>([])
  const [selectedPostId, setSelectedPostId] = useState<number>()

  useEffect(() => {
    // When the user id changes, reset the selected post id
    setSelectedPostId(undefined)
  }, [user])

  const postsQuery = usePostsQuery({
    userId: user.id,
    select: (posts) => {
      return posts.filter((post) => !closedPostIds.includes(post.id))
    },
  })

  const onUserPostCardClose = useCallback((postId: number) => {
    setClosedPostIds((prev) => [...prev, postId])
    setSelectedPostId((prev) => (prev === postId ? undefined : prev))
  }, [])

  const onUserPostCardClick = useCallback((postId: number) => {
    setSelectedPostId(postId)
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
          <UserPostCard key={post.id} post={post} onClose={onUserPostCardClose} onClick={onUserPostCardClick} />
        ))}
      </UserPostsContainer>
      {selectedPostId && <div>{selectedPostId}</div>}
    </>
  )
}

export default UserPosts
