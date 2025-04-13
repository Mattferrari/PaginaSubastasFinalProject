"use client";

import React, { useState, useEffect } from "react";
import styles from "./styles.puja.css";


const Puja = ({ puja }) => {
    const [detailData, setDetailData] = useState({
        auction: "",
        amount: "",
        bid_time: 0,
    });

    useEffect(() => {
        if (puja) {
            setDetailData({
                auction: puja.auction,
                amount: puja.amount,
                bid_time: new Date(detailData.bid_time).toLocaleString(),
            });
        }
    }, [puja]);

    return (
        <div className={styles.puja}>
            <strong>{detailData.auction}</strong>
            <p>
                Precio: <b>$</b>
                <strong>{detailData.amount}</strong>
            </p>
            <p>
                fecha: {detailData.bid_time}
            </p>
        </div>
    );
};

export default Puja;
