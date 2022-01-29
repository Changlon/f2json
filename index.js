
/**
 *  Quickly create read-write json files
 * 
 *  @author  Changlon <thinker_changlon@163.com>
 *  @github  https://github.com/Changlon
 */



var fs = require('fs')  
var path = require('path')   
var callsite = require('callsite')
const { sep } = require('path')

class F2JsonError extends Error{
    constructor(message) {  
        super(message)
    }
}





/**
 * @module f2json 
 */


module.exports = F2Json 
module.exports.F2JsonError = F2JsonError
/**
 * Create f2Json 
 * 
 * @param {String} dirname 
 */
function F2Json(dirname) { 
    if(!(this instanceof F2Json)) return new F2Json(dirname)   
    this.dirname = dirname || this.getLastCallDirname() 
}

/**
 * Returns the file path that called this function
 * 
 * @returns {String}
 */
F2Json.prototype.getLastCallDirname = function () {   
     const fileNames = callsite() 
     for(let i =0;i<fileNames.length;++i) { 
         const filename = fileNames[i].getFileName()
         if(
             filename.startsWith("internal") || 
             filename.startsWith("node") 
         ) {
             const  dirnames  =  (fileNames[i-1].getFileName()).split(sep)  
              return dirnames.pop() && dirnames.join(sep)
         }
     }
}



/**
 * Writes the json object as data to the specified fileWrites the json object as data to the specified file
 * @param {String} path 
 * @param {Object} json 
 */
 F2Json.prototype.json2file = function(path_,json) {   
    if(
       path_ === "" || 
       path_ === undefined || 
       path_ ===null
    ) {
        throw new F2JsonError("function json2file require param path [string] !") 
    }

    if(typeof path_ !== "string" )  throw new F2JsonError("invalid param of path_ ,require type string !")

    try {

        json = JSON.stringify( json || {} )
        if( "." === path_[0]){ 
            path_ = path.join(this.dirname,path_) 
        }

        fs.writeFileSync(path_,json) 

    }catch(e) {
        throw new F2JsonError(e.message)
    }
}


/**
 * Read the file as a Json object in Json format
 * 
 * @param {String} path 
 * @param {String} encoding 
 * @returns {Object.<json,ok>} returns data json and function ok 
 * When you call the OK function, the modified data json is saved to the corresponding file 
 */
F2Json.prototype.file2json = function(path_,encoding) { 
    if(
        path_ === "" || 
        path_ === undefined || 
        path_ ===null
     ) {
         throw new F2JsonError("function json2file require param path [string] !") 
     }
 
     if(typeof path_ !== "string" )  throw new F2JsonError("invalid param of path_ ,require type string !")

    try { 

        if("." === path_[0]){
            path_ = path.join(this.dirname,path_) 
        }

        let content = fs.readFileSync(path_,{
            encoding: encoding || "utf-8"
        })  
       
        let json = JSON.parse(content) 
        
        return {
            json ,
            ok:() => {  
              this.json2file(path_,json) 
            }
        }

    }catch(e) {
        throw new F2JsonError(e.message)
    }
    
}


/**
 * Type an empty json object into the specified file
 * @param {String} path_ 
 */
F2Json.prototype.clear = function(path_) { 

    if(
        path_ === "" || 
        path_ === undefined || 
        path_ ===null
     ) {
         throw new F2JsonError("function json2file require param path [string] !") 
     }
 
     if(typeof path_ !== "string" )  throw new F2JsonError("invalid param of path_ ,require type string !")
 
     try {
 
         json = JSON.stringify(  {} )
         if( "." === path_[0]){ 
             path_ = path.join(this.dirname,path_) 
         }
 
         fs.writeFileSync(path_,json) 
 
     }catch(e) {
         throw new F2JsonError(e.message)
     }
}

