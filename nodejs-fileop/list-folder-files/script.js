// Copyright (c) 2023 aasisodiya
// All rights reserved.
const fs = require("fs");

function listFilesAndFoldersRecursively(directoryPath) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }
    files.forEach((file) => {
      const filePath = `${directoryPath}/${file}`;
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error("Error getting file stats:", err);
          return;
        }

        if (stats.isDirectory()) {
          console.log(`Folder: ${filePath}`);
          listFilesAndFoldersRecursively(filePath); // Recursively call the function for subfolders
        } else {
          console.log(`File: ${filePath}`);
        }
      });
    });
  });
}

// Usage: Provide the directory path as the argument
listFilesAndFoldersRecursively("C:/Users/aasisodiya/Documents/GitHub/");
