import 'dotenv/config';
import db from '../models';
import express from "express";
import cors from "cors";
import routes from '../routes';

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

  
  db.sequelize.sync().then(() => {
  app.listen(process.env.PORT,()=>{
      console.log(`server now is running on port:${process.env.PORT}`)
  })
  })