import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

import './stripe-button.styles.scss'

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishablekey = 'pk_test_51HVIJTJioIGXxmNoN9iRBZ3FYX73ICnfKHb8wsLQyAbOM6ICpoGDipED0qNxikMA5EaGZp6MRguARrkAm45hUkXD00nJcfC3pz';

const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout 
            label='Pay Now'
            name='i Clothing'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total price is ${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishablekey}
        />
    )
}

export default StripeCheckoutButton;