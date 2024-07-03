import React, { useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { Button, Pane, Typography } from '../../../design-system/components'
import { Post } from '../../../api/post/postModels'
import { useQueryClient } from '@tanstack/react-query'
import { getPostsQueryKey } from '../../../api/post/postQueries'

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`

const inputStyle = css`
  width: ${({ theme }) => theme.spacing(50)};
  padding-inline: ${({ theme }) => theme.spacing(0.5)};
  border-radius: ${({ theme }) => theme.spacing(0.5)};
  border: 1px solid ${({ theme }) => theme.palette.amber[300]};

  &:focus-visible {
    outline: none;
    border: 1px solid ${({ theme }) => theme.palette.amber[500]};
  }
`

const Input = styled.input`
  ${inputStyle}
`

const TextArea = styled.textarea`
  ${inputStyle}
`

const ButtonsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  align-self: flex-end;
`

interface EditPostPaneProps {
  onClose: () => void
  post: Post
}

function EditPostPane({ onClose, post }: EditPostPaneProps) {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState(post.title)
  const [body, setBody] = useState(post.body)
  const titleRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLTextAreaElement>(null)

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const onTitleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (bodyRef.current) {
        bodyRef.current.focus()
      }
    }
  }

  const onBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value)
  }

  const onBodyEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (titleRef.current) {
        titleRef.current.focus()
      }
    }
  }

  const onSave = () => {
    queryClient.setQueryData<Post[]>(getPostsQueryKey(post.userId), (oldPosts): Post[] | undefined => {
      if (!oldPosts) {
        return
      }
      const postToEditIndex = oldPosts.findIndex((oldPost) => oldPost.id === post.id)
      const postToEdit = oldPosts[postToEditIndex]
      const editedPost: Post = { ...postToEdit, title, body }

      const newPosts = [...oldPosts.slice(0, postToEditIndex), editedPost, ...oldPosts.slice(postToEditIndex + 1)]

      return newPosts
    })

    onClose()
  }

  return (
    <Pane withAnimation onClose={onClose}>
      <Column>
        <Typography variant="caption1">
          <div>Title</div>
          <Input value={title} onChange={onTitleChange} ref={titleRef} onKeyUp={onTitleEnterPress} />
        </Typography>

        <Typography variant="caption1">
          <div>Body</div>
          <TextArea value={body} onChange={onBodyChange} rows={5} ref={bodyRef} onKeyUp={onBodyEnterPress} />
        </Typography>

        <ButtonsContainer>
          <Button variant="primary" onClick={onSave}>
            <Typography variant="body1">Save</Typography>
          </Button>
          <Button variant="secondary" onClick={onClose}>
            <Typography variant="body1">Cancel</Typography>
          </Button>
        </ButtonsContainer>
      </Column>
    </Pane>
  )
}

export default EditPostPane
