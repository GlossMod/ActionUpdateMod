const core = require("@actions/core");
const fetch = require("node-fetch");
const FormData = require("form-data");
const Options = require("./options");
const package = require("./package");

const API_ENDPOINT = "https://mod.3dmgame.com/api/UpModData";

async function main() {
  try {
    const options = new Options();

    const modInfo = {
      id: options.id,
      mods_title: options.title,
      mods_key: options.tags,
      mods_version: options.version,
      mods_desc: options.desc,
      mods_content: options.content,
    };

    let bodyContent = new FormData();
    bodyContent.append("APPID", options.appId);
    bodyContent.append("APPKEY", options.appKey);
    bodyContent.append("mod", JSON.stringify(modInfo));

    if (options.file) {
      const filePath = package(options.file, options.outputPath);
      bodyContent.append("file", fs.createReadStream(filePath));
    }

    if (options.test) {
      core.setOutput("code", "00");
      core.setOutput("msg", "更新成功");
      return;
    }

    let response = await fetch(API_ENDPOINT, {
      method: "POST",
      body: bodyContent,
    });

    if (!response.ok)
      throw Error(
        `API responded with Status: ${response.status} ${response.statusText}`
      );

    let data = await response.json();

    if (data.code != 00)
      throw Error(`API responded with code: ${data.code}, ${data.msg}`);

    core.setOutput("code", data.code);
    core.setOutput("msg", data.msg);
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
