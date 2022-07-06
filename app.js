const mysql = require('mysql2');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

// connection configurations
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'Shiva',
    password: 'root',
    database: 'pronotate'
});
// connect to database
// dbConn.connect(); 

app.listen(3000, () => console.log('Express server is running at port no : 3000'));

dbConn.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});
//Retrive all data
app.get('/api/getList',(req, res)=>{
    dbConn.query(`select * from employee_table`,(result)=>{
      res.send(result)
    })
  });

//save data

app.post('/api/create',(req,res)=>{

    console.log(req.body);
    
  

    let sql = ` INSERT INTO employee_table(name,age,department)
                VALUES('${req.body.name}','${req.body.age}','${req.body.department}')
               `;
   
    dbConn.query(sql,(err,result)=>{
            if(err) throw err;
            res.send('data inserted');
            
    });        


});

app.delete('/api/delete/:emp_id',(req,res)=>{

     
    let sql = `DELETE FROM employee_table 
                WHERE emp_id = '${req.params.emp_id}'
                `;
    
    dbConn.query(sql,(err)=>{
        if(err) throw err;
        res.send('data deleted');
    });         
});



app.put('/api/update/:emp_id',(req,res)=>{
    console.log(req.params.emp_id);
     
    let sql = `UPDATE employee_table SET 
                name = '${req.body.name}',
                age = '${req.body.age}',
                department = '${req.body.department}'
                WHERE emp_id = '${req.params.emp_id}'
                `;
    
    dbConn.query(sql,(err)=>{
            if(err) throw err;
            res.send('data updated');
    })  ;          
});