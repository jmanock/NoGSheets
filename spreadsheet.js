var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');
var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var doc = new GoogleSpreadsheet('1891LShhKaYJTynlKFPSupkEFpLYUll6_9M0Y0f1obI4');


var instream = fs.createReadStream('2017sep.txt');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);
var count = 0;
var mailz, lName, fName, mName, dob, gender, zip, age;
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
      if(fName === 'JR' || fName === 'II' || fName === 'III' || fName === 'SR' || fName === 'I' || fName == 'V'){
        fName = results[4];
      }
      if(results[i].includes('/')){
        dob = results[i-1];
        gender = results[i-3];
        zip = results[i-4];
      }
      if(zip > 5){
        zip = zip.substring(0,5);
      }
      var today = new Date();
      var birthDate = new Date(dob);
       age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if(m < 0 || (m === 0 && today.getDate() < birthDate.getDate()) ){
        age --;
      }

    }

    if(count > 298998 && count < 300000){
       //console.log(fName, lName, age, gender, zip);
        //console.log(fName, lName, gender, age, mailz, zip);
        console.log(fName+'\t'+lName+'\t'+gender+'\t'+age+'\t'+mailz);
      //addToSheets();
    }

  }
}).on('close', function(){

  console.log('We done here');
  //console.log(count);
  //something(mailz);
});
