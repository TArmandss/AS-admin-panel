import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { MultiInputDateRangeField } from "@mui/x-date-pickers-pro/MultiInputDateRangeField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

function DataRangePicker() {
  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["MultiInputDateRangeField"]}>
          <DateRangePicker
            slots={{ field: MultiInputDateRangeField }}
            slotProps={{
              textField: ({ position }) => ({
                sx: {
                  width: "200px",
                  "& .MuiInputBase-root": {
                    height: "40px",
                    color: "var(--text-color)",
                  },
                  "& .MuiInputBase-input": {
                    color: "var(--text-color)",
                  },
                  "& .MuiInputLabel-root": {
                    color: "var(--text-color)",
                  },
                },

                size: "small",
                label: position === "start" ? "No" : "Līdz",
              }),
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
      
  );
}

export default DataRangePicker;
