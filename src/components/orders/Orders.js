import { React, useState } from "react";
import "./Orders.css";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../../customcomponents/custombutton/CustomButton";
import { deleteOrders } from "../../redux/Action";
import firebase from "../../firebase";
import { addOrders } from "../../redux/Action";
import { useEffect } from "react";
import orderempty from "../../assests/ordersempty.png";
import Loader from "../loader/Loader";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  const [refreshUI, setRefreshUI] = useState(false);

  const dispatch = useDispatch();

  // const orders = useSelector((state) => state.orders);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      console.log("inside useEffect", refreshUI);
      firebase
        .database()
        .ref("orders")
        .child(user)
        .once("value", (snapshot) => {
          if (snapshot?.val()) {
            let ordersArray = Object.entries(snapshot?.val()).map(
              ([key, value]) => ({ key, ...value })
            );
            setOrders(ordersArray);

            // dispatch(addOrders(ordersArray));
          } else setOrders([]);

          setIsLoading(false);
        });
    }
  }, [user, refreshUI]);

  function handleOrderCancel(key) {
    console.log(key);
    const orderRef = firebase.database().ref(`orders/${user}`).child(`${key}`);

    orderRef.remove();

    setRefreshUI(!refreshUI);
  }

  return (
    <div className="orders">
      {isloading ? (
        <Loader />
      ) : orders.length ? (
        <div className="orders-container">
          {orders.map((order) => (
            <div className="order-container" key={order.orderDetails.id}>
              <div className="order-container-left">
                <div className="order-container-left-img-container">
                  <img
                    src={order.orderDetails.thumbnail}
                    alt={order.orderDetails.title}
                  ></img>
                </div>
                <div className="order-container-left-details-container">
                  <label>{order.orderDetails.title}</label>
                  <label>${order.orderDetails.price}</label>
                </div>
              </div>
              <div className="order-container-right">
                <label>Order Placed Date: {order.orderplaceddate}</label>

                <label>Delivery Date: {order.deliverydate}</label>

                <div className="order-container-right-btn">
                  <button onClick={() => handleOrderCancel(order.key)}>
                    CANCEL
                  </button>
                </div>

                {/* <CustomButton
                    type="primary"
                    onClick={() => handleOrderCancel(order.key)}
                    label="CANCEL"
                  /> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-orders-conatiner">
          <img className="no-orders-conatiner-img" src={orderempty}></img>
        </div>
      )}
    </div>
  );
}

export default Orders;