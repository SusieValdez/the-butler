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
const shoppingList = new List();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {
  if (message.author.bot) return;

  if (message.content === "!list-items") {
    const listMessage = shoppingList.toString();
    message.channel.send(listMessage);
    message.channel.send("Don't forget THE BAGS!");
    return;
  }

  if (message.content.startsWith("!add-item")) {
    const item = message.content.replace("!add-item", "").trim();
    shoppingList.addItem(item);
    message.channel.send(`Added ${item}`);
    return;
  }

  if (message.content.startsWith("!remove-item")) {
    const item = message.content.replace("!remove-item", "").trim();
    shoppingList.removeItem(item);
    message.channel.send(`Removed ${item}`);
    return;
  }
});

client.login(process.env["TOKEN"]);
