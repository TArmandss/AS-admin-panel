import { useState } from "react";
import "./AllOrders.css";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../lib/axios";
import { useOrders } from "../../contexts/OrderContext";
import OrderOptions from "../../ui/OrderOptions";
import { toast } from "react-toastify";
import { IoFilter } from "react-icons/io5";
import Filter from "../../ui/Filter";

export type Order = {
  id: string;
  userName: string;
  paymentId: string;
  deliveryMethod: string;
  status: string;
  totalAmount: number;
};

function AllOrders() {
  const navigate = useNavigate();
  const [active, setActive] = useState(1);
  const { orders: data = [] } = useOrders();
  const [activeFilter, setActiveFilter] = useState(false);

  const [finishedOrder, setFinishedOrder] = useState<Order[]>([]);
  const [unfinishedOrder, setUnfinishedOrder] = useState<Order[]>([]);
  const [displayedOrders, setDisplayedOrders] = useState({
    all: true,
    finished: false,
    unfinished: false,
  });
  const [filtering, setFiltering] = useState({
    id: null,
    userName: null,
  });

  const displayFinishedOrders = () => {
    const filtered = data?.filter((item) => item.status === "Pabeigts");
    setFinishedOrder(filtered);
    setDisplayedOrders({
      all: false,
      finished: true,
      unfinished: false,
    });
  };
  const displayUnfinishedOrders = () => {
    const filtered = data?.filter(
      (item) => item.status === "Nepabeigts" || !item.status
    );
    setUnfinishedOrder(filtered);
    setDisplayedOrders({
      all: false,
      finished: false,
      unfinished: true,
    });
  };

  const toggleOrderStatus = async (orderId: string, completed: boolean) => {
    try {
      await axiosInstance.put(`/completed-order/${orderId}`, { completed });
      toast.success("Order marked as completed!");
    } catch (err) {
      console.error(err);
    }
  };

  const isFilterApplied = Object.values(filtering).some((val)=> !!val)

  const filteredData = data.filter((item) => {
    return Object.entries(filtering).every(([key, value]) => {
      if (!value) return true; // skip empty filters
      // Make sure both are strings for .includes
      const itemValue = (item as any)[key];
      if (typeof itemValue !== "string") return false;
      return itemValue.toLowerCase().includes(value.toLowerCase());
    });
  });

  const ordersToRender = isFilterApplied
    ? filteredData
    : displayedOrders.all
    ? data
    : displayedOrders.finished
    ? finishedOrder
    : unfinishedOrder;
    

  return (
    <div className="all-orders-wrapper">
      {activeFilter && (
        <div className="overlay" onClick={() => setActiveFilter(false)} />
      )}

      <h1>Pasūtījumu ieraksti</h1>
      <span>
        <button
          onClick={() => {
            setActive(1);
            setDisplayedOrders({
              all: true,
              finished: false,
              unfinished: false,
            });
          }}
          className={`${active === 1 ? "active" : ""}`}
        >
          Visi pasūtījumu
        </button>
        <span className="line">/</span>
        <button
          onClick={() => {
            setActive(2);
            displayFinishedOrders();
          }}
          className={`${active === 2 ? "active" : ""}`}
        >
          Pabeigti
        </button>
        <span className="line">/</span>
        <button
          onClick={() => {
            setActive(3);
            displayUnfinishedOrders();
          }}
          className={`${active === 3 ? "active" : ""}`}
        >
          Nepabeigti
        </button>
        <button className="filter-option" onClick={() => setActiveFilter(true)}>
          Filtrēt <IoFilter />
        </button>
        <Filter
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          setFiltering={setFiltering}
          filtering={filtering}
        />
      </span>
      <ul>
        <li>
          <a>ID</a>
          <a>Vārds</a>
          <a>Maksas ID</a>
          <a>Veids</a>
          <a>Status</a>
          <a>Summa</a>
          <a>Darbība</a>
        </li>
      </ul>

      <div className="orders-box">
        {ordersToRender?.map((item) => {
          return (
            <OrderOptions
              key={item.id}
              item={item}
              navigate={navigate}
              toggleOrderStatus={toggleOrderStatus}
            ></OrderOptions>
          );
        })}
      </div>
    </div>
  );
}

export default AllOrders;
