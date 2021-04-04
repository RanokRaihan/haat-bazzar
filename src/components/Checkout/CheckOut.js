import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { userContext } from '../../App';
import useDocumentTitle from '../../useDocumentTitle';
import './CheckOut.css';


const CheckOut = () => {

    //change title
    useDocumentTitle('Checkout - HaatBazar')
    const [singleProduct, setSingleProduct] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const { id } = useParams();
    const { productName, price, _id } = singleProduct;
    useEffect(() => {
        fetch(`https://shielded-springs-39653.herokuapp.com/buyProduct/${id}`)
            .then(res => res.json())
            .then(data => {
                setSingleProduct(data[0]);
                console.log(data[0]);
            })
    }, [id]);
    const history = useHistory();
    const confirmOrder = () => {
        const date = new Date().toString().slice(4, 15);
        const totalData = {
            userName: loggedInUser.userName,
            email: loggedInUser.email,
            product: productName,
            price: price,
            productID: _id,
            date: date

        }
        // console.log(totalData);
        const url = 'https://shielded-springs-39653.herokuapp.com/confirmOrder';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(totalData)
        })
            .then(res => {
                history.push('/orderConfirmed')
            })
    };

    return (
        <div>
            <h1>Checkout</h1>
            <table className='checkout-table'>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='border-bottom'>
                        <td>{productName}</td>
                        <td>1</td>
                        <td>${price}</td>
                    </tr>
                    <tr >
                        <td>Total</td>
                        <td></td>
                        <td>${price}</td>
                    </tr>

                </tbody>
            </table>
            <button onClick={confirmOrder} className="btn btn-primary left-side">Checkout</button>

        </div>
    );
};

export default CheckOut;