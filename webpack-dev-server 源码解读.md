## webpack-dev-server 源码解读

### 目录分析

```js
root
	- bin
	- client-src
	- examples
	- lib
	- ssl
	- test

```



### 查找入口文件

`package.json`文件中，看到`webpack-dev-server`命令运行的是`/bin/webpack-dev-server.js`



#### /bin/webpack-dev-server.js

```js
/**
 * 当接受到终止信号时，退出进程，如果server存在，关闭server
 */
const signals = [ 'SIGINT', 'SIGTERM' ]; // 程序终止信号

signals.forEach((signal) => {
  process.on(signal, () => {
    if (server) {
      server.close(() => {
        // eslint-disable-next-line no-process-exit
        process.exit();
      });
    } else {
      // eslint-disable-next-line no-process-exit
      process.exit();
    }
  });
});
```



```js
// Prefer the local installation of webpack-dev-server
if (importLocal(__filename)) {
  debug('Using local install of webpack-dev-server');

  return;
}


// import-local包的作用 https://github.com/sindresorhus/import-local
// Let a globally installed package use a locally installed version of itself if available

```

