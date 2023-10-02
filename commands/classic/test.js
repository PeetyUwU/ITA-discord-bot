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
	name: 'test',
	description: 'Bam',
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
		const Embed = new EmbedBuilder({
			color: 0xff0000,
			timestamp: Date.now(),
			title: 'boom',
			fields: [{ name: 'Bam', value: 'Yeet' }],
		});
		Embed.setImage(
			'https://libertymaniacs.com/cdn/shop/products/kiss-cut-stickers-4x4-5fca8e763da63_2000x.jpg?v=1607110266'
		);
		message.reply({ embeds: [Embed] });
		return;
	},
};
