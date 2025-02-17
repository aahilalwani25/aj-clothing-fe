"use client";
import WithAdminAuth from "@/components/withAdminAuth";
import OrdersTable from "@/components/OrdersTable";
import { apiHelper } from "@/helpers/apiHelper";
import React, { useEffect, useState } from "react";

function Page() {
  const [orders, setOrders] = useState(null);

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

  return <OrdersTable orders={orders} />;
}

export default WithAdminAuth(Page);
