module.exports = {

  oaLogin: (req, res, next) => {
    console.log('Running oaLogin middleware');
    return next();
  }

}