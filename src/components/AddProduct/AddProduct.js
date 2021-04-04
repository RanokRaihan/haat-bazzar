import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './AddProduct.css';
import uploading from '../../images/upload.gif'

const AddProduct = () => {

    const { register, handleSubmit } = useForm();
    const [imageURL, setImageURL] = useState('')
    const [uploadnig, setUploading] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false)


    const onSubmit = data => {
        setAddSuccess(false)
        const totalData = { ...data, imageURL: imageURL }
        // console.log(totalData);
        const url = 'http://localhost:4000/addProduct';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(totalData)
        })
            .then(res => {
                setAddSuccess(true)
                console.log(res)
            })
    };

    const handleInputChange = () => {
        setAddSuccess(false);
        setImageURL('')
    }
    const handleImageUpload = event => {
        setUploading(true);
        setAddSuccess(false);
        // console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', '980e01a9db052c64c4ad9206ed943c46');
        imageData.append('image', event.target.files[0]);
        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(res => {
                console.log(res);
                setImageURL(res.data.data.display_url);
                setUploading(false);

                // console.log(imageURL);
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <div className='add-product-container'>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-grid">
                    <div>
                        <label htmlFor="ProductName">Product Name</label>
                        <input onChange={() => handleInputChange} required ref={register} placeholder='Product Name' type="text" name="productName" id="productName" />
                    </div>
                    <div>
                        <label htmlFor="weight">Weight</label>
                        <input onChange={() => handleInputChange} required ref={register} placeholder='Product weight' type="text" name="weight" id="weight" />
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input onChange={() => handleInputChange} required ref={register} placeholder='Product Price' type="number" name="price" id="price" />
                    </div>
                    <div>
                        <label htmlFor="image">Add Photo</label>
                        <input type="file" name="image" id="image" onChange={handleImageUpload} />
                        {
                            uploadnig && <div><img className='uploading' src={uploading} alt="" /><span>Uploading...</span></div>
                        }
                        {
                            imageURL && <div className='img-preview'><img src={imageURL} alt="" /></div>
                        }

                    </div>
                </div>
                <button type='submit' className="btn btn-primary submit-btn">Add Product</button>
            </form>
            {
                addSuccess && <p style={{ fontSize: '20px', color: 'lime' }}>One item added successfuly</p>
            }
        </div>
    );
};

export default AddProduct;