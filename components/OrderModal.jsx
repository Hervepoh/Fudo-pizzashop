import { useMantineTheme, Modal } from '@mantine/core';
import css from "../styles/OrderModal.module.css";
import { useState } from "react";
import { createOrder } from '../lib/orderHandler';
import { useStore } from "../store/store";
import toast, {Toaster} from 'react-hot-toast';
import { useRouter } from 'next/router';

export default function OrderModal({ opened, setOpened, paymentMethod }) {
    const resetCart = useStore((state) => state.resetCart);
    const router = useRouter();
    const theme = useMantineTheme();
    const total = typeof window !== 'undefined' && localStorage.getItem('total');

    const [FormData, setFormData] = useState({});
    const handleInput = (e) => {
        setFormData({ ...FormData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(FormData);
        const id = await createOrder({ ...FormData, total, paymentMethod });
        console.log('Order Placed', id);
        toast.success("Order Placed");
        resetCart();
        {
            typeof window !== 'undefined' && localStorage.setItem('order',id);
        }

        router.push(`/order/${id}`)
    }
    return (
        <Modal
            opened={opened}
            overlayOpacity={0.55}
            overlayBlur={3}
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            onClose={() => setOpened(null)}
            title="Introduce yourself!"
        >
            {/* Modal content */}
            <form
                className={css.formContainer}
                onSubmit={handleSubmit}>
                <input onChange={handleInput} type="text" name="name" placeholder="Name" required />
                <input onChange={handleInput} type="text" name="phone" placeholder="Phone number" required />
                <textarea onChange={handleInput} name="address" rows={3} placeholder="Address">
                </textarea>

                <span>You will pay <span>xfa {total} </span>on delivery</span>

                <button
                    type="submit"
                    className="btn">
                    Place Order
                </button>
            </form>

            <Toaster />
        </Modal>
    );
}