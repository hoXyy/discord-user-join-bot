import { Client, GatewayIntentBits, type TextChannel } from "discord.js";
import { config } from "dotenv";

config();

(async (): Promise<void> => {
  const { Guilds, GuildMessages, GuildMembers } = GatewayIntentBits;
  const client = new Client({ intents: [Guilds, GuildMessages, GuildMembers] });

  // Login to Discord
  await client.login(process.env.TOKEN);

  client.on("ready", () => {
    console.log("Ready!");
  });

  // Send message on user join
  client.on("guildMemberAdd",
    async (member) => {
      try {
        const channel = await member.guild.channels.fetch(process.env.CHANNEL_ID!);
        if (!channel) {
          return;
        }
        await (channel as TextChannel).send(`<@${member.user.id}> (nick przy dołączeniu: ${member.user.tag}) dołączył na serwer.`);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(`[ERROR] Failed to send join message: ${error.message}`);
        } else {
          console.error(`[ERROR] Failed to send join message: ${error}`);
        }
      }
    });

  // Send message on user leaving
  client.on("guildMemberRemove",
    async (member) => {
      try {
        const channel = await member.guild.channels.fetch(process.env.CHANNEL_ID!);
        if (!channel) {
          return;
        }
        await (channel as TextChannel).send(`${member.user.tag} wyszedł z serwera.`);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(`[ERROR] Failed to send leave message: ${error.message}`);
        } else {
          console.error(`[ERROR] Failed to send leave message: ${error}`);
        }
      }
    });
})().catch((err: unknown) => {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    console.error(err);
  }
  process.exit(1);
});
