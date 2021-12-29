import Stripe from 'stripe';

export const checkout = async (req, res) => {
    const stripe = new Stripe('sk_test_51KBExSCIFWrvMwQGE1pHQ4byae9u7bMacB4l7XCsUUGXBqpLHT7VpfdUNphG53PgQhinX4ygRP4B4aqOyCimm5CT00QQvMgqh6');
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1KC3YzCIFWrvMwQGQdb2cDcK',
            quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `http://localhost:5000/overview`,
        cancel_url: `http://localhost:5000/`,
    });

    console.log('payment reached');
    // res.redirect(303, session.url);
    res.json({message: session.url});
}