import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Rotate = styled.div`
  animation: ${rotate} 2s linear infinite;
`

const BeeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: ${({ theme }) => theme.spacing(2)};
`

interface LoaderProps {
  className?: string
}

function Loader({ className }: LoaderProps) {
  return (
    <Container className={className}>
      <Rotate>
        <BeeGrid>
          <div>🐝</div>
          <div>🐝</div>
          <div>🐝</div>
          <div>🐝</div>
          <div>🐝</div>
          <div>🐝</div>
          <div>🐝</div>
          <div>🐝</div>
          <div>🐝</div>
        </BeeGrid>
      </Rotate>
    </Container>
  )
}

export default Loader
