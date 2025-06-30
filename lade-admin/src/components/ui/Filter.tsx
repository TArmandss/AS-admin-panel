import DataRangePicker from "./DataRangePicker";
import CustomInput from "./CustomInput";
import { IoIosClose } from "react-icons/io";
import "./Filter.css";

interface Filtering {
  id: string;
  userName: string;
  paymentId: string;
}
interface filterProps {
  activeFilter: boolean;
  setActiveFilter: React.Dispatch<React.SetStateAction<boolean>>;
  filtering: Filtering;
  setFiltering: React.Dispatch<React.SetStateAction<Filtering>>;
}

function Filter({
  activeFilter,
  setActiveFilter,
  filtering,
  setFiltering,
}: filterProps) {
  const onInputHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFiltering((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <div className={`pop-up-filter ${activeFilter ? "active" : ""}`}>
      <div className="filter-top">
        <p>Meklēt pēc</p>
        <IoIosClose
          className="close-filter-btn"
          onClick={() => setActiveFilter(false)}
        />
      </div>

      <DataRangePicker></DataRangePicker>
      <CustomInput
        name={"Vārds"}
        field={"userName"}
        onInputHandler={onInputHandler}
        filter={filtering.userName}
      />
      <CustomInput
        name={"ID"}
        field={"id"}
        onInputHandler={onInputHandler}
        filter={filtering.id}
      />
      <CustomInput
        name={"Maksas ID"}
        field={"paymentId"}
        onInputHandler={onInputHandler}
        filter={filtering.paymentId}
      />
    </div>
  );
}

export default Filter;
