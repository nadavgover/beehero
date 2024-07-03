import React, { useCallback } from 'react'
import styled, { css } from 'styled-components'
import { Post } from '../../../api/post/postModels'
import { Card as CardBase, CardContent, CardHeader, Typography } from '../../../design-system/components'
import { CARD_HOVER_COLOR } from '../../../design-system/components/Card'

const Card = styled(CardBase)<{ $isSelected?: boolean }>`
  ${({ $isSelected }) =>
    $isSelected &&
    css`
      background-color: ${CARD_HOVER_COLOR};

      &:hover {
        cursor: initial;
      }
    `}
`

interface UserPostCardProps {
  post: Post
  onClose?: (post: Post) => void
  onClick?: (post: Post) => void
  isSelected?: boolean
}
function UserPostCard({ post, onClose, onClick, isSelected }: UserPostCardProps) {
  const handleClose = useCallback(() => {
    onClose?.(post)
  }, [onClose, post])

  const handleClick = useCallback(() => {
    onClick?.(post)
  }, [onClick, post])

  return (
    <Card onClose={handleClose} onClick={handleClick} $isSelected={isSelected}>
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
