const moment = require("moment-timezone");
const axios = require('axios');

module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['gpt', 'openai'],
  description: "An AI command powered by GPT-4",
  usage: "Ai [promot]",
  credits: 'Developer',
  cooldown: 3,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`Please provide a question or statement after 'ai'. For example: 'ai What is the capital of France?'`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`🔍 𝙎𝙚𝙖𝙧𝙘𝙝𝙞𝙣𝙜"${input}"𝙥𝙡𝙚𝙖𝙨𝙚 𝙬𝙖𝙞𝙩....`, event.threadID, event.messageID);
  try {
    const {
      data
    } = await axios.get(`https://api-soyeon.onrender.com/api?prompt=${encodeURIComponent(input)}`);
    const response = data.response;
    api.sendMessage('💀𝗔𝗨𝗧𝗢𝗠𝗔𝗧𝗘𝗗𝗕𝗢𝗧 𝗥𝗘𝗦𝗣𝗢𝗡𝗦𝗘:\n\n' response + '\n🗓️ | ⏰ 𝙳𝚊𝚝𝚎 & 𝚃𝚒𝚖𝚎:\n${formattedDateTime}\n\n𝗖𝗥𝗘𝗔𝗧𝗘 𝗬𝗢𝗨𝗥 𝗢𝗪𝗡 𝗕𝗢𝗧 𝗛𝗘𝗥𝗘: https://autobot-v2chatbot-6h7o.onrender.com\n\nHello there! I hope you're having a great day. Just a little reminder to always give credit to my creator, as they are the brilliant mind behind my existence. Don't forget to add my creator: https://www.facebook.com/itssmekylebaitit in any mentions or acknowledgments. Thank you and have a wonderful day!', event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
    const manilaTime = moment.tz('Asia/Manila');
        const formattedDateTime = manilaTime.format('MMMM D, YYYY h:mm A');
  }
};
