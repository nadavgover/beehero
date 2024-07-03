import styled from 'styled-components'

const Line = styled.div`
  width: 100%;
  height: 1px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.amber[100]};
`

interface DividerProps {
  className?: string
}

function Divider({ className }: DividerProps) {
  return <Line className={className} />
}

export default Divider
