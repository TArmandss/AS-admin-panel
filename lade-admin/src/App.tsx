import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./components/contexts/AuthContext";

//PAGES
import HomePage from "./components/pages/HomePage/HomePage";
import Order from "./components/pages/Order/OrderOverview";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import { useEffect } from "react";
import AccountPage from "./components/pages/Account/AccountPage";
import Loading from "./components/ui/Loading";

export type ActiveStateProps = {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
};

function App() {
  const { isAuthenticated, checkAuth, loading } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  if (loading)
    return (
      <Loading/>
    );

  return (
    <Routes>
      <Route
        path="order/:orderID"
        element={isAuthenticated ? <Order /> : <LoginPage />}
      ></Route>
      <Route
        path="/"
        element={isAuthenticated ? <HomePage /> : <LoginPage />}
      ></Route>
       <Route
        path="/account"
        element={isAuthenticated ? <AccountPage /> : <LoginPage />}
      ></Route>
    </Routes>
  );
}

export default App;
