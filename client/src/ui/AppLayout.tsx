import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { styled } from 'styled-components';
import { Outlet } from 'react-router-dom';

import { GlobalUIProvider } from '../utils/GlobalUI';
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
  overflow-y: scroll;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  height: calc(100dvh - 64px);
`;

export default function AppLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Modal>
        <GlobalUIProvider>
          <Header />
          <Content>
            <Sidebar />
            <Main>
              <Outlet />
            </Main>
          </Content>
        </GlobalUIProvider>
      </Modal>
    </QueryClientProvider>
  );
}
