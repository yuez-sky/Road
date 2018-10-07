## egg-core 源码

### 入口文件`index.js`
入口文件主要导出了`EggCore`,`Eggloader`,`BaseContextClass`,`utils`
```js
// index.js
module.exports = {
  EggCore,
  EggLoader,
  BaseContextClass,
  utils,
};
```

#### EggCore
#### Eggloader
```js
module.exports = EggLoader
```

`EggLoader`主要是自身声明的class和在`EggLoader.proptotype`上附加的mixin, 附加的mixin主要是针对框架的各个部分实现各自的loader功能

##### EggLoader

```js
class EggLoader {
    construct() {}
    getServerEnv() {}
    getServerScope() {}
    getAppName() {}
    getHomedir() {}
    getAppInfo() {}
    getEggPaths() {}
    loadfile() {}
    requirefile() {}
    getLoadUnits() {}
    loadToApp() {}
    loadToContext() {}
    get FileLoader() {}
    get ContextLoader() {}
    getTypeFiles () {}
    resolveModule() {}
}

const loaders = [
  require('./mixin/plugin'),
  require('./mixin/config'),
  require('./mixin/extend'),
  require('./mixin/custom'),
  require('./mixin/service'),
  require('./mixin/middleware'),
  require('./mixin/controller'),
  require('./mixin/router'),
];

for (const loader of loaders) {
  Object.assign(EggLoader.prototype, loader);
}

```

`construct` 初始化了一些变量
```js
// options 由参数传入
this.options = options;
this.app = this.options.app
this.lifecycle = this.app.lifecycle
this.timing = this.app.timing || new Timing()
this.pkg = ... // package.json
this.eggPath = this.getEggPaths()
this.serverEnv = this.getServerEnv()
this.appInfo = this.getAppInfo()
this.serverScope = this.getServerScope()
```

`getEggPaths`函数
```js
const EggCore = require('../egg');
const eggPaths = [];

let proto = this.app;

// Loop for the prototype chain
while (proto) {
    proto = Object.getPrototypeOf(proto);
    // stop the loop if
    // - object extends Object
    // - object extends EggCore
    if (proto === Object.prototype || proto === EggCore.prototype) {
        break;
    }

    assert(proto.hasOwnProperty(Symbol.for('egg#eggPath')), 'Symbol.for(\'egg#eggPath\') is required on Application');
    const eggPath = proto[Symbol.for('egg#eggPath')];
    assert(eggPath && typeof eggPath === 'string', 'Symbol.for(\'egg#eggPath\') should be string');
    assert(fs.existsSync(eggPath), `${eggPath} not exists`);
    const realpath = fs.realpathSync(eggPath);
    if (!eggPaths.includes(realpath)) {
        eggPaths.unshift(realpath);
    }
}
return eggPaths
```

`getServerEnv`函数读取serverEnv变量，按一下顺序读取：
1. config/env
2. EGG_SERVER_ENV
3. 根据NODE_ENV匹配
```js
if (process.env.NODE_ENV === 'test') {
    serverEnv = 'unittest';
} else if (process.env.NODE_ENV === 'production') {
    serverEnv = 'prod';
} else {
    serverEnv = 'local';
}
```

`getServerScope`函数，获取`serverScope`

```js
return process.env.EGG_SERVER_SCOPE || ''
```

`getAppInfo`函数返回`Application`信息的对象
```js
return {
    name: this.getAppName(),
    baseDir: this.options.baseDir,
    env: this.serverEnv,
    scope: this.serverScope,
    HOME: this.getHomeDir(),
    pkg: this.pkg,
    root: env === 'local' || env === 'unittest' ? baseDir : home,
}
```

`getAppName`函数，从`package.json`文件中读取name
```js
// 主要是这句，如果没有name，或报错
return this.pkg.name
```

`getHomeDir` 获取home目录
```js
const homedir = require('node-homedir')
return process.env.EGG_HOME || homedir() || '/home/admin';
```

##### mixins下各个文件
1. plugin.js
```js
module.exports = {
    loadPlugin() {}
    readPluginConfigs() {}
    normalizePluginConfig() {}
    mergePluginConfig() {}
    getOrderPlugins() {}
    getPluginPath() {}
    _extendPlugins() {}
}
```
2. config.js
3. extend.js
4. custom.js
5. service.js
```js
module.exports = {
    loadService() {}
}
```
6. middleware.js
```js
module.exports = {
    loadMiddleware() {},
}
```
7. controller.js
```js
module.exports = {
    loadController() {},
}
```
8. router.js
```js
module.exports = {
    loadRouter() {}
}
```

#### BaseContextClass
通过传入Context上下文对象，拿到`ctx`, `app`, `config`, `service`

```js
class BaseContextClass {
    construct(ctx) {
        this.ctx = ctx
        this.app = ctx.app
        this.config = ctx.app.config
        this.service = ctx.service
    }
}

module.exports = BaseContextClass
```

#### utils
```js
module.exports = {
    loadfile(filepath) { ... }
    methods: [...]
    callFn(fn, args, ctx) { ... }
    getCalleeFromStack() { ... }
    getResolvedFilename() { ... }
}
```

1. loadfile
2. methods
3. callFn
4. getCalleeFromStack
5. getResolvedFilename