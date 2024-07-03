import React from 'react'
import styled from 'styled-components'

interface PageProps {
  children: React.ReactNode
  className?: string
}

const PageContainer = styled.div`
  padding-inline: 5vw;
  padding-top: ${({ theme }) => theme.spacing(3)};
  padding-bottom: ${({ theme }) => theme.spacing(3)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-inline: 10vw;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding-inline: 15vw;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    padding-inline: 20vw;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints['2xl']}) {
    padding-inline: 25vw;
  }
`

function Page({ children, className }: PageProps) {
  return <PageContainer className={className}>{children}</PageContainer>
}

export default Page
