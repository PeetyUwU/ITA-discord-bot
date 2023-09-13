const fs = require('fs');
const DiscordJS = require('discord.js');
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
require('dotenv').config();

const PREFIX = ';';

/**
 * @type {Client}
 */
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildWebhooks,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.DirectMessageTyping,
	],
	partials: [
		Partials.Channel,
		Partials.Message,
		Partials.User,
		Partials.Reaction,
		Partials.GuildMember,
		Partials.ThreadMember,
		Partials.GuildScheduledEvent,
	],
});

module.exports = {
	DiscordJS,
	client,
};

client.on('ready', (c) => {
	console.log(`Discord bot running as: ${c.user.tag}`);
});

//! Command handler clasic
client.commands = new Collection();

const commandsPath = './commands/classic';
const commandFiles = fs
	.readdirSync(commandsPath)
	.filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = `./commands/classic/${file}`;
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('name' in command && 'run' in command) {
		client.commands.set(command.name, command);
		if ('alias' in command) {
			command.alias.forEach((ali) => {
				client.commands.set(ali, command);
			});
		}
	} else {
		console.log(
			consoleColors.FgRed,
			'[WARNING]',
			consoleColors.Reset,
			`The command at ${filePath} is missing a required "data" or "execute" property.`,
			consoleColors.Reset
		);
	}
}

// client.interactions = new Collection();

// const commandsInteractionPath = './commands/classic';
// const commandInteractionFiles = fs
// 	.readdirSync(commandsInteractionPath)
// 	.filter((file) => file.endsWith('.js'));

// for (const file of commandInteractionFiles) {
// 	const filePath = `./commands/classic/${file}`;
// 	const command = require(filePath);
// 	// Set a new item in the Collection with the key as the command name and the value as the exported module
// 	if ('name' in command && 'run' in command) {
// 		client.interactions.set(command.name, command);
// 		if ('alias' in command) {
// 			command.interactionsAlias.forEach((ali) => {
// 				client.interactions.set(ali, command);
// 			});
// 		}
// 	} else {
// 		console.log(
// 			consoleColors.FgRed,
// 			'[WARNING]',
// 			consoleColors.Reset,
// 			`The command at ${filePath} is missing a required "data" or "execute" property.`,
// 			consoleColors.Reset
// 		);
// 	}
// }

const cooldowns = new Map();

client.on('messageCreate', async (message) => {
	if (message.author.bot) return;
	if (!message.content.startsWith(PREFIX)) return;

	const args = message.content.slice(PREFIX.length).split(/ +/);
	// const command = args.shift().toLowerCase();
	const channel = message.channel;
	const author = message.author;
	const guild = message.guild;

	try {
		const command = client.commands.get(args.shift().toLowerCase());

		if (!command) {
			console.error(
				`No command matching ${
					args.length > 0 ? args.shift().toLowerCase() : "Can't find"
				} was found.`
			);
			return;
		}

		//! COOLDOWN
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new DiscordJS.Collection());
		}

		const current_time = Date.now();
		const time_stamps = cooldowns.get(command.name);
		const cooldown_ammount = command.cooldown * 1000;

		if (time_stamps.has(author.id)) {
			const expiracion_time =
				time_stamps.get(author.id) + cooldown_ammount;

			if (current_time < expiracion_time) {
				const time_left = (expiracion_time - current_time) / 1000;

				return message.reply(
					`Please wait \`${time_left.toFixed(1)}s\` before using ${
						command.name
					}!!`
				);
			}
		}

		time_stamps.set(author.id, current_time);
		setTimeout(() => {
			time_stamps.delete(author.id);
		}, cooldown_ammount);
		//! COOLDOWN

		await command.run(message, author, guild, channel, args);
	} catch (error) {
		console.error(error);
		await message.reply({
			content: 'There was an error while executing this command!',
			ephemeral: true,
		});
	}
});

client.login(process.env.TOKEN);
