import { styled } from 'styled-components';

const StyledBoard = styled.div`
  display: flex;
  align-items: top;
  gap: 2.4rem;
  transition: opacity 100ms;
  /* overflow-x: scroll; */
  /* opacity: ${(props) => (props.$isUpdating ? '.5' : '1')}; */
`;

export default StyledBoard;
