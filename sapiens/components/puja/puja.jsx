"use client";

import React, { useState, useEffect } from "react";
import "./styles.puja.css";

const Puja = ({ puja }) => {
  const [detailData, setDetailData] = useState({
    bidder: "",
    auction: "",
    price: "",
    bid_time: "",
  });

  useEffect(() => {
    if (puja) {
      setDetailData({
        bidder: puja.bidder, // se usa el valor que viene en "bidder"
        auction: puja.auction,
        price: puja.price,   // se usa el valor que viene en "price"
        bid_time: new Date(puja.bid_time).toLocaleString(),
      });
    }
  }, [puja]);

  return (
    <div className="puja">
      <p>{detailData.bidder}</p>
      <p>{detailData.auction}</p>
      <p>
        Precio: <b>$</b>
        <strong>{detailData.price}</strong>
      </p>
      <p>Fecha: {detailData.bid_time}</p>
    </div>
  );
};

export default Puja;
