import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { auth } from 'firebase-admin';

// https://medium.com/nerd-for-tech/nestjs-firebase-auth-secured-nestjs-resource-server-9649bcebd0de
// https://habr.com/ru/company/ruvds/blog/332768/
// TODO: Errors json.response()

@Injectable()
export class FirebaseGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization;
    // if (token != null && token != '') {
    console.log('token', token);
    try {
      const decodedToken = await auth().verifyIdToken(
        token.replace('Bearer ', ''),
      );
      const user = {
        email: decodedToken.email,
      };
      req['user'] = user;
      return true;
    } catch (err) {
      console.log('err', err);
      return false;
    }
  }
}
