import axios from "axios";

const handler = async (m, { conn, args, command, usedPrefix }) => {
  const datas = global;
  const idioma = datas.db.data.users[m.sender].language;
  const _translate = JSON.parse(fs.readFileSync(`./src/languages/es.json`));
  const tradutor = _translate.plugins.descargas_instagram;

  if (!args[0])
    throw `
╭──────>⋆☽⋆ ⋆☾⋆<──────╮
│GUERRA DE CLANES          
╰──────>⋆☽⋆ ⋆☾⋆<──────╯
╭──────────────╮
│ㅤ⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎 
│➥ 
│➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒:
│
│     𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 ➹𝟏
│
│👑 ➤ 
│⚜️ ➤ 
│⚜️ ➤ 
│⚜️ ➤ 
│     
│    𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 ➹𝟐
│
│👑 ➤ 
│⚜️ ➤ 
│⚜️ ➤ 
│⚜️ ➤ 
│
│    𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 ➹𝟑
│
│👑 ➤ 
│⚜️ ➤ 
│⚜️ ➤ 
│⚜️ ➤ 
│
│    𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 ➹𝟒
│
│👑 ➤ 
│⚜️ ➤ 
│⚜️ ➤ 
│⚜️ ➤ 
│
│    𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 ➹𝟓
│
│👑 ➤ 
│⚜️ ➤ 
│⚜️ ➤ 
│⚜️ ➤ 
│
│    𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 ➹𝟔
│
│👑 ➤ 
│⚜️ ➤ 
│⚜️ ➤ 
│⚜️ ➤ 
│
│ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒:
│⚜️ ➤ 
│⚜️ ➤
│⚜️ ➤ 
│⚜️ ➤ 
│⚜️ ➤ 
│⚜️ ➤ 
╰─────────────╯
      
   
`;
  await m.reply(global.wait);
  try {
    const img = await instagramDownload(args[0]);
    for (let i = 0; i < img.data.length; i++) {
      const item = img.data[i];
      if (item.type === "image") {
        await conn.sendMessage(
          m.chat,
          { image: { url: item.url } },
          { quoted: m },
        );
      } else if (item.type === "video") {
        await conn.sendMessage(
          m.chat,
          { video: { url: item.url } },
          { quoted: m },
        );
      }
    }
  } catch (err) {
    const res = await axios.get(
      "https://deliriusapi-official.vercel.app/download/instagram",
      {
        params: {
          url: args[0],
        },
      },
    );
    const result = res.data.data;
    for (let i = 0; i < result.length; i++) {
      const item = result[i];
      if (item.type === "image") {
        await conn.sendMessage(
          m.chat,
          { image: { url: item.url } },
          { quoted: m },
        );
      } else if (item.type === "video") {
        await conn.sendMessage(
          m.chat,
          { video: { url: item.url } },
          { quoted: m },
        );
      }
    }
  }
};

handler.command =
  /^(clan|guerra)$/i;
export default handler;

const instagramDownload = async (url) => {
  return new Promise(async (resolve) => {
    if (!url.match(/\/(reel|reels|p|stories|tv|s)\/[a-zA-Z0-9_-]+/i)) {
      return resolve({ status: false, creator: "Sareth" });
    }

    try {
      let jobId = await (
        await axios.post(
          "https://app.publer.io/hooks/media",
          {
            url: url,
            iphone: false,
          },
          {
            headers: {
              Accept: "/",
              "Accept-Encoding": "gzip, deflate, br, zstd",
              "Accept-Language": "es-ES,es;q=0.9",
              "Cache-Control": "no-cache",
              Origin: "https://publer.io",
              Pragma: "no-cache",
              Priority: "u=1, i",
              Referer: "https://publer.io/",
              "Sec-CH-UA":
                '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
              "Sec-CH-UA-Mobile": "?0",
              "Sec-CH-UA-Platform": '"Windows"',
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
            },
          },
        )
      ).data.job_id;
      let status = "working";
      let jobStatusResponse;
      while (status !== "complete") {
        jobStatusResponse = await axios.get(
          `https://app.publer.io/api/v1/job_status/${jobId}`,
          {
            headers: {
              Accept: "application/json, text/plain, /",
              "Accept-Encoding": "gzip, deflate, br, zstd",
              "Accept-Language": "es-ES,es;q=0.9",
              "Cache-Control": "no-cache",
              Origin: "https://publer.io",
              Pragma: "no-cache",
              Priority: "u=1, i",
              Referer: "https://publer.io/",
              "Sec-CH-UA":
                '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
              "Sec-CH-UA-Mobile": "?0",
              "Sec-CH-UA-Platform": '"Windows"',
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
            },
          },
        );
        status = jobStatusResponse.data.status;
      }

      let data = jobStatusResponse.data.payload.map((item) => {
        return {
          type: item.type === "photo" ? "image" : "video",
          url: item.path,
        };
      });

      resolve({
        status: true,
        data,
      });
    } catch (e) {
      resolve({
        status: false,
        msg: new Error(e).message,
      });
    }
  });
};
