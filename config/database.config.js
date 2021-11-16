const mongoose = require('mongoose');
require('dotenv').config();
class DBconnection{
     connection=()=>{
       const url= process.env.URL;

        mongoose.connect(url, {
        }).then(() => {
            console.log("Successfully connected to the database");    
        }).catch(err => {
            console.log('Could not connect to the database. Exiting now...', err);
            process.exit();
        });  
    }
}   
module.exports=new DBconnection();         