import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ component: Component }) => {
  const { user } = useAuth();

  // If the user is logged in, render the component they wanted to access.
  // Otherwise, redirect them to the login page.
  return user ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;