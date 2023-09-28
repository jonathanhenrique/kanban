import { styled } from 'styled-components';

const StyledBoard = styled.div`
  /* position: relative; */
  padding: 1rem 4.8rem 6.4rem;
  display: flex;
  align-items: top;
  gap: 2.4rem;
  transition: opacity 100ms;
  overflow-x: scroll;
  min-height: 100%;
`;

export default StyledBoard;
