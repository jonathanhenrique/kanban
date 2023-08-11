import { styled } from 'styled-components';
import Sidebar from './Sidebar';
import Header from './Header';
import Board from './Board';

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: auto 1fr;

  height: 100dvh;
`;

const Main = styled.main`
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
  grid-column: 2;
`;

export default function AppLayout() {
  return (
    <>
      <StyledAppLayout>
        <Sidebar />
        <Header />
        <Main>
          <Board />
        </Main>
      </StyledAppLayout>
    </>
  );
}
