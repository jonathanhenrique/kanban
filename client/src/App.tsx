import GlobalStyles from './styles/GlobalStyles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import HomePage from './pages/HomePage';
import AppLayout from './ui/AppLayout';
import Board from './features/board/Board';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/app" element={<AppLayout />}>
            <Route path=":boardId" element={<Board />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="bottom-center"
        gutter={12}
        containerStyle={{ margin: '64px' }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            maxWidth: '400px',
            padding: '16px 24px',
            backgroundColor: 'var(--color-grey-500)',
            color: 'var(--color-grey-100)',
            borderRadius: 'var(--border-radius-lg)',
          },
        }}
      />
    </>
  );
}

export default App;
