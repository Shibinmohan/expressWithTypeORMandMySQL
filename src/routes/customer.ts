import express, { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { User } from "../entity/User";
import UserInt from "../interface/user.interface";
export const customerRouter = express.Router();

const user = new User();

const userInt = new UserInt();

customerRouter.get("/", async (req: Request, res: Response) => {
  const users = await userInt
    .getAll()
    // .then()
    // .catch((err) => {
    //   console.log(err);
    // });
  return res.status(200).json({ users });
});

customerRouter.post("/add", async (req: Request, res: Response) => {
  // Check parameters
  // const { user } = req.body;
  user.firstName = "Timber";
  user.lastName = "Saw";

  if (!user) {
    return res.status(500).json({
      error: "paramMissingError",
    });
  }
  // Add new user
  // user.role = UserRoles.Standard;
  await userInt
    .add(user)
    .then(user=>console.log(user))
    .catch((err) => res.send(err));
  return res.status(200).json({ success: "created" });
});
