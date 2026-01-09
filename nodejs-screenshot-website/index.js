const Pageres = require("pageres");

let links = [
  "https://aasisodiya.github.io/WebProjects/52ThreeJs/01BasicExample"
];

(async () => {
  for (let index = 0; index < links.length; index++) {
    const link = links[index];
    console.log(link);
    let ok = await new Pageres({ delay: 2 })
      .src(link, ["1366x768"])
      .dest(__dirname)
      .run();
    console.log(ok);
    console.log("Finished generating screenshots!");
    await new Promise((r) => setTimeout(() => r(), 5000));
  }
})();
