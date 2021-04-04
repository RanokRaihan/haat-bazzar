import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const ConfirmOrder = () => {
    return (
        <div>
            <h1 className='order-confirm'><FontAwesomeIcon icon={faCheckCircle} /> Order Confirmed successfully</h1>
        </div>
    );
};

export default ConfirmOrder;