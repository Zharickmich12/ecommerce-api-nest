import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { console } from "inspector";

@Injectable ()
export class LoggerMiddleware implements NestMiddleware {
        use(req: Request, res: Response, next: NextFunction) {
            console.log("Request ....", new Date().toDateString());
        next();
    }
}


//Pipes