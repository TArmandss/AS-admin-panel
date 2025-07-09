import { useState } from "react";
import "./AccountPage.css";
import { IoSettingsOutline } from "react-icons/io5";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useAuth } from "../../contexts/AuthContext";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";
import Loading from "../../ui/Loading";
import { IoIosArrowForward } from "react-icons/io";

function AccountPage() {
  const [active, setActive] = useState(1);
  const { userData, setUserData } = useAuth();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState<string>(userData.account_img);
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: userData.name,
    last_name: userData.last_name,
    email: userData.email,
    account_img: profilePic,
    password: userData.password,
    new_password: "",
  });
  const [initialState, setInitialState] = useState({
    name: userData.name,
    last_name: userData.last_name,
    email: userData.email,
    account_img: profilePic,
    password: userData.password,
    new_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSave = async () => {
    if (!formData.name || !formData.last_name || !formData.email) {
      toast.error("Lūdzu, aizpildi visus obligātos laukus!");
      return;
    }
    setLoading(true);

    let isValidPassword = false;

    if (formData.password) {
      try {
        const response = await axiosInstance.post(
          "/auth/password-check",
          formData
        );
        if (response.status === 200) {
          isValidPassword = true;
        } else {
          toast.error("Nepareiza pašreizējā parole.");
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error(err);
        toast.error("Kļūda paroles pārbaudē.");
        setLoading(false);
        return;
      }
    }

    // Only include password fields if user wants to change it
    if (!isValidPassword) {
      delete formData.password;
      delete formData.new_password;
    } else if (isValidPassword) {
      formData.password = formData.new_password;
    }

    try {
      const response = await axiosInstance.put(
        "/auth/update-profile",
        formData
      );

      if (response.status === 200) {
        // If your backend sends back updated user data:
        const updatedUser = response.data.user;

        // Update context and local states

        setUserData(updatedUser);
      }

      toast.success("Profils veiksmīgi saglabāts!");
    } catch (e) {
      console.error(e);
      toast.error("Neizdevās saglabāt profilu.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSave = () => {
    setFormData(initialState);
  };

  async function handlePictureSubmit(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      if (typeof base64Image === "string") {
        setFormData((prev) => ({
          ...prev,
          account_img: base64Image,
        }));
      }
    };
  }
  const lis = [{ id: 1, label: "Account info", icon: <IoSettingsOutline /> }];

  return (
    <div className="account-page-wrapper">
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />

      {loading && (
        <div className="loading-wrapper">
          <Loading></Loading>
        </div>
      )}
      <button className="back-btn" onClick={() => navigate("/")}>
        <IoIosArrowBack />
        Panelis
      </button>
      <div className="account-left-grid">
        <img src={formData.account_img} alt="" />
        <h1>
          {userData.name} {userData.last_name}
        </h1>
        <p>Admin</p>
        <ul>
          {lis.map((item) => (
            <li
              key={item.label}
              className={active === item.id ? "active-li" : ""}
            >
              <a
                className={active === item.id ? "active" : ""}
                onClick={() => setActive(item.id)}
              >
                {item.icon} {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="account-right-grid">
        <h1>Konta iestātījumi</h1>{" "}
        <div className="account-setting-inputs">
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 0, width: "100%" } }}
            noValidate
            autoComplete="off"
            className="box"
          >
            <div className="grid-col">
              <TextField
                name="email"
                label="G-mails"
                value={formData.email}
                variant="outlined"
                fullWidth
                size="small"
                sx={{
                  "& .MuiInputBase-root": {
                    color: "var(--text-color)",
                    minHeight: "3.5rem",
                    border: "1px solid var(--border-color)",
                  },
                  "& .MuiInputBase-input": {
                    color: "var(--text-color)",
                  },

                  "& .MuiInputLabel-root": {
                    color: "var(--text-color)",
                    padding: ".5rem 0",
                    transition: "all 0.2s ease-out",
                  },
                  "& .MuiInputLabel-shrink": {
                    padding: "0",

                    transform: "translate(14px, -8px) scale(0.75)",
                  },
                }}
              />
              <TextField
                name="name"
                label="Vārds"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiInputBase-root": {
                    color: "var(--text-color)",
                    minHeight: "3.5rem",
                    border: "1px solid var(--border-color)",
                  },
                  "& .MuiInputBase-input": {
                    color: "var(--text-color)",
                  },

                  "& .MuiInputLabel-root": {
                    color: "var(--text-color)",
                    padding: ".5rem 0",
                    transition: "all 0.2s ease-out",
                  },
                  "& .MuiInputLabel-shrink": {
                    padding: "0",

                    transform: "translate(14px, -8px) scale(0.75)",
                  },
                }}
              />
              <TextField
                name="last_name"
                label="Uzvārds"
                value={formData.last_name}
                onChange={handleChange}
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiInputBase-root": {
                    color: "var(--text-color)",
                    minHeight: "3.5rem",
                    border: "1px solid var(--border-color)",
                  },
                  "& .MuiInputBase-input": {
                    color: "var(--text-color)",
                  },

                  "& .MuiInputLabel-root": {
                    color: "var(--text-color)",
                    padding: ".5rem 0",
                    transition: "all 0.2s ease-out",
                  },
                  "& .MuiInputLabel-shrink": {
                    padding: "0",

                    transform: "translate(14px, -8px) scale(0.75)",
                  },
                }}
              />
              <span className="img-input">
                <label htmlFor="">Attēls</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePictureSubmit}
                />
              </span>
            </div>
            <div className="grid-col">
              <TextField
                name="password"
                label="Pašreizējā parole"
                onChange={handleChange}
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiInputBase-root": {
                    color: "var(--text-color)",
                    minHeight: "3.5rem",
                    border: "1px solid var(--border-color)",
                  },
                  "& .MuiInputBase-input": {
                    color: "var(--text-color)",
                  },

                  "& .MuiInputLabel-root": {
                    color: "var(--text-color)",
                    padding: ".5rem 0",
                    transition: "all 0.2s ease-out",
                  },
                  "& .MuiInputLabel-shrink": {
                    padding: "0",

                    transform: "translate(14px, -8px) scale(0.75)",
                  },
                }}
              />
              <TextField
                name="new_password"
                label="Jaunā parole"
                onChange={handleChange}
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiInputBase-root": {
                    color: "var(--text-color)",
                    minHeight: "3.5rem",
                    border: "1px solid var(--border-color)",
                  },
                  "& .MuiInputBase-input": {
                    color: "var(--text-color)",
                  },

                  "& .MuiInputLabel-root": {
                    color: "var(--text-color)",
                    padding: ".5rem 0",
                    transition: "all 0.2s ease-out",
                  },
                  "& .MuiInputLabel-shrink": {
                    padding: "0",

                    transform: "translate(14px, -8px) scale(0.75)",
                  },
                }}
              />
              <p>
                Šajā sadaļā Tu vari nomainīt savu paroli. Ievadi savu pašreizējo
                paroli un izvēlies jaunu, kas ir droša un viegli atcerama.
                Jaunajai parolei jābūt vismaz astoņus simbolus garai, un
                ieteicams iekļaut gan burtus, gan ciparus.
              </p>
            </div>
          </Box>
        </div>
        <span className="btn-section">
          <button className="save-btn" onClick={handleSave}>
            Saglabāt <IoIosArrowForward className="arrow-icon" />
          </button>
          <button className="reset-btn" onClick={handleCancelSave}>
            Atcelt
          </button>
        </span>
      </div>
    </div>
  );
}

export default AccountPage;
