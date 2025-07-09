import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface inputProps {
  name: string;
  onInputHandler: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => void;
  filter?: string;
  field?: string;
}
function CustomInput({ name, onInputHandler, filter, field }: inputProps) {
  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 0, width: "100%" } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label={name}
        value={filter}
        onChange={(e) => onInputHandler(e, field)}
        variant="outlined"
        fullWidth
        size="small"
        sx={{
          "& .MuiInputBase-root": {
            color: "var(--text-color)",
            border: "1px solid var(--border-color)",
          },
          "& .MuiInputBase-input": {
            color: "var(--text-color)",
          },
          "& .MuiInputLabel-root": {
            color: "var(--text-color)",
          },
        }}
      />
    </Box>
  );
}

export default CustomInput;
