import { MdOutlineDeleteSweep } from "react-icons/md";
import { IoCheckmarkDone } from "react-icons/io5";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useState, useRef, useEffect } from "react";
import type { Order } from "../pages/Dashboard/AllOrders";
import "./OrderOptions.css";
import { axiosInstance } from "../lib/axios";
import { mutate } from "swr";

type orderProps = {
  item: Order;
  navigate: (url: string) => void;
  toggleOrderStatus: (id: string, completed: boolean) => void;
};

function OrderOptions({ item, navigate, toggleOrderStatus }: orderProps) {
  const [activeModal, setActiveModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setActiveModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

const onDeleteOrder = async (id: string) => {
  try {
    await mutate("/all-orders", async (currentOrders: Order[] = []) => {
      // Optimistically remove the order from UI
      await axiosInstance.delete("/delete-order", { data: { id } });
      return currentOrders.filter(order => order.id !== id);
    }, false);
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div
      className="orders"
      key={item.id}
      onClick={() => navigate(`order/${item.id}`)}
    >
      <div>
        <a>{item.id}</a>
        <a>{item.userName}</a>
        <a>{item.paymentId}</a>
        <a>{item.deliveryMethod}</a>
        <a className={item.status === "Pabeigts" ? "green" : "yellow"}>
          {item.status ? item.status : "Nepabeigts"}
        </a>
        <a>{item.totalAmount} EUR</a>
        <div className="action-button">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveModal((val) => !val);
            }}
          >
            <BiDotsVerticalRounded />
          </button>

          {activeModal && (
            <div className="action-modal" ref={modalRef}>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteOrder(item.id);
                  setActiveModal(false);
                }}
              >
                <MdOutlineDeleteSweep />
                Dzēst
              </span>

              {item.status === "Pabeigts" ? (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOrderStatus(item.id, false);
                    setActiveModal((val) => !val);
                  }}
                >
                  <IoCheckmarkDone />
                  Atzīmēt kā nepabeigtu
                </span>
              ) : (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOrderStatus(item.id, true);
                    setActiveModal((val) => !val);
                  }}
                >
                  <IoCheckmarkDone />
                  Atzīmēt kā pabeigtu
                </span>
              )}
            </div>
          )}
        </div>{" "}
      </div>
    </div>
  );
}

export default OrderOptions;
