const emptyEmailError = {
    message: 'O campo "email" é obrigatório',
  };
const emailError = {
    message: 'O "email" deve ter o formato "email@email.com"',
  };
const emptyPasswordError = {
    message: 'O campo "password" é obrigatório',
  };
const passwordError = {
    message: 'O "password" deve ter pelo menos 6 caracteres',
  };

const validateEmail = (req, res, next) => {
    const { email } = req.body;
    if (!email || email === '') { res.status(400).send(emptyEmailError); }
    const exp = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    const isValid = exp.test(email);
    if (!isValid) { res.status(400).send(emailError); }
    next();
};

const validatePassword = (req, res, next) => {
    const { password } = req.body;
    const isValid = !password || password.length > 5;
    if (!password) { res.status(400).send(emptyPasswordError); }
    if (!isValid) { res.status(400).send(passwordError); }
    next();
};

module.exports = {
    validateEmail,
    validatePassword,
};