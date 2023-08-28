import { styled } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Sidebar from './Sidebar';
import Header from './Header';
import Board from './Board';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000000,
    },
  },
});

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
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <StyledAppLayout>
        <Sidebar />
        <Header />
        <Main>
          <Board />
        </Main>
      </StyledAppLayout>
    </QueryClientProvider>
  );
}
