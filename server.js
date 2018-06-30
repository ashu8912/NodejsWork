const express=require('express');
const app=express();
const fs=require('fs');
const hbs=require('hbs');
app.set('view engine','hbs');

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
app.use((req,res,next)=>{
    res.render('maintainance.hbs')
})
app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
    var now=new Date().toString();
fs.appendFile('./logger.txt',now);
})
app.get('/',(req,res)=>{
    res.render('home.hbs');
})
app.get('/help',(req,res)=>{
res.render('help.hbs',{
    title:'Help Page'
});

})
app.get('/about',(req,res)=>{
    res.render('about.hbs');
})
app.listen(3000);
console.log('listening at port 3000');


/*                     Node.js creating server              */
// const http=require('http');
// var server=http.createServer((req,res)=>{
//     console.log(req.url)
//     if(req.url==='/')
//     {res.writeHead(200,{'Content-Type':'application/json'});
//     res.end(JSON.stringify({name:'ashu'}));
//     }
// });
// server.listen(3000)

// console.log('listening at port 3000');
