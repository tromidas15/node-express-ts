import { Router, Request , Response } from "express";
import UserController from "../Controller/UserController"
import { authMiddleware } from "../middleware/AuthMiddleware";

const router : Router = Router();

router.post('/register' , async (req: Request , resp: Response) => {
   return new UserController(resp).register(req);
})

router.post('/login' , async (req: Request , resp: Response) => {
   return new UserController(resp).login(req);
});

router.patch('/user/:id' , authMiddleware ,async (req: Request , resp: Response) => {
   return new UserController(resp).update(req);
})



module.exports = router;