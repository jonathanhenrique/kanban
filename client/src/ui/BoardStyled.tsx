import { styled } from 'styled-components';

const StyledBoard = styled.div`
  display: flex;
  align-items: top;
  gap: 3rem;
  transition: opacity 100ms;
  /* opacity: ${(props) => (props.$isUpdating ? '.5' : '1')}; */
`;

export default StyledBoard;
