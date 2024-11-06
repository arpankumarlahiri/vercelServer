import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptionsWithoutRequest,
} from 'passport-jwt';
import db from '../models';
import passport from 'passport';

const opts: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
};

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    db.User.findByPk(jwt_payload.id)
      .then((user: any) => {
        if (user) {
          const { password, ...userWithoutPassword } = user?.dataValues;
          return done(null, userWithoutPassword);
        } else {
          return done(null, false);
        }
      })
      .catch((err: any) => {
        return done(err, false);
      });
  }),
);
