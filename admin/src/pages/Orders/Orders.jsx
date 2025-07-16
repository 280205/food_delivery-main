// src/pages/Orders/Orders.jsx
import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import { getAllOrders, updateOrderStatus, deleteOrder } from '../../api';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await getAllOrders();
      if (res.data.success) {
        setOrders(res.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch {
      toast.error("Error fetching orders");
    }
  };

  const changeStatus = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      fetchOrders();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const removeOrderHandler = async (orderId) => {
    try {
      const res = await deleteOrder(orderId);
      if (res.data.success) {
        toast.success("Order removed");
        setOrders(orders.filter((o) => o._id !== orderId));
      } else {
        toast.error("Failed to remove order");
      }
    } catch {
      toast.error("Error removing order");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, idx) => (
          <div key={idx} className="order-item">
            <img src={assets.parcel_icon} alt="parcel" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, i) => `${item.name} x ${item.quantity}${i < order.items.length - 1 ? ", " : ""}`)}
              </p>
              <p className="order-item-name">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street},</p>
                <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <div className="order-item-actions">
              <select value={order.status} onChange={(e) => changeStatus(order._id, e.target.value)}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
              {order.status === "Delivered" && (
                <button onClick={() => removeOrderHandler(order._id)} className="order-remove-btn" title="Remove Order">✕</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
