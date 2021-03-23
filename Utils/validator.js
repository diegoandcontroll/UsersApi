module.exports = {
  userValidator: (app,req,res) =>{
    req.assert('name', 'O campo "{name}" é obrigatório').notEmpty();
    req.assert('email', 'O campo "{email}" é obrigatório ou invalido')
    .notEmpty().isEmail();

    let errors = req.validationErros();

    if(errors){
      app.utils.error.send(errors, req,res);
      return false;
    }else{
      return true;
    }
  }
}