const fs = require('fs');
const http = require('http');
b=fs.writeFileSync('index.html','<h1>Hello World</h1>');

const port = process.env.PORT || 3000;

const server  = http.createServer((req, res)=>{
    
    res.setHeader('Content-Type', 'text/html')
    if(req.url == '/')
    {
        res.statusCode = 200;
        const data = fs.readFileSync('index.html'); 
        res.end(data.toString());
    }  
})

server.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);

});