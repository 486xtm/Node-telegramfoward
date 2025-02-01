const express = require('express');
const cors = require('cors');
const messageRoutes = require('./src/routes/messageRoutes');
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
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