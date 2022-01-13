function getNameFromCommandLine() {
    // Write you code here, name should be taken as args in process.argv
    return String(process.argv[2]);
}

function getNameFromEnv() {
    // Write your code here
    return process.env.name;
}

function getNameFromReadLine() {
    // Write your code here
    const read_line=require("readline");
    const r=read_line.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    var input_var=null
    r.question("Input",(answer)=>{
        input_var=answer;
    })
}

module.exports = {
    getNameFromCommandLine,
    getNameFromEnv,
    getNameFromReadLine
}