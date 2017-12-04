var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');
var doc = new GoogleSpreadsheet('1891LShhKaYJTynlKFPSupkEFpLYUll6_9M0Y0f1obI4');

doc.useServiceAccountAuth(creds, function(err){
  doc.getRows(1,function(err, rows){
    // console.log(rows.length);
  });
  doc.addRow(1,{last_name:'Manock', first_name:'Jon', email:'jonmanock@gmail.com'}, function(err){
    if(err){
      console.log(err);
    }else{
      console.log('This shit got added');
    }
  });
});
