import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFilePath = path.join(__dirname, 'db.json'); //  path to the json file where we are storing our hash data

const hash = [{"name": "qwe"}];


export const get = index => typeof hash[index] !== "undefined" ? hash[index] : null;

export const all = () => {
  return  hash;
}


const set = (index, data) => {
  if( typeof hash[index] === "undefined"){
    hash[index] = [];
  }
  hash[index].push(data);
}


export const pop = (data) => {
  hash.push(data)
}
// export const pop = (index, value) => {
//   if( typeof hash[index] === "undefined"){
//     return true;
//   }

//   const valueIndex = hash[index].indexOf(value);
//   if(valueIndex > -1){
//     hash[index].splice(valueIndex, 1);
//   } 

//   commitDB();
//   return true;
// }

export const remove = index => {
  if( typeof hash[index] !== "undefined"){
    delete hash[index];
  }

  commitDB();

  return true;
}

const readDB = () => {
  fs.readFile(dbFilePath, (err, data) => {
    if(err){
      console.log(err, 'error')
    }
    try{
      data = JSON.parse(data);
      for (key in data) {
        hash[key] = data[key]; // copies each property to the data object
      }
    }
    catch(e){
      throw e;  //  bad data?
    }

  });
}

const commitDB = () => {
  const data = JSON.stringify(hash);
  const options = {
    encoding: 'utf8'
  }; 

  fs.writeFile(dbFilePath, data, options, (err) => {
    console.log(err, 'err')
  });
}

readDB();
