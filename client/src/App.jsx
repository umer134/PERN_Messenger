
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {  Navigate }  from "react-router-dom";
import MainPage from './pages/main_page/mainPage';
import SignPage from './pages/sign_page/signPage';
import ProtectedRoute from './components/protectedRoute';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './features/auth/authSlice';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/main" element={<MainPage />} />
        </Route>
        <Route path='*' element={<Navigate to="/login" replace/>} />
      </Routes>
    </Router>
  )
}

export default App;
