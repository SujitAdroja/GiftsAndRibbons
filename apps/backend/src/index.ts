import express from "express";
const cors = require("cors");

const app = express();
import dotenv from "dotenv";
dotenv.config();
import { auth } from "./middleware/auth";
import { productRouter } from "./routes/product";
import { cartRouter } from "./routes/cart";
import { authRoutes } from "./routes/auth";
import { OrderRoutes } from "./routes/order";
import { wishlistRouter } from "./routes/wishlist";
import cookieParser from "cookie-parser";
import { connectToDatabase } from "./database/schema/connect";
import { categoryModel } from "./database/schema/category_model";
import bodyParser from "body-parser";
import mutler from "multer";
import { userRoutes } from "./routes/user";
import { RecentlyVisitedRoutes } from "./routes/recentlyVIsite";
import { sendEmail } from "./controller/email";
import { razorpayRoutes } from "./routes/rozarpay";

app.use(
  cors({
    origin: ["http://localhost:3000", process.env.FRONTEND_ENDPOINT], // your frontend origin
    credentials: true, // allow cookies to be sent
  })
);
app.use(express.static("public")); //usefull for serving the static file in browser like image, css html and all others.
app.use(express.urlencoded({ extended: true })); //usefull for handling submitted form and parsing the req.body
app.use(express.json()); //for pasrsing json data and sending the json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes); //authentication route setup through this url.
app.use("/api/user", auth, userRoutes);
app.use("/api/", productRouter);
app.use("/api/carts", auth, cartRouter);
app.use("/api/orders", auth, OrderRoutes);
app.use("/api/wishlist", auth, wishlistRouter);
app.use("/api/recentlyvisited", auth, RecentlyVisitedRoutes);
app.post("/api/email", sendEmail);
app.use("/api/razorpay-payment", auth, razorpayRoutes);
const upload = mutler();

app.post("/api/category", upload.none(), async (req, res) => {
  const { name, description } = req.body;
  try {
    const data = new categoryModel({ name, description });
    await data.save();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

connectToDatabase()
  .then(() => {
    app.listen(process.env.BACKEND_PORT || 5000, () => {
      console.log(`listening to the port ${process.env.BACKEND_PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
