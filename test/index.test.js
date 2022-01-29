const fs = require("fs")
const path = require("path")
const { expect } = require("chai")
const F2Json = require('..')
const {F2JsonError} = F2Json

describe("f2json",()=>{

    const f2json = F2Json()  

    describe("Instantiate  F2Json",()=>{
        it("The attribute dirname of instance should be  same of  __dirname",()=>{
            expect(f2json.dirname).to.equal(__dirname)
        })
    })

    describe("json2file",()=>{

        it("should throw F2JsonError ",()=>{
            const paths = [undefined,null, ""] 
            paths.forEach(path=>{
                expect(()=>{
                    f2json.json2file(path,{})
                }).to.throw(F2JsonError) 
            })
        })

        it("should create file if filename of path not exits",done=>{  
            f2json.json2file("./test.json")
            expect(fs.existsSync(path.join(__dirname,"./test.json"))).to.be.true
            fs.rm(path.join(__dirname,"./test.json"),()=>{done()})
        })

        it("should create file in project root",done=>{
            f2json.json2file("../test.json") 
            expect(fs.existsSync(path.join(process.cwd(),"./test.json"))).to.be.true 
            fs.rm(path.join(process.cwd(),"./test.json"),()=>{done()})
        }) 

        it("should create file with absoulte path",done=>{ 
            f2json.json2file(path.join(__dirname,"./test.json"))  
            expect(fs.existsSync(path.join(__dirname,"./test.json"))).to.be.true  
            fs.rm(path.join(__dirname,"./test.json"),()=>{done()})
        })

        // it("should handle prefix of param path",done =>{
        //     expect(()=>{
        //         f2json.json2file("@/test.json") 
        //     }).not.be.throw(Error) 
        //     expect(fs.existsSync(path.join(process.cwd(),"./test.json"))).to.be.true 
        //     fs.rm(path.join(process.cwd(),"./test.json"),()=>{done()})
        // })
    })

    describe("file2json",()=>{
        
        it("should throw F2JsonError ",()=>{
            const paths = [undefined,null, "","NotExits"] 
            paths.forEach(path=>{
                expect(()=>{
                    f2json.file2json(path)
                }).to.throw(F2JsonError) 
            })
        })

        it("should return {json,ok}",()=>{
             const data = f2json.file2json("../package.json") 
             expect(data.json).to.be.instanceOf(Object) 
             expect(typeof data.ok).to.be.equal("function") 
        })

        it("file should change when call function ok in return object",done=>{
            f2json.json2file("../test.json") 
            const data = f2json.file2json("../test.json")
            data.json["name"] = "changlon" 
            data.ok() 
            const data2 =  f2json.file2json("../test.json") 
            expect(data2.json.name).to.be.equal("changlon")
            fs.rm(path.join(process.cwd(),"./test.json"),()=>{done()})
        }) 

    })


    describe("clear",()=>{
        it("should reset the file content as empty json Object",done=>{
            f2json.json2file("../test.json",{
                a:"test"
            })
            f2json.clear("../test.json") 
            const data = f2json.file2json("../test.json") 
            expect(data.json.a).to.be.undefined 
            fs.rm(path.join(process.cwd(),"./test.json"),()=>{done()})
        })
    })
   
})





