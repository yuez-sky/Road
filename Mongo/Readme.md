### Mongo
NoSql, 非关系型数据库

### Mongoose

#### 一 安装
```js
npm install mongoose
```

#### 二 连接
```js
//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var Host = 'mongodb://127.0.0.1/my_database';
mongoose.connect(Host);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function() {})
```

#### 三 使用 
主要有以下几个名词：
1. Schema: 一种以文件形式存储的**数据库模型**骨架，**不能操作数据库**
2. Model: 通过Schema发布生成的模型，**能够数据库操作**
3. Document: Model创建的实体，**能够操作数据库**

```js
// Schema
var userSchema = new mongoose.Schema({
    name: String,
})

// Model
var User = mongoose.model('User', userSchema)

// Document
var Jack = new User({ name: 'Jack' });

```

##### Schema
Schema 定义
```js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs:  Number
    }
});
```

SchemaTypes
- 

##### Model
```js
```

##### Document
```js
```

