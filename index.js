const express = require('express');
const cors = require('cors');
const messageRoutes = require('./src/routes/messageRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// // CORS configuration
// const corsOptions = {
//     origin: ['http://yourallowedorigin.com', 'http://localhost:3000'],
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// };

// Middleware
app.use(cors()); // Enable CORS with specific options
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.status(200).json('Welcome, your app is working well');
})
app.use('/api/messages', messageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 

module.exports = app