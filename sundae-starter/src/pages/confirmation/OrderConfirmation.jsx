import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";

export default function OrderConfirmation({ setOrderPhase }) {
    const [orderNumber, setOrderNumber] = useState(null);
    const [error, setError] = useState(false);
    const { resetOrder } = useOrderDetails();

    useEffect(() => {
        axios
            .post('http://localhost:3030/order')
            .then((response) => {
                setOrderNumber(response.data.orderNumber);
            })
            .catch(() => {
                setError(true);
            });
    }, []);

    const handleNewOrder = () => {
        resetOrder();
        setOrderPhase("inProgress");
    }

    const newOrderButton = (
        <Button variant="primary" type="submit" onClick={handleNewOrder}>
            Create new order
        </Button>
    )

    if (error) {
        return (
            <>
                <AlertBanner message={null} variant={null} />
                {newOrderButton}
            </>
        );
    }

    if (orderNumber) {
        return (
            <div style={{ textAlign: "center" }}>
                <h1>Thank you!</h1>
                <p>Your order number is {orderNumber}</p>
                <p style={{ fontSize: "25%" }}>
                    as per our terms and conditions, nothing will happen now
                </p>
                {newOrderButton}
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
}