import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import uploadRoute from './routes/uploadRoute.js';
import { errorHandler } from './middleware/errorHandler.js';

//Route imports
import heroRoute from './routes/Hero/hero.js';
import announcementRoute from './routes/Announcement/announcement.js'
import clientRoutes from './routes/OurClients/clients.js';
import productsCategory from './routes/Products/productCategoryRoutes.js'
import productsRoutes from './routes/Products/productsRoute.js';
import WhoWeAreRoute from './routes/WhoWeAre/WhoWeAre.js';
import TestimonialRoute from './routes/Testimonials/Testimonial.js';
import ContactUsRoute from './routes/ContactUs/ContactUs.js';
import BecameResellerRoute from './routes/BecameReseller/BecameReseller.js';
// Importing dotenv to use environment variables
dotenv.config();

// Database connection
connectDB();

const app = express();




// CORS Configuration
app.use(cors({
    origin: ['http://localhost:5173', 'https://samanee-globals-frontends-gamma.vercel.app'],
    methods: "GET, POST, PUT, PATCH, DELETE",
    allowedHeaders: 'Content-Type, Authorization'
}));

// JSON parser middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', uploadRoute);
app.use('/api', heroRoute);
app.use('/api', announcementRoute)
app.use('/api', clientRoutes);
app.use('/api', productsCategory)
app.use('/api', productsRoutes);
app.use('/api', WhoWeAreRoute);
app.use('/api', TestimonialRoute);
app.use('/api', ContactUsRoute);
app.use('/api', BecameResellerRoute);

// Error handling middleware
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 6001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
