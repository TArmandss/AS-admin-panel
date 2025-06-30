import { Toaster } from "react-hot-toast";
import Dashboard from "../Dashboard/Dashboard";
import Nav from "../../../nav/Nav";
import { useState } from "react";

function HomePage() {
  const [active, setActive] = useState("all");

  return (
    <div className="page-layout">
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />

      <Nav active={active} setActive={setActive} />
      <Dashboard active={active} />
    </div>
  );
}

export default HomePage;
