/* 
Expense tracker:

Basic working :
Adding new expenses/income : /add-expense ->post
Displaying existing expenses :/get-expense ->get
editing existing entries : /edit-expense ->patch/put
Deleting existing expenses : /delete-expense ->delete

//

Budget reporting
creating new user
validating user

defining schema 
category , amount , date - fields in expense tracker

*/
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {Expense} = require('./schema.js')

app.use(bodyParser.json())
async function connectToDb(){
   try{
    await mongoose.connect('mongodb+srv://kishorkumark2022cse:kishoratlas@kishor.r3jygex.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=kishor')
   console.log("DB connection established.")
const port = 7000
app.listen(port,function(){
   console.log(`Listening... ${port}`)
})} 
catch(error){
   console.log("DB not connected")
}
}
connectToDb()

app.post('/add-expense',async function(request,response){
  try{ 
    await Expense.create({
    "amount":request.body.amount,
    "category":request.body.category,
    "date":request.body.date
   })
    response.status(201).json({
        "status":"success",
        "message":"new entry created"
    })
}
catch(error){
    response.status(200).json({
        "status":"failed",
        "message":"not created"
    })
}
})

app.get('/get-expenses',async function(request,response){
    try{
        const expenseData=await Expense.find()
        express.response.status.apply(200).json(expenseData)
    }catch(error){
        response.status(500).json({
            "status":"failure",
            "message":"could not fetch entries",
            "error":error
      })
}
})




