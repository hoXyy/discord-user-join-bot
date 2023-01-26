import { Client, GatewayIntentBits, TextChannel } from "discord.js";
const { Guilds, GuildMessages, GuildMembers } = GatewayIntentBits;
const client = new Client({ intents: [Guilds, GuildMessages, GuildMembers] });
import { config } from "dotenv";
config();

// Login to Discord
client.login(process.env.TOKEN);

client.on("ready", () => {
  console.log("Ready!");
});

// Send message on user join
client.on("guildMemberAdd", (member) => {
  member.guild.channels.fetch(process.env.CHANNEL_ID!).then((channel) => {
    (channel as TextChannel).send(`<@${member.user.id}> dołączył na serwer.`);
  });
});

// Send message on user leaving
client.on("guildMemberRemove", (member) => {
  member.guild.channels.fetch(process.env.CHANNEL_ID!).then((channel) => {
    (channel as TextChannel).send(`${member.user.tag} wyszedł z serwera.`);
  });
});
