import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import { getUserById } from "../services/userServices.js";


const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  new Strategy(opts, async (jwt_payload, done) => {
    try {
      const user = await getUserById(jwt_payload.id);
      console.log("Payload recibido:", jwt_payload);
      if (user) return done(null, user);
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;