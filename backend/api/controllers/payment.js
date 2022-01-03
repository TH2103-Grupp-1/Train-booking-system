import Stripe from 'stripe';

export const checkout = async (req, res) => {
    const stripe = new Stripe('sk_test_51KBEVTFsTQg8DW3AcC4T7kIy2bRIh3rmTOaixwXjvMI0UN8uayvhuEx5CppoXGZcmDSk2a4FVUZhUKgYieoRXb1U001PQsHRW3');
    let booking = JSON.parse(req.body.booking);
    // const BASE_URL = req.protocol+"://"+req.headers.host;
    const BASE_URL = 'http://localhost:4200'
    console.log('this is the checkout method booking object');
    console.log(booking);
    const product = await stripe.products.create({
        name: booking.FromLocation.AdvertisedLocationName + ' - ' + booking.ToLocation.AdvertisedLocationName,
        images: ['https://wallup.net/wp-content/uploads/2017/11/17/364154-city-cityscape-lights-city_lights-blurred.jpg'],
    });

    const price = await stripe.prices.create({
        product: product.id,
        unit_amount: booking.Price * 100,
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
            Price: booking.Price,
            FromLocation: booking.FromLocation.AdvertisedLocationName,
            ToLocation: booking.ToLocation.AdvertisedLocationName,
            TrainType: booking.TimeTable.TrainType,
            DepartureTime: booking.TimeTable.DepartureTime,
            ArrivalTime: booking.TimeTable.ArrivalTime,
            SeatId: booking.SeatId
        },
        success_url: `${BASE_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${BASE_URL}`,
    });

    res.status(200).json({ sessionId: session.id });
}

export const orderSuccess = async (req, res) => {
    try {
        const stripe = new Stripe('sk_test_51KBEVTFsTQg8DW3AcC4T7kIy2bRIh3rmTOaixwXjvMI0UN8uayvhuEx5CppoXGZcmDSk2a4FVUZhUKgYieoRXb1U001PQsHRW3')
        const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
        const customer = await stripe.customers.retrieve(session.customer);
        let result = session.metadata;
        console.log('This is the orderSuccess metadata');
        console.log(result);
        result.CustomerName = customer.name;
        res.json({ message: result });
    } catch (error) {
        res.json({ message: 'Not found' });
    }
}