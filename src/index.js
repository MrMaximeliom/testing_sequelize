import 'dotenv/config';
import db from '../models';
import express from "express";
import cors from "cors";
import routes from '../routes';
const Role = db.role

const app = express()
// app.use((req, res, next) => {
//   req.context = {
//     models,
//   };
//   next();
// });
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users",routes.user)
require('../routes/auth.routes')(app);

function initial(){
    Role.create({
        name:"user"
    })
    Role.create({
        name:"admin"
    })
}
db.sequelize.sync().then(() => {
app.listen(process.env.PORT,()=>{
      console.log(`server now is running on port:${process.env.PORT}`)
  })

  

  
  })