
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {  Navigate }  from "react-router-dom";
import MainPage from './pages/main_page/mainPage';
import SignPage from './pages/sign_page/signPage';
import ProtectedRoute from './app/protected-route';

function App() {
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
