const bot = require('../config/telegram');

const messageController = {
    sendMessage: async (req, res) => {
        try {
            const {name, email, content } = req.body;

            if (!name || !email || !content) {
                return res.status(400).json({
                    success: false,
                    message: 'name, email and content are required'
                });
            }

            const messageText = `Name: ${name} \nEmail: *${email}*\nContent: ${content}`;

            await bot.sendMessage(process.env.TELEGRAM_GROUP_ID, messageText, {
                parse_mode: 'Markdown'
            });

            res.status(200).json({
                success: true,
                message: 'Message sent to Telegram successfully'
            });
        } catch (error) {
            console.error('Error sending message:', error);
            res.status(500).json({
                success: false,
                message: 'Error sending message to Telegram'
            });
        }
    }
};

module.exports = messageController; 