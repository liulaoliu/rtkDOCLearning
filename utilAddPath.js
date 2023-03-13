const Path = require("path");
const FS = require("fs");

function ThroughDirectory(Directory) {
  FS.readdirSync(Directory).forEach((File) => {
    const Absolute = Path.join(Directory, File);
    if (FS.statSync(Absolute).isDirectory()) return ThroughDirectory(Absolute);
    // else return Files.push(Absolute);
    else {
      //   FS.appendFile(Absolute, Absolute, function (err) {
      //     if (err) throw err;
      //     console.log("Saved!");
      //   });

      var data = FS.readFileSync(Absolute); //read existing contents into data

      if (data.includes("这是注释，显示文件路径捏")) {
        return;
      }

      const shouldAddCommentFileType = ["tsx", "ts", "js", "jsx"];
      const len = Absolute.split(".").length;
      const fileType = Absolute.split(".")[len - 1];
      if (shouldAddCommentFileType.includes(fileType)) {
        var fd = FS.openSync(Absolute, "w+");
        var buffer = Buffer.from(
          "//这是注释，显示文件路径捏:/" +
            Absolute.replace("d:\\waoh\\my-app\\", "").replaceAll("\\", "/") +
            "\n"
        );
        FS.writeSync(fd, buffer, 0, buffer.length, 0); //write new data
        FS.writeSync(fd, data, 0, data.length, buffer.length); //append old data
        // or FS.appendFile(fd, data);
        FS.close(fd);
      }
    }
  });
}

ThroughDirectory(Path.resolve(__dirname, "src"));
