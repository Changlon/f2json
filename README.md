# f2json

[![NPM version](https://img.shields.io/npm/v/f2json)](https://npmjs.org/package/f2json) [![Build Status](https://img.shields.io/circleci/build/github/Changlon/f2json/master)](https://app.circleci.com/pipelines/github/Changlon/f2json) [![Codecov](https://img.shields.io/codecov/c/github/Changlon/f2json)](https://app.codecov.io/github/Changlon/f2json) [![GitHub issues](https://img.shields.io/github/issues/Changlon/f2json)](https://github.com/Changlon/f2json/issues) [![GitHub license](https://img.shields.io/github/license/Changlon/f2json)](https://github.com/Changlon/f2json/blob/master/LICENSE)

> Quickly create read-write json files [f2json](https://github.com/Changlon/f2json) 

* Quick Import and write out the JSON data to the file
* Introduce a Json file operation in your code using a relative path
* You can use the created file as a temporary cache


 


## Installation

### npm 
```sh
npm install f2json 
```

### yarn 

```sh 
yarn add f2json 
```

## API Reference
  
* [f2json](#module_f2json)
    * [F2Json](#exp_module_f2json--F2Json) ⏏
        * [new F2Json([dirname])](#new_module_f2json--F2Json_new)
        * [.getLastCallDirname()](#module_f2json--F2Json+getLastCallDirname) ⇒ <code>String</code>
        * [.json2file(path, json)](#module_f2json--F2Json+json2file)
        * [.file2json(path, encoding)](#module_f2json--F2Json+file2json) ⇒ <code>Object.&lt;json, ok&gt;</code>
        * [.clear(path_)](#module_f2json--F2Json+clear)

<a name="exp_module_f2json--F2Json"></a>

### F2Json ⏏
**Kind**: Exported class  
<a name="new_module_f2json--F2Json_new"></a>

#### new F2Json([dirname])
Create f2Json


| Param | Type | Description |
| --- | --- | --- |
| [dirname] | <code>String</code> | Optional,You can also pass in a relative path such as ```__dirname``` in your code file |

**Example**  
Basic usage: ```javascriptindex.js :var F2Json = require("f2json")  var f2json = new F2Json()f2json.json2file("./cache/user.json",[     {name:"Changlon",age:22},       ...])var {json} =  f2json.file2json("./cache/user.json") console.log(json) ```
<a name="module_f2json--F2Json+getLastCallDirname"></a>

#### f2Json.getLastCallDirname() ⇒ <code>String</code>
Returns the file path that called this function

**Kind**: instance method of [<code>F2Json</code>](#exp_module_f2json--F2Json)  
<a name="module_f2json--F2Json+json2file"></a>

#### f2Json.json2file(path, json)
Writes the json object as data to the specified fileWrites the json object as data to the specified file

**Kind**: instance method of [<code>F2Json</code>](#exp_module_f2json--F2Json)  

| Param | Type |
| --- | --- |
| path | <code>String</code> | 
| json | <code>Object</code> | 

<a name="module_f2json--F2Json+file2json"></a>

#### f2Json.file2json(path, encoding) ⇒ <code>Object.&lt;json, ok&gt;</code>
Read the file as a Json object in Json format

**Kind**: instance method of [<code>F2Json</code>](#exp_module_f2json--F2Json)  
**Returns**: <code>Object.&lt;json, ok&gt;</code> - returns data json and function ok When you call the OK function, the modified data json is saved to the corresponding file  

| Param | Type |
| --- | --- |
| path | <code>String</code> | 
| encoding | <code>String</code> | 

<a name="module_f2json--F2Json+clear"></a>

#### f2Json.clear(path_)
Type an empty json object into the specified file

**Kind**: instance method of [<code>F2Json</code>](#exp_module_f2json--F2Json)  

| Param | Type |
| --- | --- |
| path_ | <code>String</code> | 

## Contributing

Please submit all issues and pull requests to the [Changlon/f2json](https://github.com/Changlon/f2json/issues) repository!

## Tests

Run tests using `npm test`.

## Support

If you have any problem or suggestion please open an issue [here](https://github.com/Changlon/f2json/issues).
