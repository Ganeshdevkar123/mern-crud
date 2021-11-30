import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import './App.css';





function App() {

     const [foodName, setFoodName] = useState('');
     const [days, setDays] = useState(0);
     const [newFoodName, setNewFoodName] = useState("");

     const [foodList, setFoodList]= useState([]);

     useEffect(()=>{

      Axios.get("http://localhost:3001/read").then((responce)=>{

      setFoodList(responce.data);

      });

     }, []);

     const addToList=()=>{

      //console.log(foodName + days);
      Axios.post("http://localhost:3001/insert", {
        foodName: foodName,
         days:days,
        });

     }

     const updateFood = (id) =>{
      Axios.put("http://localhost:3001/update", {

      id:id,
      newFoodName:newFoodName,

     });

     };



    const deleteFood = (id) =>{
      Axios.delete(`http://localhost:3001/delete/${id}`);

     };


  return (
    <div className="App">

      <h1>CRUD App With MERN</h1>
      <p>FOOD NAME</p>
      <input type="text" onChange={(event)=>{
        setFoodName(event.target.value);
      }}></input>

      <p>Days Scince You Ate It</p>
      <input type="number" onChange={(event)=>{
        setDays(event.target.value);
      }}></input>

      <button  onClick={addToList}>ADD TO LIST</button>


      <h1>Food List</h1>

      {foodList.map((val, key)=> {

        return<div key={key}>
        
          <h1>{val.foodName}</h1><h1>{val.daysSinceIAte}</h1>
          <input type="text" placeholder="New Food Name..." onChange={(event)=>{
        setNewFoodName(event.target.value);
      }} ></input>
          <button onClick={()=>updateFood(val._id)}>Update</button>
          <br/>
          <button onClick={()=>deleteFood(val._id)}>Delete</button>
          
        </div>

      })
      }

  


</div>
  );
}

export default App;
