### Mongo
NoSql, 非关系型数据库

#### 安装
```sh
// mac
brew install mongo
```

#### 启动
```sh
mkdir data/db

// 指定dbpath
mongod --dbpath data/db
```

#### 连接
```sh
mongo
```

#### 操作
```sh
# create database
use database
# drop database
use database
db.dropDatabase()

# create collection
db.createCollection('collectionname')
# drop collection
db.collection.drop()
# 其实不需要手动创建，当插入数据时会自动创建


# insert, update, remove document
db.collectionname.insert(document)
db.collection.update(query, update, options)
db.collection.save(document)
db.collection.remove(document)

# find
# $gt(>), $gte(>=), $lt(<), $lte(<=)
db.collection.find(where)
# $type 条件操作符, 用来匹配类型
db.collection.find("name": {$type: 'string'})
db.collection.find("name": {$type: 2})
# skip(offset), limit
# sort 1: asc, -1: desc
db.collection.find("name": {$type: 2}).limit(1).skip(2).sort({key: 1})
# index
db.collection.createIndex(keys, options)
db.col.createIndex({"title":1,"description":-1})
```

#### 概念
1. database
2. collection
3. document
对应到关系型数据库中
1. database
2. table
3. column

```sh
# 显示所有数据的列表 
show dbs
# 连接到一个指定的数据库
use dbname
# 查看当前连接的db
db
```


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
自动索引
- bufferCommands
- capped
某次操作的数量上限
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

Model 通过Schema创建而来, 负责创建读取documents

```js
var schema = new mongoose.Schema({
    name: String,
    age: Number,
    sex: {
        type: Number,
        enum: [1, 2],
    }
})
var Person = mongoose.model('Person', schema)

// create
Person.create({
    name: 'zs',
    age: 1,
    sex: 2,
}, function(err, data) {})
// query
Person.find({sex: 2}).exec(callback)
// delete
Person.deleteOne({ name: 'zs' }, function (err) {})
// update
Person.updateOne({name: 'zs'}, { age: 12 }, function(err, res) {})
```

##### Document

Model的实例
```js
// 拿到一个document
var jack = new Persion({ name: 'Jack', age: 12, sex: 1})


```
##### Query

查询

- Model.deleteMany()
- Model.deleteOne()
- Model.find()
- Model.findById()
- Model.findByIdAndDelete()
- Model.findByIdAndRemove()
- Model.findByIdAndUpdate()
- Model.findOne()
- Model.findOneAndDelete()
- Model.findOneAndRemove()
- Model.findOneAndUpdate()
- Model.replaceOne()
- Model.updateMany()
- Model.updateOne()

query不是返回promise, 但是有一个`then`的函数


##### Validation

##### Populate
```js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// person中有story的关联
// story中有person的关联
var personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

var Story = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);
```
保存

```js
var author = new Person({
  _id: new mongoose.Types.ObjectId(),
  name: 'Ian Fleming',
  age: 50
});

author.save(function (err) {
  if (err) return handleError(err);

  var story1 = new Story({
    title: 'Casino Royale',
    author: author._id    // assign the _id from the person
  });

  story1.save(function (err) {
    if (err) return handleError(err);
    // thats it!
  });
});
```

populate
```js
Story.
  findOne({ title: 'Casino Royale' }).
  populate('author').
  exec(function (err, story) {
    if (err) return handleError(err);
    console.log('The author is %s', story.author.name);
    // prints "The author is Ian Fleming"
  });

// 可以只选择部分的字段返回
Story.
  find(...).
  populate('author', 'name').
  exec();

// 可以同时populate多个
Story.
  find(...).
  populate('fans').
  populate('author').
  exec();

// 如果对一个字段populate多次，最后一次生效
Story.
  find(...).
  populate('author', 'name').
  populate('author', 'age').
  exec();

// populate options
Story.
  find(...).
  populate({
    path: 'fans',
    match: { age: { $gte: 21 }},
    // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
    select: 'name -_id',
    options: { limit: 5 }
  }).
  exec();


// virtual
var PersonSchema = new Schema({
  name: String,
  band: String
});

var BandSchema = new Schema({
  name: String
});
BandSchema.virtual('members', {
  ref: 'Person', // The model to use
  localField: 'name', // Find people where `localField`
  foreignField: 'band', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false,
  options: { sort: { name: -1 }, limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
});

var Person = mongoose.model('Person', PersonSchema);
var Band = mongoose.model('Band', BandSchema);

Band.find({}).populate('members').exec(function(error, bands) {
});
```

##### Aggregate


##### Middleware
中间件，钩子`pre`, `post`，用于schema， 通常会在插件中使用, 主要有4种：
1. document
    - validate
    - save
    - remove
    - init
2. model
    - insertMany
3. aggregate
    - aggregate
4. query
    - count
    - find
    - findOne
    - findOneAndRemove
    - findOneAndUpdate
    - remove
    - update
    - updateOne
    - updateMany

出现相同的名词, 如`document`的`remove` 和 `query` 的`remove` 
```js
// default is for docuemnt remove
schema.pre('remove', function() {})
// query remove
shema.pre('remove', {query: true, document: false}, function() {})

// create will fires save hooks

```

```js
const schema = new Schema({ .... })
schema.pre('save', function (next) {
    // do something
    next()

    // code after next() will also exec
})

//  can also use with async/await
schema.pre('save', async function() {
    await doSomething()
    await doSomething()
})

```


##### Plugins
插件主要是能够对定义好的Schema进行一些额外的处理, 比如说如果我们需要对所有的schema进行一些处理，我们可以将这个处理方式写称插件，在shema后声明后，对schema应用插件,如果后续有变动，只需要对plugin进行处理即可
```js
// defination last
module.exports = function lastModPlugin(shema, options) {
    shema.add({ 'lastMod': Date })

    schema.pre('save', function (next) {
        this.lastMod = new Date()
        next()
    })

    if (options) {
        schema.path('lastMod').index(options)
    }
}

// how to use
const lastModPlugin = require('./lastModPlugin')
const schema_1 = new Schema({...})
schema_1.plugin(lastModPlugin, { index: true })
const schema_2 = new Schema({...})
schema_2.plugin(lastModPlugin)

// use in global
const lastModPlugin = require('./lastModPlugin')
var mongoose = require('mongoose')
mongoose.plugin(lastModPlugin)
```



