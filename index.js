
/**
 *  Quickly create read-write json files
 * 
 *  @author  Changlon <thinker_changlon@163.com>
 *  @github  https://github.com/Changlon
 */


var FS = require('fs')  
var PATH = require('path')  

class F2Json extends Error{
    constructor(message) {  
        super(message)
    }
}

/**
 * @module f2json 
 */


module.exports = { 
    json2file,
    file2json
}


/**
 * Writes the json object as data to the specified fileWrites the json object as data to the specified file
 * @param {*} path 
 * @param {*} json 
 */
 function json2file(path,json) {  
    if(
       path === "" || 
       path === undefined || 
       path ===null
    ) {
        throw new F2Json("function json2file require param path [string] !") 
    }

    if(typeof path !== "string" )  throw new F2Json("invalid param of path ,require type string !")

    try {
        json = JSON.stringify( json || {} )
        
        if(path.startsWith(".")){
            path = PATH.join(__dirname,path) 
        }

        FS.writeFileSync(path,json)

    }catch(e) {
        throw new F2Json(e.message)
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
function file2json(path,encoding) { 
    if(
        path === "" || 
        path === undefined || 
        path ===null
     ) {
         throw new F2Json("function json2file require param path [string] !") 
     }
 
     if(typeof path !== "string" )  throw new F2Json("invalid param of path ,require type string !")

    try { 

        if(path.startsWith(".")){
            path = PATH.join(__dirname,path) 
        }else if(path.startsWith("@/")) {
            path = path.replace("@/","")  
            path = PATH.join( 
                
                FS.existsSync(PATH.join(__dirname,"./src")) ?  
                      PATH.join(__dirname,"./src")
                : __dirname
                ,path) 
            console.log(path)
        }
        
        let content = FS.readFileSync(path,{
            encoding: encoding || "utf-8"
        })  
        
        let json = JSON.parse(content) 
        
        return {
            json ,
            ok:() => {  
              json2file(path,json) 
            }
        }

    }catch(e) {
        throw new F2Json(e.message)
    }
    
}


