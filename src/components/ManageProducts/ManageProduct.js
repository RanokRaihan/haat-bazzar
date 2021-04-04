import React, { useEffect, useState } from 'react';
import './Manageproduct.css';
import spinner from '../../images/spinner.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteSuccess, setDeleteSuccess] = useState(false)
    useEffect(() => {
        fetch('http://localhost:4000/allProducts')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false)
            })
    }, []);
    const deleteItem = (id) => {
        setDeleteSuccess(false);
        fetch(`http://localhost:4000/deleteItem/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                setDeleteSuccess(true)
            })

        // console.log(id);

    }
    return (
        <div className='manage-product-container'>
            {

                loading ? <img src={spinner} alt="" className='loading-spinner' /> :
                    <div className="table-container">
                        <table className='product-table'>
                            <thead>
                                <tr>
                                    <th>Product name</th>
                                    <th>Product price</th>
                                    <th>Product weight</th>
                                    <th>action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    products.map(product => {
                                        const { productName, price, weight, _id } = product;
                                        return (
                                            <tr key={_id}>
                                                <td>{productName}</td>
                                                <td>{price}</td>
                                                <td>{weight}</td>
                                                <td > <FontAwesomeIcon onClick={(event) => {
                                                    event.currentTarget.parentNode.parentNode.style.display = 'none';
                                                    deleteItem(product._id)
                                                }} style={{ color: 'red', cursor: 'pointer' }} icon={faTrashAlt} /> </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>

                        </table>
                    </div>

            }
            {
                deleteSuccess && <p style={{ color: ' red ', fontSize: '20px' }}>Item deleted successfuly</p>
            }

        </div>
    );
};

export default ManageProduct;