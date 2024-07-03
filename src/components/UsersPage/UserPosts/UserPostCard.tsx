import React, { useCallback } from 'react'
import { Post } from '../../../api/post/postModels'
import { Card, CardContent, CardHeader, Typography } from '../../../design-system/components'

interface UserPostCardProps {
  post: Post
  onClose?: (postId: number) => void
  onClick?: (postId: number) => void
}
function UserPostCard({ post, onClose, onClick }: UserPostCardProps) {
  const handleClose = useCallback(() => {
    onClose?.(post.id)
  }, [onClose, post.id])

  const handleClick = useCallback(() => {
    onClick?.(post.id)
  }, [onClick, post.id])

  return (
    <Card onClose={handleClose} onClick={handleClick}>
      <CardHeader>
        <Typography variant="body1" truncate>
          {post.title}
        </Typography>
      </CardHeader>

      <CardContent>
        <Typography variant="caption1">{post.body}</Typography>
      </CardContent>
    </Card>
  )
}

export default React.memo(UserPostCard)
