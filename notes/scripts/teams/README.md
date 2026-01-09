# Keep Me Alive

[![Visitors](https://api.visitorbadge.io/api/visitors?path=aasisodiya.nodejs.keepmealive&labelColor=%23ffa500&countColor=%23263759&labelStyle=upper)](https://visitorbadge.io/status?path=aasisodiya.nodejs.keepmealive)

- [Keep Me Alive](#keep-me-alive)
  - [Steps To Keep You Live](#steps-to-keep-you-live)
  - [Q&A](#qa)

## Steps To Keep You Live

> You need to be logged-in from a browser (preferably chrome)

1. Open Console
2. Choose a time interval (in minutes) and update the code below.
3. Then copy the same code and paste it in the console.
4. Press Enter (i.e basically execute the code)
5. Done!

```js
let timeIntervalInMinutes = 1;
let keepmealive = setInterval(function () {
  setTimeout(function () {
    // console.log("1");
    $(".user-information-button").click();
  }, 1000);
  setTimeout(function () {
    // console.log("2");
    $(".profile-set-presence-button").click();
  }, 2000);
  setTimeout(function () {
    // console.log("3");
    $(".menuitem:nth-child(1) > .ts-sym:nth-child(1)").click();
  }, 3000);
}, timeIntervalInMinutes * 60 * 1000);
```

## Q&A

- How to check if program is working?

  - Make sure to keep console open
  - Uncomment the console logs and check for the output for each interval
  - UI will react to each command and open respective windows/panels for performing the click operations

- How to stop the program? (Without closing the window/console)
  - In browser console run command `clearInterval(keepmealive);`

[![Visitors](https://api.visitorbadge.io/api/visitors?path=aasisodiya.nodejs&label=aasisodiya/nodejs&labelColor=%23ffa500&countColor=%23263759&labelStyle=upper)](https://visitorbadge.io/status?path=aasisodiya.nodejs)
