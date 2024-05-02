const fs = require("fs");

module.exports.config = {
	name: "prefix",
	version: "1.0.1",
	role: 0,
	credits: "Kylepogi",
	description: "Display the prefix of your bot",
	hasPrefix: false,
	usages: "prefix",
	cooldown: 5,
	aliases: ["prefix", "Prefix", "PREFIX", "prefi"],
};

module.exports.run = function ({ api, event, prefix, admin }) {
	const { threadID, messageID } = event;

	// Check if the command is being executed manually
	if (event.body.toLowerCase() === `${prefix}prefix`) {
		// Send message indicating that the command cannot be executed manually
		api.sendMessage(
			"This command cannot be executed manually.",
			threadID,
			messageID
		);
		return;
	}

	// Send text message with prefix information
	api.sendMessage(
		{
			body: `heyyy, my prefix is [  ${prefix} ]\n\n━━━━━━━━━━━━━━━━━\n📌𝗛𝗢𝗪 𝗧𝗢 𝗨𝗦𝗘???:\n➥ ${prefix}help [number of page] -> see commands\n➥ ${prefix}sim [message] -> talk to bot\n➥ ${prefix}callad [message] -> report any problem encountered\n➥ ${prefix}help [command] -> information and usage of command\n━━━━━━━━━━━━━━━━━\nHave fun using it, enjoy! ❤️\nBot Developer: https://www.facebook.com/${admin}`,
			attachment: fs.createReadStream(__dirname + `/cache/prefix.gif`),
		},
		threadID,
		messageID
	);

	// Send voice message with additional information
	const voiceFile = fs.readFileSync(__dirname + "/cache/prefix.gif");
	api.sendMessage(
		{
			attachment: voiceFile,
			type: "audio",
			body: "Hey, listen to my prefix information!",
		},
		threadID,
		() => {}
	);

	// Set reaction to the message
	api.setMessageReaction("💦", messageID, (err) => {}, true);
};
