import "./LoginPage.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { IoIosArrowForward } from "react-icons/io";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export type loginTypes = {
  email: string;
  password: string;
};

function LoginPage() {
  const [formData, setFormData] = useState<loginTypes>({
    email: "",
    password: "",
  });
  const { checkAuth } = useAuth();
  const validateCredentials = async () => {
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      if (res.status === 200) {
        setFormData({
          email: "",
          password: "",
        });
        toast.success(`Laipni lūgts, ${res.data.name || "lietotāj"}`);
        await checkAuth(); // Re-check auth state after login
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <div className="login-page-wrapper">
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />

      <div className="login-box">
        <div className="login-box-top">
          <img src="src/assets/veikals-logo-blue.png" alt="" />{" "}
          <h1>Pierakstīties</h1>
          <p>Apdrukys studejas administrācijas panelis</p>
        </div>
        <div className="form">
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 0, width: "100%" } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="filled-username-input"
              label="E-mails"
              variant="filled"
              sx={{
                "& .MuiFilledInput-root": {
                  backgroundColor: "transparent",
                  color: "var(--text-color)",
                },
                "& .MuiInputBase-input": {
                  fontSize: "16px",
                  color: "var(--text-color)",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "15px",
                  color: "var(--text-color)",
                },
              }}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <TextField
              id="filled-password-input"
              label="Parole"
              type="password"
              autoComplete="current-password"
              variant="filled"
              sx={{
                "& .MuiFilledInput-root": {
                  backgroundColor: "transparent",
                  color: "var(--text-color)",
                },
                "& .MuiInputBase-input": {
                  fontSize: "16px",
                  color: "var(--text-color)",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "15px",
                  color: "var(--text-color)",
                },
              }}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </Box>
          <button onClick={validateCredentials}>
            Ielagoties <IoIosArrowForward className="arrow-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
