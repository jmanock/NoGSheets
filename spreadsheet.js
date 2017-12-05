var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');
var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var doc = new GoogleSpreadsheet('1891LShhKaYJTynlKFPSupkEFpLYUll6_9M0Y0f1obI4');

doc.useServiceAccountAuth(creds, function(err){
  doc.getRows(1,function(err, rows){
    // console.log(rows.length);
  });
  // doc.addRow(1,{last_name:'Manock', first_name:'Jon', email:'jonmanock@gmail.com'}, function(err){
  //   if(err){
  //     console.log(err);
  //   }else{
  //     console.log('This shit got added');
  //   }
  // });
});
var instream = fs.createReadStream('2017sep.txt');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);
var count = 0;
var mailz;
rl.on('line', function(line){
  var results = line.toUpperCase();
  if(results.includes('@')){
    results = results.split(/[\t]+/);
    for(var i = 0; i<results.length; i++){
      if(results[i].includes('@')){
        mailz = results[i];
        count = count + 1;
      }
    }
    if(count === 1){
      console.log(mailz);
    }
  }
}).on('close', function(){
  /*
    ~ Get first name and last name
    ~ Should use a while loop for the count
  */
  console.log('We done here');
  //console.log(count);
  //something(mailz);
});
function something(x){
  doc.useServiceAccountAuth(creds, function(err){
    doc.addRow(1, {
      last_name:'',
      first_name:'',
      email:x
    }, function(err){
      if(err){
        console.log('There is a problem',err);
      }else{
        console.log('YO this shit got added');
      }
    });
  });
}
