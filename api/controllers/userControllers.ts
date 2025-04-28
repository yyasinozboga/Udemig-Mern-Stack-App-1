import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import User, { IUser } from "../models/userModal";
import bcrypt from "bcrypt";

interface IPayload {
  id: string;
}

interface DecodedToken extends JwtPayload {
  id: string;
}

interface IRequest extends Request {
  currentUser?: IUser;
}

const signJWT = (userId: string) => {
  const payload: IPayload = { id: userId };
  const SECRET_KEY = process.env.SECRET_KEY as string;
  const options: SignOptions = {
    expiresIn: process.env.EXPIRES_IN as unknown as number,
  };

  return jwt.sign(payload, SECRET_KEY, options);
};

const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(404).json({ message: "Invalid password" });
    }

    const token = signJWT(user.id);

    res
      .cookie("jwt", token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: false,
        sameSite: "lax",
      })
      .status(200)
      .json({ token });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = signJWT(newUser.id);

    res.status(201).json({ token });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

const protect = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const token = req.cookies?.jwt || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY as string,
    ) as DecodedToken;

    if (!decoded) {
      return res.status(401).json({ message: "Token is invalid" });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.currentUser = user;

    next();
  } catch (error: any) {
    res.status(404).json(error.message);
  }
};

const logout = (req: Request, res: Response) => {
  try {
    res
      .clearCookie("jwt")
      .status(200)
      .json({ message: "Log out succesfully!" });
  } catch (error: any) {
    res.status(404).json(error.message);
  }
};

export { login, register, logout, protect };
