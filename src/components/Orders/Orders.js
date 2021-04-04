
import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';
import spinner from '../../images/spinner.gif';


const Orders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`http://localhost:4000/orders?email=${loggedInUser.email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${sessionStorage.getItem('token')}`

            },
        })
            .then(res => res.json())
            .then(data => {
                setOrderData(data);
                setLoading(false)
            })
    }, [loggedInUser.email])

    return (
        <div>
            <h1>Hello, {loggedInUser.userName}</h1>
            <h2>Your Orders</h2>
            {
                loading ? < img src={spinner} alt="" className='loading-spinner' /> :
                    <table className='checkout-table'>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderData.map(order => {
                                    return (

                                        <tr key={order._id} className='border-bottom'>
                                            <td>{order.product}</td>
                                            <td>1</td>
                                            <td>${order.price}</td>
                                            <td>{order.date}</td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
            }


        </div>
    );
};

export default Orders;