module.exports = {
  send:(error, req,res, code = 400) =>{
    console.log(`error -> ${error}`);
        res.status(code).json({
          error
        });
  }
};