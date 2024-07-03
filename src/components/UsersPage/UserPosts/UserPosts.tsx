import styled from 'styled-components'
import { usePostsQuery } from '../../../api/post/postQueries'
import { Loader } from '../../../design-system/components'

const UserPostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${({ theme }) => theme.spacing(3)};
`

interface UserPostsProps {
  userId: number
}
function UserPosts({ userId }: UserPostsProps) {
  const postsQuery = usePostsQuery({ userId })

  if (!postsQuery.isSuccess) {
    // TODO: error state
    return <Loader />
  }

  const postsOfUser = postsQuery.data

  return (
    <UserPostsContainer>
      {postsOfUser.map((post) => (
        // TODO: post card
        <div key={post.id}>{post.title}</div>
      ))}
    </UserPostsContainer>
  )
}

export default UserPosts
