const csv = require('csv-parser')
const fs = require('fs')

var outputdir = './output/'
var dateFormat = require('dateformat');
const results = [];

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


fs.createReadStream('data.csv')
  .pipe(csv())//csv({ separator: '\t' });
  .on('data', (data) => results.push(data))
  .on('end', () => {
    for(var i=0; i<results.length; i++){
      var myrow = results[i]
      var mytag1 = {
        title:myrow.title1,
        type:myrow.type1,
        color:myrow.color1,
        textcolor:myrow.textcolor1
      }
      var mytag2 = {
        title:myrow.title2,
        type:myrow.type2,
        color:myrow.color2,
        textcolor:myrow.textcolor2
      }
      var mytag3 = {
        title:myrow.title3,
        type:myrow.type3,
        color:myrow.color3,
        textcolor:myrow.textcolor3
      }
      var df = dateFormat(new Date(),"isoUtcDateTime")
      var myitm = {tags:[mytag1,mytag2,mytag3],"appName":"TagSpaces","appVersion":"3.9.8","lastUpdated":df}
      console.log(myrow.name)
      console.log(myitm)
      if (!fs.existsSync(outputdir)){
        fs.mkdirSync(outputdir, { recursive: true });
    }
      fs.writeFileSync(outputdir+myrow.name+'.json', JSON.stringify(myitm, null, 4))
    }
  });