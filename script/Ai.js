const axios = require('axios');
const fs = require('fs');
const moment = require('moment-timezone');

module.exports.config = {
    name: "ai",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ninakaw lang ni churchill to ha ni mod ko lang", // modified by Kyle Bait-it
    description: "EDUCATIONAL",
    hasPrefix: false,
    commandCategory: "AI",
    usages: "[question]",
    cooldowns: 10
};

module.exports.run = async function ({ api, event, args }) {
    const question = args.join(' ');
    
    if (!question) return api.sendMessage("Please provide a question first.", event.threadID, event.messageID);

    try {
        api.sendMessage("Please bear with me while I ponder your request...", event.threadID, event.messageID);

        const userInput = encodeURIComponent(question);
        const uid = event.senderID;
        const apiUrl = `https://deku-rest-api.replit.app/gpt4?prompt=${userInput}&uid=${uid}`;
        
        const response = await axios.get(apiUrl);
        const answer = response.data.gpt4;

        const timeString = moment.tz('Asia/Manila').format('LLLL');

        api.sendMessage({
            body: `𝗔𝗜 𝗥𝗘𝗦𝗣𝗢𝗡𝗦𝗘: \n━━━━━━━━━━━━━━━━━━━\n𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻: ${question}\n━━━━━━━━━━━━━━━━━━━\n𝗔𝗻𝘀𝘄𝗲𝗿: ${answer}\n\n📆|⏰𝗗𝗔𝗧𝗘 𝗔𝗡𝗗 𝗧𝗜𝗠𝗘:${timeString}\n\nFOLLOW THE DEVELOPER: https://www.facebook.com/itssmekylebaitit\n\n𝙲𝚁𝙴𝙰𝚃𝙴 𝚈𝙾𝚄𝚁 𝙾𝚆𝙽 𝙱𝙾𝚃 𝙷𝙴𝚁𝙴: https://autobot-v2chatbot-6h7o.onrender.com.`
        }, event.threadID, (error, info) => {
            if (error) {
                console.error(error);
                api.sendMessage("An error occurred while sending the message.", event.threadID);
            }
        });
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
