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

const axios = require('axios');

cmd({
    pattern: "vv",
    alias: ['retrive'],
    desc: "Fetch and resend a ViewOnce message content (image/video/audio).",
    category: "misc",
    use: '<reply to view once>',
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const quotedMessage = m.msg?.contextInfo?.quotedMessage;

        // Handle viewOnceMessageV2
        if (quotedMessage?.viewOnceMessageV2) {
            const viewOnce = quotedMessage.viewOnceMessageV2.message;

            if (viewOnce?.imageMessage) {
                const caption = viewOnce.imageMessage.caption || "";
                const media = await conn.downloadAndSaveMediaMessage(viewOnce.imageMessage);
                return conn.sendMessage(from, { image: { url: media }, caption }, { quoted: mek });
            }

            if (viewOnce?.videoMessage) {
                const caption = viewOnce.videoMessage.caption || "";
                const media = await conn.downloadAndSaveMediaMessage(viewOnce.videoMessage);
                return conn.sendMessage(from, { video: { url: media }, caption }, { quoted: mek });
            }

            if (viewOnce?.audioMessage) {
                const media = await conn.downloadAndSaveMediaMessage(viewOnce.audioMessage);
                return conn.sendMessage(from, { audio: { url: media }, mimetype: 'audio/mp4' }, { quoted: mek });
            }
        }

        // Fallback for regular quoted ViewOnce messages
        const quoted = m.quoted?.message?.viewOnceMessage?.message;

        if (!quoted) return reply("Please reply to a ViewOnce message.");

        if (quoted?.imageMessage) {
            const caption = quoted.imageMessage.caption || "";
            const media = await conn.downloadAndSaveMediaMessage(quoted.imageMessage);
            return conn.sendMessage(from, { image: { url: media }, caption }, { quoted: mek });
        }

        if (quoted?.videoMessage) {
            const caption = quoted.videoMessage.caption || "";
            const media = await conn.downloadAndSaveMediaMessage(quoted.videoMessage);
            return conn.sendMessage(from, { video: { url: media }, caption }, { quoted: mek });
        }

        if (quoted?.audioMessage) {
            const media = await conn.downloadAndSaveMediaMessage(quoted.audioMessage);
            return conn.sendMessage(from, { audio: { url: media }, mimetype: 'audio/mp4' }, { quoted: mek });
        }

        return reply("This is not a supported ViewOnce media message.");

    } catch (e) {
        console.error("Error in ViewOnce Fetch:", e);
        return reply("❌ Failed to fetch ViewOnce message. Please try again.");
    }
});
