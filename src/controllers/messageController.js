const bot = require("../config/telegram");

const messageController = {
  sendMessage: async (req, res) => {
    try {
      let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      if (ip === "::1") {
        await fetch("https://api.ipify.org?format=json")
          .then((response) => response.json())
          .then((data) => {
            ip = data.ip;
          })
          .catch((error) => console.error("Error fetching IP address:", error));
      }
      let geo;
      await fetch(`http://ip-api.com/json/${ip}`)
        .then((response) => response.json())
        .then((data) => {
          geo = `${data.city}, ${data.regionName}, ${data.country}`;
        });
      //   const { ipAddress, location, content } = req.body;
      const ipAddress = ip;
      const location = geo;
      const { content } = req.body;

      if (!ipAddress || !location || !content) {
        return res.status(400).json({
          success: false,
          message: "ipAddress, location and content are required",
        });
      }

      const messageText = `IpAddress: ${ipAddress} \nLocation: *${location}*\nContent: ${content}`;

      await bot.sendMessage(process.env.TELEGRAM_GROUP_ID, messageText, {
        parse_mode: "Markdown",
      });

      res.status(200).json({
        success: true,
        message: "Message sent to Telegram successfully",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({
        success: false,
        message: "Error sending message to Telegram",
      });
    }
  },
};

module.exports = messageController;
