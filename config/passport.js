const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../app/model/user/main');

const db = require('./connection');

passport.serializeUser(async (user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  let serializedUser = await User.findById(user.id);
  done(null, serializedUser[0]);
});

passport.use(
  'local-signup',
  new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
    async (req, username, password, done) => {
      try {

        let user = await User.findByUsername(username);

        if (!req.body.name) {
          return done(null, false, req.flash('signupMessage', 'É necessário preencher todos os campos.'));
        };

        if (user.length) {
          return done(null, false, req.flash('signupMessage', 'Este usuário já está cadastrado.'));
        } else {


          if (password !== req.body.confirmPassword) {
            return done(null, false, req.flash('signupMessage', 'Senhas Não correspondem.'));
          } else {
            const newUser = {
              name: req.body.name,
              username: req.body.username,
              password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
              phone: req.body.phone
            };
            try {
              await User.save(newUser);
              return done(null, false, req.flash('signupMessage', 'Colaborador(a) ' + req.body.name + ' cadastrado(a) com sucesso!'));
            } catch (err) {
              console.log(err);
              return done(null, false, req.flash('signupMessage', 'Ocorreu um erro ao cadastrar o colaborador!'));
            };
          };
        };
      } catch (err) {
        console.log(err);
      }
    })
);

passport.use(
  'local',
  new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
    async (req, username, password, done) => {
      try {
        let user = (await User.findByUsername(username))[0];

        if (!user) {
          return done(null, false, req.flash('loginMessage', 'Usuário não encontrado.'));
        };

        if (user) {
          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, req.flash('loginMessage', 'Senha inválida.'));
          };
          return done(null, { id: user.id, domain: user.domain, business: user.business });
        };
      } catch (error) {
        console.log(error);
      }
    })
);

module.exports = passport;