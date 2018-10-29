## 如何写一开发一个npm包
- 注册npm账号
- 初始化
- 实现功能
- 发布

### 注册npm账号
[npm官网](https://www.npmjs.com/)

### 初始化
通过`npm`初始化一个项目目录
```js
mkdir example
cd example
npm init -y
```

### 实现简单的功能
目录下新建文件index.js

#### 实现一个翻译的功能
```js
function translate() {
    // 功能代码
}

module.exports = translate
```

#### bin
很多npm包中，我们都可以看到这种带有提示的命令。
![help](../images/utol-h.jpg)
这种事通过命令行实现的。在package.json中指定bin文件，能够生成直接运行的命令。
```js
{
    "name": "utol",
    "bin": {
        "utol": "./bin/utol.js"
    }
}
```

#### options
那如何实现其中的提示?
可以通过`commander`的包来实现
```js
const commander = require('commander')
const commander = require('commander')
const pkg = require('../package.json')
const translate = require('./lib/translate')

commander.version(pkg.version)
commander
    .option('-t, --translate [string]', '查询的词')
    .action(translate)

module.exports = function() {
    commander.parse(process.argv)
}
```

![help](../images/utol-t.jpg)
可以`version`实现版本提示，通过`options`来实现其他的提示，如`-t`

### 发布
```js
// 第一次发布
npm publish

// 后续发布，通过不同的参数来实现版本号的升级
npm version patch/minor/major
// 1.0.0 -> 1.0.1/1.1.0/2.0.0
npm publish
```
### 一个简单的翻译工具
- [utol](https://www.npmjs.com/package/utol)