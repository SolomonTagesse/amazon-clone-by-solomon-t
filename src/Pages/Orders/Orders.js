import React, { useContext, useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import "./Orders.css";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
const Orders = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapShot) => {
          console.log(snapShot);
          setOrders(
            snapShot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
      console.log(orders);
    } else {
    }
  }, []);
  return (
    <LayOut>
      <section className="container_order">
        <div className="orders_container">
          <h2>Your Orders</h2>
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>
                    Order ID:{eachOrder?.id}
                    {eachOrder?.data?.basket?.map((order) => {
                      return (
                        <ProductCard
                          flex={true}
                          product={order}
                          key={order.id}
                        />
                      );
                    })}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Orders;
