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

1. SchemaTypes
几种类型
- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array
- Decimal128
- Map

```js
var schema = new Schema({
    name: String,
    // or
    name: {
        type: String
    }
    // other options
    name: {
        type: String,
        get: val => (),
        set: val => (),
        alias: 'n',
        required: () => this.name.length > 2,
        // or
        required: [true, 'msg'],
        validate: () => this.name.length > 2,
        // 索引
        index: true,
        unique: true,
    }

    // 针对不同类型
    name: {
        type: String,
        lowercase: true
        uppercase: true,
        trim
        match
        enum
        minlength
        maxlength
    },
    age: {
        type: Number
        min
        max
    },
    birth: {
        type: Date,
        min
        max
    }
})

```

2. 静态方法
在Schema声明方法后，可以在Model中使用
```js
animalSchema.statics.findByName = function(name, cb) {
    return this.find({ name: new RegExp(name, 'i') }, cb);
};

var Animal = mongoose.model('Animal', animalSchema);
Animal.findByName('fido', function(err, animals) {
    console.log(animals);
});

```

3. 查询辅助函数
在Schema可以定义好一些常用的查询条件
```js
animalSchema.query.byName = function(name) {
    return this.where({ name: new RegExp(name, 'i') });
};

var Animal = mongoose.model('Animal', animalSchema);

Animal.find().byName('fido').exec(function(err, animals) {
    console.log(animals);
});
```

4. 虚拟属性
相当于计算属性，通过`virtual('xxx')`,定义在Schema上
```js
var personSchema = new Schema({
    name: {
        first: String,
        last: String
    }
});

var Person = mongoose.model('Person', personSchema);

// Document
var axl = new Person({
    name: { first: 'Axl', last: 'Rose' }
});

// 得到人物的全名
var name = axl.name.first + ' ' + axl.name.las

// virtual
personSchema.virtual('fullName').get(function () {
  return this.name.first + ' ' + this.name.last;
});

var name = axl.fullname


// virtaul set
personSchema.virtual('fullName').set(function (v) {
  this.name.first = v.substr(0, v.indexOf(' '));
  this.name.last = v.substr(v.indexOf(' ') + 1);
});
```

注意：`toJson()` & `toObject()`需要加上`{ virtual: true }`才能拿到虚拟属性

5. 别名
```js
var personSchema = new Schema({
  n: {
    type: String,
    // Now accessing `name` will get you the value of `n`, and setting `n` will set the value of `name`
    alias: 'name'
  }
});

```

6. Options
`new Schema({}, options)`

- autoIndex
- bufferCommands
- capped
- collection
- id
```js
// default behavior
var schema = new Schema({ name: String });
var Page = mongoose.model('Page', schema);
var p = new Page({ name: 'mongodb.org' });
console.log(p.id); // '50341373e894ad16347efe01'

// disabled id
var schema = new Schema({ name: String }, { id: false });
var Page = mongoose.model('Page', schema);
var p = new Page({ name: 'mongodb.org' });
console.log(p.id); // undefined
```
- _id
同`id`
- minimize
```js
// true 移除empty object
var schema = new Schema({ name: String, inventory: {} });
var Character = mongoose.model('Character', schema);

var sam = new Character({ name: 'Sam', inventory: {}});
Character.findOne({ name: 'Sam' }, function(err, character) {
  console.log(character); // { name: 'Sam' }
});


// false
var schema = new Schema({ name: String, inventory: {} }, { minimize: false });
var Character = mongoose.model('Character', schema);

var sam = new Character({ name: 'Sam', inventory: {}});
Character.findOne({ name: 'Sam' }, function(err, character) {
  console.log(character); // { name: 'Sam' , inventory: {}}
});

```
- read
- writeConcern
- safe
- sharedKey
- strict
是否会存储不在Schema中的字段，默认是不存储; `{ strict: false }`则会存储

- strictQuery
- toJson
```js
var schema = new Schema({ name: String });
schema.path('name').get(function (v) {
  return v + ' is my name';
});
schema.set('toJSON', { getters: true, virtuals: false });
```
- toObject
- typeKey
- validateBeforeSave
在存入db前验证, 默认true, 可手动设置false
- versionKey
- collation
- skipVersion
- timestamps
`{ timestamps: true }` 会自动创建`createdAt`, `updatedAt`
- selectPopulatedPaths


##### Model
Model 通过Schema创建而来
```js
var Blog = mongoose.model('Blog', blogSchema);
```

##### Document
```js
```

