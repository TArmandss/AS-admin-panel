import { useNavigate, useParams } from "react-router-dom";
import "./OrderOverview.css";
import { useEffect, useState } from "react";
import { useOrders } from "../../contexts/OrderContext";
import { FaRegUserCircle } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { IoMdContact } from "react-icons/io";
import { CiCircleInfo } from "react-icons/ci";
import { MdKeyboardArrowRight } from "react-icons/md";

interface TShirtSize {
  size: string;
  quantity: number;
}

function OrderOverview() {
  const { orderID } = useParams();
  const { orders: data } = useOrders();
  const [order, setOrder] = useState<any>(null);
  const [activeOrder, setActiveOrder] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (data && orderID) {
      const foundOrder = data.find((item) => item.id === orderID);
      setOrder(foundOrder);
    }
  }, [data, orderID]);

  if (!order) {
    return <div>Loading or order not found...</div>;
  }

  return (
    <div className="order-overview">
      <div className="overview-top">
        <h1>
          <FaRegUserCircle />
          <strong>Pasūtītājs</strong>
          <span>|</span>
          {order.userName}
        </h1>
        <button onClick={() => navigate("/")}>Panelis</button>
      </div>
      <div className="overview-main">
        <div>
          <div className="total-items">
            <h1>Preces daudzums ({order.items.length})</h1>
            <ul>
              {order.items.map((_: any, index: number) => (
                <li
                  className={`${activeOrder === index && "active"}`}
                  key={index}
                  onClick={() => setActiveOrder(index)}
                >
                  <span>
                    Apskatīt <MdKeyboardArrowRight className="arrow-icon" />
                  </span>
                  <CiBookmark className="mark-icon" />
                  <p>Prece Nr.{index + 1}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="user-info">
            <div className="user-contacts">
              <h1>Kontakt info.</h1>
              <IoMdContact className="contact-icon" />
              <span>
                <p>
                  <strong>Pasūtītāja vārds:</strong> {order.userName}
                </p>
                <p>
                  <strong>E-mails:</strong> {order.userEmail}
                </p>
                <p>
                  <strong>Tel.</strong> {order.userPhone}
                </p>
              </span>
            </div>
            <div className="order-info">
              <h1>Papild info.</h1>
              <CiCircleInfo className="contact-icon" />
              <span>
                <p>
                  {" "}
                  <strong>Piegādes veids:</strong> {order.deliveryMethod}
                </p>
                {order.deliveryMethod !== "Veikals" && (
                  <p>
                    {" "}
                    <strong>Pakomāts</strong>
                    {order.pakomatsAddress}
                  </p>
                )}
                <p>
                  {" "}
                  <strong>Reģistrēts pasūtījums</strong> {order.createdAt}
                </p>
                <p>
                  {" "}
                  <strong>Kopsumma:</strong> {order.totalAmount}€
                </p>
                <p>
                  <strong>Pasūtījuma ID:</strong> {orderID}
                </p>
              </span>
            </div>{" "}
          </div>
        </div>
        <div className="item-overview">
          <div>
            <h2>Preces Nr.{activeOrder + 1} pārskats</h2>
            <h1>
              <span>Nosaukums:</span> {order.items[activeOrder].name}
            </h1>
            <h1>
              <span>Cena:</span> {order.items[activeOrder].price} Eur
            </h1>

            {/* Quantity */}
            {order.items[activeOrder].quantity && (
              <h1>
                <span>Daudzums:</span> {order.items[activeOrder].quantity}
                {order.items[activeOrder].size && (
                  <>({order.items[activeOrder].size})</>
                )}
              </h1>
            )}
            {/* Stickers */}

            {order.items[activeOrder].stickerSize && (
              <h1>
                <span>Uzlīmes izmērs:</span>{" "}
                {order.items[activeOrder].stickerSize.height} x{" "}
                {order.items[activeOrder].stickerSize.width} cm
              </h1>
            )}
            {/* Personalized T-shirts */}
            {order.items[activeOrder].tShirtSizes.length > 0 && (
              <h1>
                <span>T-kreklu izmēri:</span>{" "}
                {order.items[activeOrder].tShirtSizes.map(
                  (item: TShirtSize, index: number) =>
                    `${item.size} (${item.quantity})${
                      index < order.items[activeOrder].tShirtSizes.length - 1
                        ? ", "
                        : ""
                    }`
                )}
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderOverview;
