const neDB = require('nedb');

const db = new neDB({
  filename: 'users.db',
  autoload: true
});
module.exports = app =>{
  let route = app.route('/users');
  route.get((req,res) =>{

    db.find({}).sort({name: 1}).exec((error, users) =>{
      if(error){
        app.utils.error.send(err, req,res);
      }else{
        res.statusCode = 200;
  
        res.setHeader('Content-Type', 'application/json');
  
        res.json({
          users
        });
      }
    });
  });

  route.post((req, res) =>{
    if(!app.utils.validator.userValidator(app,req,res)) return false;
    db.insert(req.body, (error, user)=>{
      if(error){
        app.utils.error.send(error, req,res);
      }else{
        res.status(200).json(user);
      }
    });
  });

  let routeId = app.route('/users/:id');

  routeId.get((req,res) =>{
    db.findOne({_id: req.params.id}).exec((error, user) =>{
      if(error){
        app.utils.error.send(err, req,res);
      }else{
        res.status(200).json(user);
      }
    });
  });

  routeId.put((req,res) =>{
    if(!app.utils.validator.userValidator(app,req,res)) return false;
    db.update({_id: req.params.id}, req.body, error => {
      if(error){
        app.utils.error.send(err, req,res);
      }else{
        res.status(200).json(Object.assign(req.params, req.body));
      }
    });
  });

 routeId.delete((req, res) =>{
  db.remove({_id: req.params.id}, {}, error =>{
    if(error){
      app.utils.error.send(err, req,res);
    }else{
      res.status(200).json(req.params);
    }
  });
 });
};