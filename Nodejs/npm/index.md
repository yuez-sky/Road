## 如何写一开发一个npm包
- 注册npm账号
- 初始化
- 实现功能
- 发布

### 注册npm账号
[npm官网](https://www.npmjs.com/)

### 初始化
```js
mkdir example
cd example
npm init -y
```

### 实现简单的功能
#### 

#### bin
在package.json中指定bin文件，能够生成直接运行的命令

#### options

### 发布
```js
// 第一次发布
npm publish

// 后续发布
npm version patch/minor/major
// 1.0.0 -> 1.0.1/1.1.0/2.0.0
npm publish
```
### 一个简单的翻译工具
- [utol](https://www.npmjs.com/package/utol)