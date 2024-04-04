import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Forgotpassword from './pages/Forgotpassword';
import Otp from './pages/Otp';
import Welcome from './pages/Welcome';
import ResetPassword from './pages/ResetPassword';

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/forgotPassword" element={<Forgotpassword />} />
        <Route path="/verifyOtp" element={<Otp />} />
        <Route path="/welcome" element={token ? <Welcome /> : <Navigate to="/login" />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
