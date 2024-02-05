const http = require("http");
const fs  = require('fs');
const multer = require('multer');
const PORT = 5500;


const server = http.createServer((req, res)=>{
  if (req.url==='/'){
      fs.readFile('Home.html',(error , data)=>{
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(data);
          res.end();
      })

  }else if(req.url==='/about'){
      fs.readFile('About.html',(error , data)=>{
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(data);
          res.end();
      })
  }else if(req.url==='/contact'){
      fs.readFile('Contact.html',(error , data)=>{
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(data);
          res.end();
      })
  }else if(req.url==='/file-write'){
      fs.writeFile('demo.txt', 'hello world' , (error , data)=>{
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write("File Create Successfully");
          res.end();
      })
  }else if (req.url === '/file-upload') {
    fs.readFile('Upload.html',(error , data)=>{
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        const storage = multer.diskStorage({
            destination:(req,file,callback)=>{
                callback(null ,'./uploads');
            },
            filename:(req,file,callback)=>{
                callback(null ,file.originalname)
            }
        })
        const upload = multer({storage:storage});
        upload.single('file')(req, res, (err) => {
          if (err) {
            return res.end('Error uploading file');
          }
        });

        res.end()
        
    })
  }
})


server.listen(PORT,()=>{
    console.log(`Server Is Running ${PORT}`)
})

