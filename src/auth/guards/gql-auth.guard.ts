import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;

        // const token = ctx.req.headers.authorization as string;
        // // if(token){
        // //     log(token);

        // const jwtService = new JwtService()
        // const user = jwtService.verify(process.env.JWT_ACCESS_SECRET, )
        // // }
        // ctx.user = token.split(' ')[1];
        // return ctx.user;
    }
}

// export class AccessTokenGuard implements CanActivate {
//     constructor(private jwtService: JwtService) { }

//     async canActivate(context: ExecutionContext): Promise<boolean> {
//         const  ctx = GqlExecutionContext.create(context).getContext();
//     }
// }