import GlobalStyles from './styles/GlobalStyles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Homepage from './pages/Homepage';
import Login from './pages/Login';
import AppLayout from './ui/AppLayout';
import Board from './features/board/Board';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<AppLayout />}>
            <Route path=":boardId" element={<Board />} />
          </Route>
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
