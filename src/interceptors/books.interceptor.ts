// import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
// import { Observable, map } from "rxjs";
// import { Product } from "../schema/productSchema";


// @Injectable()
// export class UsersInterceptor implements NestInterceptor{
//     intercept (context: ExecutionContext, next: CallHandler,
//       ):Observable<any> | Promise<Observable<any>>{
//         console.log(context.getClass().name);
//         return next.handle().pipe(map((data) => data.map (({password, ...}) => Product)));
//     }
// }