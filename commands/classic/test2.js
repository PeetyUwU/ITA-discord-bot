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
	name: 'test2',
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
		const Button = new ButtonBuilder({
			custom_id: 'customBtn',
			label: 'Test btn',
			style: ButtonStyle.Primary,
		});

		const row = new ActionRowBuilder({ components: [Button] });

		const colMessage = message.reply({
			components: [row],
			content: 'Boom',
		});

		const collectorFilter = (f) => f.user.id === author.id;

		const collector = (await colMessage).createMessageComponentCollector({
			filter: collectorFilter,
			time: 60000,
			max: 1,
		});

		collector.on('collect', (i) => {
			row.components[0].setDisabled(true);
			({ content: 'Boom', components: [row] });
			i.reply('You clicked this button');
		});

		return;
	},
};
