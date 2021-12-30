import Stripe from 'stripe';

export const checkout = async (req, res) => {
    const stripe = new Stripe('sk_test_51KBEVTFsTQg8DW3AcC4T7kIy2bRIh3rmTOaixwXjvMI0UN8uayvhuEx5CppoXGZcmDSk2a4FVUZhUKgYieoRXb1U001PQsHRW3');
    let booking = JSON.parse(req.body.booking);

    const product = await stripe.products.create({
        name: req.body.productName,
        images: ['https://wallup.net/wp-content/uploads/2017/11/17/364154-city-cityscape-lights-city_lights-blurred.jpg'],
    });

    const price = await stripe.prices.create({
        product: product.id,
        unit_amount: req.body.price * 100,
        currency: 'sek'
    });

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: price.id,
                quantity: 1,
            },
        ],
        mode: 'payment',
        metadata: {
            price: booking.Price,
            distance: booking.Distance
        },
        success_url: `http://localhost:5000/order/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:4200/`,
    });

    res.status(200).json({ sessionId: session.id});
}