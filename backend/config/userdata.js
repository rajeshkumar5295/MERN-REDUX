// const bcrypt = require("bcrypt");

// const passwordhash=async(compass)=>{
//     console.log(compass)
//   try {  
             

             
//         const password= await bcrypt.hash(compass,10);
//         console.log(password)
//         return password;
      
//   } catch (error) {
//     console.log(error);
//   }
// }

// // passwordhash(123456)
// passwordhash(ff456)

const users = [
  {
    name: "Rajesh",
    email: "rajeshatka4746@gmail.com",
    password: "12345",
    isAdmin: true,
  },
  {
    name: "Raju",
    email: "rajuatka4746@gmail.com",
    password: "4567",
  },
  {
    name: "Raja",
    email: "rajaatka4746@gmail.com",
    password:"963",
  },
];

module.exports=users;