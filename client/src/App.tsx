import GlobalStyles from './styles/GlobalStyles';
import AppLayout from './ui/AppLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 0,
//     },
//   },
// });

function App() {
  return (
    <>
      {/* <QueryClientProvider client={queryClient}> */}
      {/* <ReactQueryDevtools /> */}
      <GlobalStyles />
      <AppLayout></AppLayout>
      {/* </QueryClientProvider> */}
    </>
  );
}

export default App;
