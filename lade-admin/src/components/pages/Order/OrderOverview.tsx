import { useNavigate, useParams } from "react-router-dom";
import "./OrderOverview.css";
import { useEffect, useState } from "react";
import { useOrders } from "../../contexts/OrderContext";
import { FaRegUserCircle } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { IoMdContact } from "react-icons/io";
import { CiCircleInfo } from "react-icons/ci";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

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
        <button onClick={() => navigate("/")}>
          <IoIosArrowBack />
          Panelis
        </button>
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
                  <strong>Tel Nr:</strong> {order.userPhone}
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
                    <strong>Pakomāts: </strong>
                    {order.pakomatsAddress}
                  </p>
                )}
                <p>
                  {" "}
                  <strong>Reģistrēts pasūtījums: </strong> {order.createdAt}
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
          <div>
            {order.items[activeOrder].tShirtColor && (
              <h1>
                <span>Krāsa:</span>
                {order.items[activeOrder].tShirtColor}
              </h1>
            )}
            {order.items[activeOrder].frontTshirt && (
              <h1>
                <span>Priekšpuse:</span>
                {order.items[activeOrder].frontTshirt["only-color"] ? (
                  <>Tikai krāsa</>
                ) : (
                  <>
                    {" "}
                    <a
                      target="_blank"
                      href={order.items[activeOrder].frontTshirt["full-front"]}
                    >
                      {order.items[activeOrder].frontTshirt["full-front"]}
                    </a>
                  </>
                )}
              </h1>
            )}
            {order.items[activeOrder].frontTshirt && (
              <h1>
                <span>Aizmugure:</span>
                {order.items[activeOrder].backTshirt["only-color"] ? (
                  <>Tikai krāsa</>
                ) : (
                  <>
                    {" "}
                    <a
                      target="_blank"
                      href={order.items[activeOrder].backTshirt["full-front"]}
                    >
                      {order.items[activeOrder].backTshirt["full-front"]}
                    </a>
                  </>
                )}
              </h1>
            )}
            {order.items[activeOrder].stickerImage && (
              <h1>
                <span>Uzlīmes attēls:</span>

                <a target="_blank" href={order.items[activeOrder].stickerImage}>
                  {order.items[activeOrder].stickerImage}
                </a>
              </h1>
            )}
            {order.items[activeOrder].color && (
              <h1>
                <span>Krāsa:</span>

                {order.items[activeOrder].color}
              </h1>
            )}
            {order.items[activeOrder].gender && (
              <h1>
                <span>Dzimums:</span>

                {order.items[activeOrder].gender}
              </h1>
            )}
            {/* Business Cards */}
            {order.items[activeOrder].businessCardFront && (
              <h1>
                <span>Vizītkartes priekša:</span>

                <a
                  target="_blank"
                  href={order.items[activeOrder].businessCardFront}
                >
                  {order.items[activeOrder].businessCardFront}
                </a>
              </h1>
            )}
            {order.items[activeOrder].businessCardBack && (
              <h1>
                <span>Vizītkartes aizmugure:</span>

                <a
                  target="_blank"
                  href={order.items[activeOrder].businessCardBack}
                >
                  {order.items[activeOrder].businessCardBack}
                </a>
              </h1>
            )}
            {/*Envelopes */}
            {order.items[activeOrder].envelopeBackImage && (
              <h1>
                <span>Aploksnes attēls:</span>

                <a
                  target="_blank"
                  href={order.items[activeOrder].envelopeBackImage}
                >
                  {order.items[activeOrder].envelopeBackImage}
                </a>
              </h1>
            )}
            {/*Magnets */}
            {order.items[activeOrder].magnetImage && (
              <h1>
                <span>Magnēta attēls:</span>

                <a target="_blank" href={order.items[activeOrder].magnetImage}>
                  {order.items[activeOrder].magnetImage}
                </a>
              </h1>
            )}
            {/*Comments */}
            {order.items[activeOrder].comment && (
              <h1>
                <span>Komentāri:</span>

                {order.items[activeOrder].comment}
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderOverview;
