const core = require("@actions/core");
const fs = require("fs");

class Options {
  appId;
  appKey;
  id;
  title;
  tags;
  version;
  desc;
  content;
  file;
  zipOnly;
  outputPath = "./.action_update_mod/output.zip";

  constructor() {
    this.appId = core.getInput("appid", { required: true });
    this.appKey = core.getInput("appkey", { required: true });
    this.id = core.getInput("id", { required: true });
    this.title = core.getInput("title") || null;
    this.tags = core.getInput("tags") || null;
    this.version = core.getInput("version") || null;
    this.desc = core.getInput("desc") || null;
    this.content = this.#loadContent(core.getInput("content")) || null;
    this.file = core.getInput("file") || null;
    this.zipOnly = core.getBooleanInput("zip-only");
    this.test = core.getBooleanInput("test");

    if (this.file && !fs.existsSync(this.file))
      throw new Error(`Mod file/folder ${this.file} does not exist.`);
  }

  #loadContent(aContent) {
    // check if content is a file
    if (fs.existsSync(aContent) && fs.lstatSync(aContent).isFile()) {
      console.log(
        `The content option is a file path, loading file ${aContent} into a string.`
      );
      return fs.readFileSync(aContent, { encoding: "utf-8" });
    }

    console.log("The content option is a string.");
    return aContent;
  }
}

module.exports = Options;
