/**
 *  @author  Changlon <changlong.a2@gmail.com>
 *  @github  https://github.com/Changlon
 *  @date    2022-01-29 22:55:57
 */

declare class  F2Json {
    dirname:string  
    constructor(dirname?:string) 
    public getLastCallDirname():string  
    public json2file(path_:string,json:{[k:string]:any}):void 
    public file2json (path_:string,encoding:string):{
        json:{[k:string]:any},
        ok:()=>void
    }
    public clear(path_:string):void 
}



declare namespace F2Json { 
    interface F2JsonError  extends  Error {}
    type a = {a:string}
}

export  = F2Json
