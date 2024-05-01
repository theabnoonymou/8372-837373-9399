const axios = require('axios');
const moment = require("moment-timezone");


module.exports.config = {
    name: "ai2",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Kyle", // Changed the credits to "Kyle"
    description: "EDUCATIONAL",
    hasPrefix: false,
    commandCategory: "AI",
    usages: "[question]",
    cooldowns: 10
};

module.exports.run = async function ({ api, event, args }) {
    const question = args.join(' ');
    const apiUrl = `https://markdevsapi-2014427ac33a.herokuapp.com/gpt4?ask=${encodeURIComponent(question)}`;

    if (!question) return api.sendMessage("Please provide a question first.", event.threadID, event.messageID);

    try {
const manilaTime = moment.tz('Asia/Manila');
        const formattedDateTime = manilaTime.format('MMMM D, YYYY h:mm A');
        api.sendMessage("Please bear with me while I ponder your request...", event.threadID, event.messageID);

        const response = await axios.get(apiUrl);
        const answer = response.data.answer;

        api.sendMessage(`💫𝗔𝗨𝗧𝗢𝗕𝗢𝗧 𝗥𝗘𝗦𝗣𝗢𝗡𝗦𝗘:\n━━━━━━━━━━━━━━━━━━━\n𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻: ${question}\n━━━━━━━━━━━━━━━━━━━\n𝗔𝗻𝘀𝘄𝗲𝗿: ${answer}\n\n🗓️ | ⏰ 𝗗𝗔𝗧𝗘 𝗔𝗡𝗗 𝗧𝗜𝗠𝗘:\n${formattedDateTime}\n\n𝗖𝗥𝗘𝗔𝗧𝗘 𝗬𝗢𝗨𝗥 𝗢𝗪𝗡 𝗕𝗢𝗧 𝗛𝗘𝗥𝗘: https://autobot-v2chatbot-6h7o.onrender.com\n 𝗖𝗥𝗘𝗔𝗧𝗢𝗥: https://www.facebook.com/itssmekylebaitit\n\nHello there! I hope you're having a great day. Just a little reminder to always give credit to my creator, as they are the brilliant mind behind my existence. Don't forget to add my creator in any mentions or acknowledgments. Thank you and have a wonderful day!`, event.threadID, event.messageID); // Added the FB link
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
