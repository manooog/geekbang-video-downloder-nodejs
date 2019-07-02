const Axios = require("axios");
const config = require("./config");
const shell = require("shelljs");
const fs = require("fs");
const path = require("path");

const axios = Axios.create({
  headers: {
    Cookie: `_ga=${config._ga}; _gid=${config._gid}; GCID=${
      config.GCID
    }; GCESS=${config.GCESS}`,
    "Content-Type": "application/json"
  }
});

async function getList(cid) {
  let res = await axios
    .post(
      "https://time.geekbang.org/serv/v1/column/articles",
      {
        cid: cid,
        order: "earliest",
        prev: 0,
        sample: false,
        size: 50
      },
      {
        headers: {
          Referer: `https://time.geekbang.org/course/intro/${cid}`
        }
      }
    )
    .catch(err => console.log(err.response));
  if (res && res.data.data.list && res.data.data.list.length > 0) {
    return res.data.data.list;
  } else {
    return [];
  }
}

async function download(item) {
  const localPath = `./download/${item.article_title.replace(
    /((\s|\|))/g,
    "_"
  )}.mp4`;
  return new Promise((resolve, reject) => {
    if (fs.existsSync(path.resolve(__dirname, localPath))) {
      resolve(0);
    } else {
      shell.exec(
        `ffmpeg -i ${item.video_media_map.hd.url} ${localPath}`,
        code => {
          if (code === 0) {
            resolve(0);
          } else {
            reject();
          }
        }
      );
    }
  });
}

(async function() {
  !fs.existsSync(path.resolve(__dirname, "download")) &&
    fs.mkdirSync(path.resolve(__dirname, "download"));
  const list = await getList(config.cid);
  for await (const item of list) {
    await download(item).catch(err => {});
  }
})();
