const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/webrave', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}, (error) => {
  if(!error) return ;
  console.log('Falha conexão', error);
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
