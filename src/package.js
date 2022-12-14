const AdmZip = require("adm-zip");
const fs = require("fs");
const path = require("path");

function package(aFilePath, aOutputPath) {
  let fileType = "";
  let fileStats = fs.lstatSync(aFilePath);
  if (fileStats.isDirectory()) fileType = "directory";
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
    if (fileType === "directory") zip.addLocalFolder(aFilePath);
    if (fileType === "file") zip.addLocalFile(aFilePath);

    console.log(`The file option is a ${fileType} path. Generating a zip archive.`)

    fs.mkdirSync(path.dirname(aOutputPath), { recursive: true });

    zip.writeZip(aOutputPath, (err) => {
      if (err) throw err;
    });

    return aOutputPath;
  }
  
  console.log(`The file option is an archive file. Will upload directly.`)
  return aFilePath;
}

module.exports = package;
