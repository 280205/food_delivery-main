// src/pages/List/List.jsx
import React, { useEffect, useState } from 'react';
import './List.css';
import { toast } from 'react-toastify';
import { getAllFood, removeFood } from '../../api';

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const res = await getAllFood();
      if (res.data.success) {
        setList(res.data.data);
      } else {
        toast.error("Failed to fetch food list");
      }
    } catch {
      toast.error("Error fetching food list");
    }
  };

  const deleteFood = async (foodId) => {
    try {
      const res = await removeFood(foodId);
      if (res.data.success) {
        toast.success(res.data.message);
        fetchList();
      } else {
        toast.error("Failed to remove food");
      }
    } catch {
      toast.error("Error removing food");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, idx) => (
          <div key={idx} className="list-table-format">
            <img src={`${import.meta.env.VITE_API_URL}/images/${item.image}`} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p className='cursor' onClick={() => deleteFood(item._id)}>X</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
