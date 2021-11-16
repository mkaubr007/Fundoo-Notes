const mongoose = require('mongoose');
class DBconnection{
     connection=()=>{
       const url= 'mongodb://localhost:27017/fundoo-notes'
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