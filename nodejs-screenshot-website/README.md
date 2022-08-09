# Screenshot Websites

[![Visitors](https://api.visitorbadge.io/api/visitors?path=aasisodiya.nodejs.screenshotwebsite&labelColor=%23ffa500&countColor=%23263759&labelStyle=upper)](https://visitorbadge.io/status?path=aasisodiya.nodejs.screenshotwebsite)

```bash
npm install pageres
```

[Pageres](https://github.com/sindresorhus/pageres)

```js
const Pageres = require('pageres');

(async () => {
await new Pageres({delay: 2})
.src('https://github.com/sindresorhus/pageres', ['480x320', '1024x768', 'iphone 5s'], {crop: true})
.src('https://sindresorhus.com', ['1280x1024', '1920x1080'])
.src('data:text/html,<h1>Awesome!</h1>', ['1024x768'])
.dest(\_\_dirname)
.run();
    console.log('Finished generating screenshots!');
})();
```

> **Important Note**: Code is super slow for some reason

[![Visitors](https://api.visitorbadge.io/api/visitors?path=aasisodiya.nodejs&label=aasisodiya/nodejs&labelColor=%23ffa500&countColor=%23263759&labelStyle=upper)](https://visitorbadge.io/status?path=aasisodiya.nodejs)
