import Stripe from 'stripe';

export const checkout = async (req, res) => {
    const stripe = new Stripe('sk_test_51KBEVTFsTQg8DW3AcC4T7kIy2bRIh3rmTOaixwXjvMI0UN8uayvhuEx5CppoXGZcmDSk2a4FVUZhUKgYieoRXb1U001PQsHRW3');
    console.log(req.body.price);
    console.log(req.body.productName);
    const product = await stripe.products.create({
        name: req.body.productName,
        images: ['https://wallup.net/wp-content/uploads/2017/11/17/364154-city-cityscape-lights-city_lights-blurred.jpg']
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
        success_url: `http://localhost:4200/overview`,
        cancel_url: `http://localhost:4200/`,
    });

    res.status(200).json({ sessionId: session.id});
}