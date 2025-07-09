import "./Dashboard.css";
import AllOrders from "./AllOrders";
import Completed from "./Completed";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "../../contexts/ModeContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { axiosInstance } from "../../lib/axios";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineAccountCircle } from "react-icons/md";

interface DashboarProps {
  active: string;
}

function Dashboard({ active }: DashboarProps) {
  // const [selectedOption, setSelectedOption] = useState<string>("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { userData } = useAuth();
  const { checkAuth } = useAuth();

  const logOut = async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      if (res.status === 200) {
        await checkAuth();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="user">
        <ul>
          <img src={userData.account_img} alt="" />

          <FormControl>
            <Select
              value={age}
              displayEmpty
              renderValue={(selected) => {
                if (!selected) {
                  return `${userData.name} ${userData.last_name}`;
                }
                return selected;
              }}
              inputProps={{ "aria-label": "Account select" }}
              className="select"
              sx={{
                svg: { color: theme === "dark" ? "white" : "black" },
              }}
            >
              <MenuItem
                className="form-control-option"
                onClick={() => navigate("/account")}
              >
                Konta informācija{" "}
                <MdOutlineAccountCircle className="account-icon" />
              </MenuItem>
              <MenuItem className="form-control-option" onClick={logOut}>
                Izrakstīties <IoIosLogOut className="logout-icon" />
              </MenuItem>
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
