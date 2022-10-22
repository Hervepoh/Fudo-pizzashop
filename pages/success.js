import Layout from "../components/Layout";
import OrderModal from "../components/OrderModal";
import css from "../styles/Cart.module.css";
import Image from "next/image";
import { useState } from "react";

export default function Success() {

    return (
        <Layout>
            {/* Modal content */}
            <OrderModal 
                opened={true}
                paymentMethod={1}
            />
        </Layout>
    )
}