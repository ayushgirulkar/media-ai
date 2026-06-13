import { NextFunction, Request,Response } from "express"
import  Jwt  from "jsonwebtoken";
import{User} from "../models/User.js";

export interface AuthRequest extends Request
{
    user?:any;
}
export const protect=async(req:AuthRequest,res:Response,next:NextFunction)=>
{
    let token;
    if(req.header.authorization && req.headers.authorization?.startsWith("Bearer"))
    {
        try{
                token=req.header.authorization.split("")[1];
                const decoded:any= jwt.verify(token,process.env.JWT_SECRET!)
                req.user=await User.findById(decoded.id).select("-password")
                next()
        }
        catch (error){
                
            res.status(401).json({message:error?.message || "not authorized , token failed"})
        }
    }
    else
    {
        res.status(401).json({message:"Not authorized , no token"});
    }
}