import "./Dashboard.css";
import AllOrders from "./AllOrders";
import Completed from "./Completed";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "../../contexts/ModeContext";

interface DashboarProps {
  active: string;
}

function Dashboard({ active }: DashboarProps) {
  // const [selectedOption, setSelectedOption] = useState<string>("");
  const [age, setAge] = useState("");
  const { theme } = useTheme();

  return (
    <div className="dashboard-wrapper">
      <div className="user">
        <ul>
          <img src="src\assets\d5f97636472226bc78453c05ac895a62.png" alt="" />

          <FormControl>
            <Select
              value={age}
              displayEmpty
              renderValue={(selected) => {
                if (!selected) {
                  return "Anna De Armas";
                }
                return selected;
              }}
              inputProps={{ "aria-label": "Account select" }}
              className="select"
              sx={{
                svg: { color: theme === "dark" ? "white" : "black" },
              }}
            >
              <MenuItem value={10}>Settings</MenuItem>
              <MenuItem value={20}>Account Info</MenuItem>
              <MenuItem value={30}>Logout</MenuItem>
            </Select>
          </FormControl>

          <span className="green-dot"></span>
        </ul>
      </div>
      {active === "all" && <AllOrders />}
      {active === "completed" && <Completed />}
    </div>
  );
}

export default Dashboard;
