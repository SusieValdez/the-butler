const Discord = require("discord.js");

class List {
  constructor() {
    this.items = [];
  }

  toString() {
    return "- " + this.items.join("\n- ");
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(item) {
    this.items = this.items.filter((listItem) => {
      return listItem !== item;
    });
  }
}

const client = new Discord.Client();
const channelID = process.env["JERRY_CHANNEL_ID"];
let jerryChan;

const shoppingList = new List();

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  jerryChan = await client.channels.fetch(channelID);
});

client.on("message", async (message) => {
  if (message.author.bot) return;

  if (message.content === "!list-items") {
    const listMessage = shoppingList.toString();
    jerryChan.send(listMessage);
    jerryChan.send("Don't forget THE BAGS!");
    return;
  }

  if (message.content.startsWith("!add-item")) {
    const item = message.content.replace("!add-item", "").trim();
    shoppingList.addItem(item);
    jerryChan.send(`Added ${item}`);
    return;
  }

  if (message.content.startsWith("!remove-item")) {
    const item = message.content.replace("!remove-item", "").trim();
    shoppingList.removeItem(item);
    jerryChan.send(`Removed ${item}`);
    return;
  }
});

client.login(process.env["TOKEN"]);
