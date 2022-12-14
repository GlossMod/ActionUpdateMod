const AdmZip = require("adm-zip");
const fs = require("fs");
const path = require("path");

function package(aFilePath, aOutputPath) {
  let fileType = "";
  let fileStats = fs.lstatSync(aFilePath);
  if (fileStats.isDirectory()) fileType = "dir";
  if (fileStats.isFile()) {
    if (
      path.extname(aFilePath) === ".zip" ||
      path.extname(aFilePath) === ".rar" ||
      path.extname(aFilePath) === ".7z"
    )
      fileType = "zip";
    else fileType = "file";
  }
  if (fileType === "") throw new Error("Unknow file type.");

  if (fileType !== "zip") {
    const zip = new AdmZip();
    if (fileType === "dir") zip.addLocalFolder(aFilePath);
    if (fileType === "file") zip.addLocalFile(aFilePath);

    fs.mkdirSync(path.dirname(aOutputPath), { recursive: true });

    zip.writeZip(aOutputPath, (err) => {
      if (err) throw err;
    });
    return aOutputPath;
  }

  return aFilePath;
}

module.exports = package;
