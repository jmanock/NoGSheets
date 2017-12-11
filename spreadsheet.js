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
var mailz, lName, fName, mName, dob, gender, zip;
var holder = [];
rl.on('line', function(line){
  var results = line.toUpperCase();
  if(results.includes('@')){
    results = results.split(/[\t]+/);

    for(var i = 0; i<results.length; i++){
      if(results[i].includes('@')){
        mailz = results[i];
        count = count + 1;
        fName = results[3];
        lName = results[2];
        mName = results[4];
      }
      if(fName === 'JR' || fName === 'II' || fName === 'III' || fName === 'SR'){
        fName = results[4];
      }
      if(results[i].includes('/')){
        dob = results[i-1];
        gender = results[i-3];
        zip = results[i-4];
      }
    }
    if(count < 2){
      //console.log(count, fName, lName, dob, gender, zip);
      //addToSheets();
    }
  }
}).on('close', function(){
  /*
    ~ Get first name and last name
    ~ Going to be harder to get names back with nothing to compair
    ~ Need to slow down adding them or save them to go in all at once
  */
  console.log('We done here');
  //console.log(count);
  //something(mailz);
});
