import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import useDocumentTitle from '../../useDocumentTitle';

const ConfirmOrder = () => {
    //change title
    useDocumentTitle('Order confirmed');
    return (
        <div>
            <h1 className='order-confirm'><FontAwesomeIcon icon={faCheckCircle} /> Order Confirmed successfully</h1>
        </div>
    );
};

export default ConfirmOrder;