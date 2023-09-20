import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { styled } from 'styled-components';
import { Outlet } from 'react-router-dom';

import { GlobalUIProvider } from './GlobalUI';
import Sidebar from './Sidebar';
import Header from './Header';
import Modal from './Modal';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const Main = styled.main`
  flex: 1 1 auto;
  padding: 1rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Content = styled.div`
  display: flex;
  height: calc(100dvh - 64px);
`;

export default function AppLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <GlobalUIProvider>
        <Modal>
          <div style={{ height: '100dvh', width: '100%' }}>
            <Header />
            <Content>
              <Sidebar />
              <Main>
                <Outlet />
              </Main>
            </Content>
          </div>
        </Modal>
      </GlobalUIProvider>
    </QueryClientProvider>
  );
}
