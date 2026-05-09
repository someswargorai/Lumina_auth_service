import { redis } from "../configs/redis_config.js";
import { NextFunction, Request, Response } from "express";


const rateLimit = async (req: Request, res: Response, next: NextFunction) => {
    try{
      
        const userIp = req.ip;
        const key = `user:${userIp}`;
        const currentLimit = await redis.incr(key);
   
        if(currentLimit === 1){
            await redis.expire(key, 60);
        }
        if(currentLimit > 10){ 
            const ttl = await redis.ttl(key);
            return res.status(429).json({success: false, data: { message: `Too many requests, try again in ${ttl}s`}});
        }
        next();
        
    }catch(err){
        console.log(err);
        return res.status(500).json({success: false, data: { message: "Internal server error"}});
    }
}

export { rateLimit };