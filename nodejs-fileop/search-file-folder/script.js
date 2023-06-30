// Copyright (c) 2023 aasisodiya
// All rights reserved.
const fs = require("fs");

function searchFilesAndFoldersRecursively(directoryPath, searchParams) {
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
          searchFilesAndFoldersRecursively(filePath, searchParams); // Recursively call the function for subfolders
        } else {
          if (typeof searchParams == "string") {
            searchParams = [searchParams];
          }
          searchParams.forEach((searchParam) => {
            if (file.includes(searchParam)) {
              console.log(`File: ${filePath}`);
            }
          });
        }
      });
    });
  });
}

// Usage: Provide the directory path as the argument and in search param provide an array of search string to look for
searchFilesAndFoldersRecursively(
  "C:/Users/aasisodiya/Documents/GitHub/",
  [".stl",".gcode"]
);
