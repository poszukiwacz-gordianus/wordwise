import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log(isAuthenticated);
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
