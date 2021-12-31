import bodyParser from "body-parser";
import express from "express";
import trainStationRoutes from "./routes/trainstations.js";
import bookingRoutes from "./routes/bookings.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.routes.js";
import carriageRoutes from "./routes/carriages.js";
import trainRoutes from "./routes/trains.js";
import seatRoutes from "./routes/seats.js";
import timeTableRoutes from "./routes/timetables.js";
import Database from "better-sqlite3";
import paymentRoutes from "./routes/payment.js";
import Stripe  from "stripe";

const stripe = new Stripe('sk_test_51KBEVTFsTQg8DW3AcC4T7kIy2bRIh3rmTOaixwXjvMI0UN8uayvhuEx5CppoXGZcmDSk2a4FVUZhUKgYieoRXb1U001PQsHRW3') 

import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

export const db = new Database("./database.db");

// app.use(express.static('public/')); // FOR PRODUCTION

app.use(cors()); // ONLY FOR DEVELOPMENT

app.use(bodyParser.json({limit: "50mb"}));

app.use("/api/trainstations", trainStationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/carriages", carriageRoutes);
app.use("/api/trains", trainRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/timetables", timeTableRoutes);
app.use("/api/users", userRoutes);  

app.get('/order/success', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const customer = await stripe.customers.retrieve(session.customer);
  // console.log(e);
  res.send(`<html><body><h1>Thanks for your order, ${customer.name}!</h1><br><h3>Distance: ${session.metadata.distance}</h3><br><h3>Price: ${session.metadata.price}</h2></html>`);
});
  


app.listen(port, () => console.log('Listening on port ' + port));