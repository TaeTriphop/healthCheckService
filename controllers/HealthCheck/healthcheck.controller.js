const Service = require("../../services/HealthCheck/healthcheck.service");
const fetch = require("node-fetch");
const config = require("../../configs/app");

const methods = {
  async onProcessCheck(req, res) {
    try {
      let result = await Service.processCheck();

      sendDiscordNotification(result);

      res.success(result);
    } catch (error) {}
  },
};

async function sendDiscordNotification(data) {
  // const webhookUrl =    "https://discord.com/api/webhooks/1299199762498846801/nQzvhA8A2lqe1lGtBRmkwsEgkSGr6stdsoc5Qe8k3U7jBPltEKejXSH8yeYbg_4tg6-i"; // Test
  const webhookUrl =
    "https://discord.com/api/webhooks/1316608898840395848/H8drwhyWJ2vIuDysioVzeJzyPWGPKwd0IS2sEoeKPWtWqc63vuMc81SCp_sxNgQE12Xk"; // Test
  const embeds = [];

  //#region APIsStatus

  const APIsStatus = data.APIStatus;
  embeds.push({
    title: "API Status Overview",
    color: 3447003, // Blue for general overview
    fields: APIsStatus.map((api) => ({
      name: api.status === "UP" ? `🟢 ${api.url}` : `🔴 ${api.url}`,
      value: [
        `**Response Time:** ${api.responseTime} ms`,
        `**Status Code:** ${
          api.statusCode !== 200
            ? `${api.statusCode} - ${api.error || "Unknown Error"}`
            : `${api.statusCode}`
        }`,
      ].join("\n"),
      inline: false,
    })),
    thumbnail: {
      url: "https://i.pinimg.com/736x/e2/c3/56/e2c35675383ea20c72b7fcc6ec6784e4.jpg",
    },
  });

  //#endregion

  //#region connectionStatus
  const connectionStatus = data.ConnectionStatus;
  const groupedConnections = connectionStatus.reduce(
    (result, db) => {
      if (db.status.toLowerCase() === "success") {
        result.success.push(db);
      } else if (db.status.toLowerCase() === "error") {
        result.error.push(db);
      }
      return result;
    },
    { success: [], error: [] }
  );

  if (groupedConnections.success.length > 0) {
    embeds.push({
      title: "🔍 **System Health Check Summary**",
      color: 65280, // สีเขียว
      fields: groupedConnections.success.map((db) => ({
        name: `📍 **Connection : ${db.connect}**`,
        value: `\`\`\`Status: ${db.status} 🟢 \nMessage: ${db.message}\`\`\``,
        inline: false,
      })),
      thumbnail: {
        url: "https://i.pinimg.com/736x/9b/65/9b/9b659b0b88efdb8acba5bf8a2f2511c5.jpg",
      },
    });
  }

  if (groupedConnections.error.length > 0) {
    embeds.push({
      title: "**Connection Failed.**",
      color: 16711680, // สีแดง
      fields: groupedConnections.error.map((db) => ({
        name: `**📂 Database : ${db.connect}**`,
        value: `\`\`\`Status: ${db.status} 🔴 \nMessage: ${db.error}\`\`\``,
        inline: false,
      })),
      thumbnail: {
        url: "https://i.pinimg.com/736x/e3/68/40/e36840cc4d09760a354753ae7e98a0fa.jpg",
      },
    });
  }
  //#endregion

  //#region DatabaseStatus
  const databaseStatus = data.DatabaseStatus;
  if (databaseStatus.DataCount > 0) {
    embeds.push({
      title: "**🔒 Database Lock.**",
      color: 16711680,
      fields: databaseStatus.data.map((db) => ({
        name: `\n**🔴  Database : ${db.DBName} **`,
        value: `\`\`\`Status: ${db.Status} \nCommand: ${db.Command}\`\`\``,
        inline: false,
      })),
      thumbnail: {
        // url: "https://i.pinimg.com/736x/82/ac/e7/82ace738ceac80fa06562920ab156e7a.jpg",
        url: "https://i.pinimg.com/originals/03/29/8c/03298cd89057b884879d451bb9f54ff5.gif",
      },
    });
  } else {
    embeds.push({
      title: "** 🔓 Database No Lock .**",
      color: 65280,
      fields: [
        {
          name: `\n** Database : No Lock**`,
          value: `\`\`\`Status: 🟢 \`\`\``,
          inline: false,
        },
      ],
      thumbnail: {
        url: "https://i.pinimg.com/736x/6d/2c/4d/6d2c4d1be5ed7dbe22513063b1508260.jpg",
      },
    });
  }
  //#endregion

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds }),
    });
    console.log("Notification sent to Discord successfully!");
  } catch (error) {
    console.error("Error sending notification to Discord:", error.message);
  }
}

module.exports = { ...methods };
