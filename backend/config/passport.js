const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'PLACEHOLDER_ID',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'PLACEHOLDER_SECRET',
    callbackURL: "/api/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        try {
            // 1. Check if user exists by googleId
            let user = await User.findOne({ where: { googleId: profile.id } });

            if (user) {
                return cb(null, user);
            }

            // 2. Check by email
            if (profile.emails && profile.emails[0]) {
                const email = profile.emails[0].value;
                user = await User.findOne({ where: { email } });

                if (user) {
                    // Link Google Account
                    user.googleId = profile.id;
                    // Update avatar if not present? Maybe not.
                    await user.save();
                    return cb(null, user);
                }

                // 3. Create new user
                user = await User.create({
                    name: profile.displayName,
                    email: email,
                    googleId: profile.id,
                    avatar: profile.photos ? profile.photos[0].value : undefined,
                    role: 'customer' // default
                    // password is null
                });
                return cb(null, user);
            }

            return cb(new Error("No email found in Google Profile"));

        } catch (err) {
            return cb(err);
        }
    }
));

// Serialization not strictly needed for session-less JWT, but good practice if we switched
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;
