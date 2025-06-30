import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage/HomePage";
import Order from "./components/pages/Order/OrderOverview";

export type ActiveStateProps = {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="order/:orderID" element={<Order></Order>}></Route>
        <Route index element={<HomePage></HomePage>}></Route>
      </Routes>
    </>
  );
}

export default App;
