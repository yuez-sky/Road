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
`pupeteer`用来启动`Chromium`实例

- connect 
- createBrowerFetch 
- defaultArgs
- executablePat
- launch
    - ingoreHTTPSErrors: ignore https errors during navigation, default is false

    - headless: run chromiun in headless mode,default to true, unless `devtools` options is true

    - executablePath: path to a chromium or chrome executable to run instead of bundled chromium

    - slowMo: slow down puppeteer options by the specified
    amount of milliseconds

    - defaultViewport: sets a consistent viewport for each page, default is **800*600**
        - width
        - height
        - deviceScaleFactor
        - hasTouch
        - isLandscape
    - args
    - ignoreDefaultArgs
    - handleSIGNT
    - handleSIGTERM
    - handleSIGHUP
    - timeout: maximum time in milliseconds to wait for browser instance to start, default is **30000(30s)**. Pass **0** to disable timeout
    - dumpio
    - userDatadir
    - env
    - devtools
    - pipe

```js
// example
const puppeteer = require('puppeteer')
puppeteer.launch(async brower => {
    const page = await brower.newPage()
    await page.goto('https://www.example.com')
    // other actions
    await brower.close()
})
```

### Class BrowserFetcher
can download and mange different versions of Chromium

```js
// download a specific version of chromium
// run puppeteer to against it
const browserFetcher = puppeteer.createBrowserFetcher();
const revisionInfo = await browserFetcher.download('533271');
const browser = await puppeteer.launch({executablePath: revisionInfo.executablePath})
```

- canDownload
- download
- localRevisions
- platform
- remove
- revisionInfo
