## puppeteer 入门

### puppeteer

### `puppeteer` 与 `puppeteer-core` 区别
1. `puppeteer` 会自动下载chromium， 而`puppeteer-core`不会
2. `puppeteer` 可以配置一些环境变量`PUPPETEER_*`以改变其行为的，而`puppeteer-core`没有环境变量

### 错误处理
```js
const {TimeoutError} = require('puppeteer/Errors');

// 当一直找不到.foo的元素时会报错
try {
    await page.waitForSelector('.foo');
} catch (e) {
    if (e instanceof TimeoutError) {
        // Do something if this is a timeout.
    }
}
```

### 能与扩展一同工作

### Class Puppeteer