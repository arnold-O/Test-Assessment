const express = require('express');
const dotenv = require('dotenv')
const axios = require('axios');
dotenv.config({ path: "./.env" });
const app = express();


app.get('/flights', async(req, res)=>{
    const filters = req.query;
    // console.log(filters)
    const check = Object.keys(filters)
    const answer = Object.values(filters)
   

    const options = {
        method: 'GET',
        url: 'https://mocki.io/v1/c6022b01-1b3b-419a-ba19-75c44838424b',
      };
      
   
          const response = await axios.request(options);
         
          const filteredUsers = response.data.filter(user => {
           let data = []
            for (key in filters) {
            //   console.log(key, user[key], filters[key]);
              data =  user[key] == filters[key];
            }
            return data;
          });
        
         if(filteredUsers.length > 1){
            res.json(filteredUsers);
        }else{
           
            res.json({
                message:`This ${check} with value ${answer} is not valid`
            });

         }



      
    
  

})
// app.get('/flights', async(req, res)=>{
    

//     const options = {
//       method: 'GET',
//       url: 'https://toronto-pearson-airport.p.rapidapi.com/arrivals/carousel/9',
//       headers: {
//         'X-RapidAPI-Key': '5d52450d40msh9d1af2bbd083218p1f611ejsne64c0d9899cb',
//         'X-RapidAPI-Host': 'toronto-pearson-airport.p.rapidapi.com'
//       }
//     };
    
//     try {
//         const response = await axios.request(options);
//         console.log(response.data);
//     } catch (error) {
//         console.error(error);
//     }
    
  
// })








const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`app running on port ${PORT}`)
})
