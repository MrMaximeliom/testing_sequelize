import { Router } from 'express';
import db from '../models';
const router = Router();
import { authJwt , verifySignUp } from "../middlewares";
import controller from "../controllers/auth.controllers"


router.get('/', [authJwt.verifyToken,authJwt.isAdmin],async (req, res) => {
	const users = await db.User.findAll();
	return res.send(users);
	
  });

router.get('/:userId', async (req, res) => {
	const user = await db.User.findByPk(
	  req.params.userId,
	);
  if(user){
    return res.send(user);
  }
  else{
    return res.send("User not found!")

  }
	
  });
  router.put('/:userId', async (req, res) => {
	const user = await db.User.findByPk(
	  req.params.userId,
	);
  if(user){
    const flag = await user.update({
      username: req.body.username,
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      email:req.body.email
  }, { where: { id: req.params.userId } })
  await flag.save()
  if(flag){
    return res.send({message:"Updated Successfully!",user:flag});
      
  }
  else{

      return res.send(`failed to update!${flag.username}`);
  }

  }
  else{
    return res.send(`User with id:${req.params.userId} is not found`)
  }
 
    
	
  });
router.delete('/:userId', async (req, res) => {
	const user = await db.User.findByPk(
	  req.params.userId,
	);
    await user.destroy();
	return res.send('deleted successfully');
  });
  

export default router;


