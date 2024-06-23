const express = require('express');
//npm i router
const router = express.Router();



        
//import schema
const person = require('./../models/person');

//method-3 -POST-take data from user and save data in database
router.post('/', async (req, res)=>{
    try{
      const data = req.body;    //get data from user and store in data
      const newPerson = new person(data);   //make a newPerson data and store in person database
      const savedPerson = await newPerson.save();
      console.log("data saved successfully");
      res.status(200).json(savedPerson)

    }catch(err){
       console.log(err);
       res.status(500).json({error: "internal server error"})
    }


});



//fetch data from database and send to user
router.get('/', async (req, res)=>{
  try{
    const data = await person.find();
    console.log("data fetched");
    res.status(200).json(data)

  }catch(err){
     console.log(err);
     res.status(500).json({error: "internal server error"})
  } 


});


//send data by passing paramete in URL/API
router.get('/:workType', async (req, res)=>{
  try{
    const workType = req.params.workType;
    if(workType=='chef' || workType=='waiter' || workType=='manager'){
      const response = await person.find({work: workType});
      res.status(500).json(response);
    }else{
      res.status(404).json({error: "invalid workType"});
    }

  }catch(err){
     console.log(err);
     res.status(500).json({error: "internal server error "})
  } 


});



//update data in database
router.put('/:id', async (req, res)=>{
    try{
      const personID = req.params.id;   //fetch idwritten in URL
      const updatePersonData = req.body;    //fetch new data buuser
      const response = await person.findByIdAndUpdate(personID, updatePersonData, {     
        new: true,
        runValidators: true
      })
      if(!response){
        return res.status(404).json({error: "person not found"});
      }
      console.log('data updated');
      res.status(200).json({message: 'person updated successfll'})
  
    }catch(err){
       console.log(err);
       res.status(500).json({error: "internal server error "})
    } 
  
  
  });



  //delete data in database
router.delete('/:id', async (req, res)=>{
    try{
      const personID = req.params.id;   //fetch idwritten in URL
      const response = await person.findByIdAndDelete(personID);
      if(!response){
        return res.status(404).json({error: "person not found"});
      }
      console.log('data delete');
      res.status(200).json({message: 'person deleted successfll'})
  
    }catch(err){
       console.log(err);
       res.status(500).json({error: "internal server error "})
    } 
  
  
  });







module.exports = router;                //import in index.js