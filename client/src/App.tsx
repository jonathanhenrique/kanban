import GlobalStyles from './styles/GlobalStyles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
    </>
  );
}

export default App;
