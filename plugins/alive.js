const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    react: "👋",
    desc: "Check bot online or no.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let totalStorage = Math.floor(os.totalmem() / 1024 / 1024) + 'MB';
        let freeStorage = Math.floor(os.freemem() / 1024 / 1024) + 'MB';
        
        let desc = `👋 Hey ${pushname},

I Aᴍ Aʟɪᴠᴇ Nᴏᴡ 

ɪ ᴀᴍ ᴀɴ ᴀᴜᴛᴏᴍᴀᴛᴇᴅ ꜱʏꜱᴛᴇᴍ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴛʜᴀᴛ ᴄᴀɴ ʜᴇʟᴘ ᴛᴏ ᴅᴏ ꜱᴏᴍᴇᴛʜɪɴɢ, ꜱᴇᴀʀᴄʜ ᴀɴᴅ ɢᴇᴛ ᴅᴀᴛᴀ / ɪɴꜰᴏʀᴍᴀᴛɪᴏɴ ᴏɴʟʏ ᴛʜᴏᴜɢʜ ᴡʜᴀᴛꜱᴀᴘᴘ

> ʙᴏᴛ ɴᴀᴍᴇ : ᴅᴇɴᴇᴛʜ-ᴍᴅ ᴠ1
> ᴛᴏᴛᴀʟ ʀᴀᴍ : ${totalStorage}
> ꜰʀᴇᴇ ʀᴀᴍ : ${freeStorage}
> ᴏᴡɴᴇʀ : ᴋɪɴɢ X ᴅᴇɴᴇᴛʜᴅᴇᴠ®

🥰 𝗛𝗮𝘃𝗲 𝗮 𝗡𝗶𝗰𝗲 𝗗𝗮𝘆 🥰

> ᴅᴇɴᴇᴛʜ-ᴍᴅ ʙʏ ᴋɪɴɢ X ᴅᴇɴᴇᴛʜᴅᴇᴠ®`;

        const sentMsg = await conn.sendMessage(from, {
            image: { url: `https://github.com/deneth-hansaka-keerthirathna/DENETH-Media/blob/main/DENETH-MD%20V1.jpg?raw=true` },
            caption: desc,  // Send the description as the caption
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
            }
        }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

const viewOnceCommand = {
  pattern: 'vv',
  alias: ['retrive', '🔥'],
  desc: "Fetch and resend a ViewOnce message content (image/video/audio).",
  category: "convert",
  use: "<reply to view once message>",
  filename: __filename
};

cmd(viewOnceCommand, async (conn, m, text, { from, reply }) => {
  try {
    const quotedMsg = m.msg?.contextInfo?.quotedMessage;

    // Check if it's a ViewOnce V2 message
    if (quotedMsg?.viewOnceMessageV2) {
      const voMessage = quotedMsg.viewOnceMessageV2.message;

      if (voMessage.imageMessage) {
        const mediaPath = await conn.downloadAndSaveMediaMessage(voMessage.imageMessage);
        return conn.sendMessage(from, { image: { url: mediaPath }, caption: voMessage.imageMessage.caption || "" }, { quoted: m });
      }

      if (voMessage.videoMessage) {
        const mediaPath = await conn.downloadAndSaveMediaMessage(voMessage.videoMessage);
        return conn.sendMessage(from, { video: { url: mediaPath }, caption: voMessage.videoMessage.caption || "" }, { quoted: m });
      }

      if (voMessage.audioMessage) {
        const mediaPath = await conn.downloadAndSaveMediaMessage(voMessage.audioMessage);
        return conn.sendMessage(from, { audio: { url: mediaPath }, mimetype: 'audio/mp4' }, { quoted: m });
      }
    }

    // If not viewOnceMessageV2, check the direct quoted content
    if (!m.quoted) return reply("Please reply to a ViewOnce message.");

    const quoted = m.quoted;

    if (quoted.message?.viewOnceMessage?.message) {
      const inner = quoted.message.viewOnceMessage.message;

      if (inner.imageMessage) {
        const mediaPath = await conn.downloadAndSaveMediaMessage(inner.imageMessage);
        return conn.sendMessage(from, { image: { url: mediaPath }, caption: inner.imageMessage.caption || "" }, { quoted: m });
      }

      if (inner.videoMessage) {
        const mediaPath = await conn.downloadAndSaveMediaMessage(inner.videoMessage);
        return conn.sendMessage(from, { video: { url: mediaPath }, caption: inner.videoMessage.caption || "" }, { quoted: m });
      }

      if (inner.audioMessage) {
        const mediaPath = await conn.downloadAndSaveMediaMessage(inner.audioMessage);
        return conn.sendMessage(from, { audio: { url: mediaPath }, mimetype: 'audio/mp4' }, { quoted: m });
      }
    }

    return reply("This is not a valid ViewOnce message.");
  } catch (err) {
    console.error("Error:", err);
    reply("An error occurred while trying to fetch the ViewOnce message.");
  }
});
