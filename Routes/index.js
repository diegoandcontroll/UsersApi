module.exports = app =>{
  
app.get('/', (req,res) =>{
  res.statusCode = 200;

  res.setHeader('Content-Type', 'text/html');

  res.end('<h1 style="color: red; text-shadow: 3px 3px black;">Hellow World</h1>');
});
};