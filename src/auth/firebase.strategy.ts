import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { auth } from 'firebase-admin';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.FIREBASE_SECRET_OR_KEY.replace(/\\n/g, '\n'),
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    const accessToken = req.headers['authorization'];
    console.log(accessToken); // i need it here as 'Bearer e*****.....'
    try {
      await auth().verifyIdToken(accessToken.replace('Bearer ', ''));
      console.log(payload);
      const user = {
        email: payload.email,
        user_id: payload.user_id,
      };
      return user;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException(err);
    }
  }
}
