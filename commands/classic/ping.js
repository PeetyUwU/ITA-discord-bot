const { client, DiscordJS } = require('../../index.js');
const {
	Client,
	GatewayIntentBits,
	Permissions,
	Partials,
	EmbedBuilder,
	ActivityType,
	SlashCommandBuilder,
	Collection,
	MessageCollector,
	ReactionCollector,
	ModalBuilder,
	ActionRowBuilder,
	TextInputBuilder,
	TextInputStyle,
	ButtonBuilder,
	ButtonStyle,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	UserSelectMenuBuilder,
	RoleSelectMenuBuilder,
	MentionableSelectMenuBuilder,
	ChannelSelectMenuBuilder,
	ApplicationCommandType,
	ContextMenuCommandBuilder,
} = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'PONG!',
	type: '',
	alias: [],
	cooldown: 0,
	userPerms: [],
	botPerms: [],
	/**
	 * Execute command
	 * @param {DiscordJS.Message} message - The message that was sent
	 * @param {DiscordJS.Guild} guild - The discord bot client
	 * @param {DiscordJS.Channel} channel - The discord bot client
	 */
	run: async (message, author, guild, channel, args) => {
		message.reply('PONG!');
		return;
	},
};
