"use client";
import WithAdminAuth from "@/components/withAdminAuth";
import OrdersTable from "@/components/OrdersTable";
import { apiHelper } from "@/helpers/apiHelper";
import React, { useCallback, useEffect, useState } from "react";

function Page() {
  const [orders, setOrders] = useState(null);

  const [selectedOrdersToDelete, setSelectedOrdersToDelete] = useState([]);
  const [deleteLoader, setDeleteLoader] = useState(false);

  const onDelete = //useCallback(
    async (e) => {
      setDeleteLoader((d) => !d);
      const res = await apiHelper({
        endpoint: "delete-order",
        body: {
          orders: selectedOrdersToDelete,
        },
        method: "DELETE",
      });
      if (res?.status === 200) {
        alert("order deleted successfully");
        getAllOrders();
        setDeleteLoader((d) => !d);
      }
    };
  //,[selectedOrdersToDelete]);

  const onChangeCheck = (e, order) => {
    setSelectedOrdersToDelete((prev) => {
      if (e.target.checked) {
        return [...prev, order?.customer_order_id]; // Add if checked
      } else {
        const index = prev.indexOf(order?.customer_order_id);
        if (index > -1) {
          return [...prev.slice(0, index), ...prev.slice(index + 1)];
        }
        return prev;
      }
    });
  };

  const getAllOrders = async () => {
    const res = await apiHelper({
      method: "GET",
      endpoint: "get-orders",
    });

    if (res?.status === 200) {
      console.log(res);
      setOrders(res?.data);
    }
  };

  useEffect(() => {
    if (!orders) {
      getAllOrders();
    }
  }, [orders]);

  return (
    <OrdersTable
      deleteLoader={deleteLoader}
      orders={orders}
      selectedOrdersToDelete={selectedOrdersToDelete}
      onChangeCheck={onChangeCheck}
      onDelete={onDelete}
    />
  );
}

export default WithAdminAuth(Page);
