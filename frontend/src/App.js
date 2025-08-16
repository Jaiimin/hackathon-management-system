import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard'; 
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {}
        <Route path="/" element={<PrivateRoute component={Dashboard} />} />
        <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
        <Route path="/leaderboard" element={<PrivateRoute component={Leaderboard} />} />
        <Route path="/profile" element={<PrivateRoute component={Profile} />} />
      </Routes>
    </Router>
  );
}

export default App;