import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LogOut = () => {

  const navigate = useNavigate();

  useEffect(() => {
    // Clear JWT or session data from storage
    localStorage.removeItem("token");

    // Optional: Clear any other user-related data
    localStorage.removeItem("user");

    // Redirect to login page
    navigate("/login");
  }, [navigate]);

  return (
    <div className="text-center mt-20 text-xl text-gray-600">
      Logging out...
    </div>
  );
};


