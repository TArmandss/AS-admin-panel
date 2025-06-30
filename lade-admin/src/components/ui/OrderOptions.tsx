import { MdOutlineDeleteSweep } from "react-icons/md";
import { IoCheckmarkDone } from "react-icons/io5";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useState, useRef, useEffect } from "react"; 
import type { Order } from "../pages/Dashboard/AllOrders";
import './OrderOptions.css'

type orderProps = {
  item: Order;
  navigate: (url: string) => void;
  toggleOrderStatus: (id: string, completed: boolean) => void;
}

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
              <span>
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
