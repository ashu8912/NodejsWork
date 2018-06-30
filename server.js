const express=require('express');
const app=express();
const fs=require('fs');
const hbs=require('hbs');

/* telling express what view engine we are going to use in ou case HandleBars or hbs for short*/
app.set('view engine','hbs');

/*before using partials we have to tell to handlebar where it has to look for these partials so we register our 
partials to hbs giving it the location of our partial folder*/
hbs.registerPartials(__dirname+'/views/partials');
/*In most cases we might want to share same peice of data between two different templates so to prevent repeatition 
we use Helper*/
/*To use Helpers in your template simply say {{nameOfHelper arg1 arg2}} */
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
/*use is a built in middleware of express if next() is not called from the method that is passed as argument to use
than no further matching of url takes place this might be helpful when we want to show some maintainance
message to user and no further routes work */
app.use((req,res,next)=>{
    res.render('maintainance.hbs')
})
/*to make the server know about our static files like js and css we use middleware again and this time telling
express where to look for the static files*/
app.use(express.static(__dirname+'/public'));

/*doin something each time a request is made */
app.use((req,res,next)=>{
    var now=new Date().toString();
fs.appendFile('./logger.txt',now);
})
/*routing*/
app.get('/',(req,res)=>{
    /* absolute path for hbs files as they are by default searched in views folder*/
    res.render('home.hbs');
})
app.get('/help',(req,res)=>{
    /*the second argument of render is to pass dynamic data to template files*/
res.render('help.hbs',{
    title:'Help Page'
});

})
app.get('/about',(req,res)=>{
    res.render('about.hbs');
})

app.listen(3000);
console.log('listening at port 3000');


/*                     Node.js creating server (reason why we use epress)              */
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
