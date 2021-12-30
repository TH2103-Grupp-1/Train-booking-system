import Stripe from 'stripe';

export const checkout = async (req, res) => {
    const stripe = new Stripe('sk_test_51KBEVTFsTQg8DW3AcC4T7kIy2bRIh3rmTOaixwXjvMI0UN8uayvhuEx5CppoXGZcmDSk2a4FVUZhUKgYieoRXb1U001PQsHRW3');
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1KBz4tFsTQg8DW3ASQhudyJd',
            quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `http://localhost:4200/overview`,
        cancel_url: `http://localhost:4200/`,
    });

    res.status(200).json({ sessionId: session.id});
}