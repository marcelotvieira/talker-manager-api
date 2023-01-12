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
  if (!email || email === '') {
    return res.status(400).send(emptyEmailError);
  }
  const exp = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  const isValid = exp.test(email);
  if (!isValid) {
    return res.status(400).send(emailError);
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const isValid = !password || password.length > 5;
  if (!password) {
    return res.status(400).send(emptyPasswordError);
  }
  if (!isValid) {
    return res.status(400).send(passwordError);
  }
  next();
};

const checkToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        message: 'Token não encontrado',
      });
    }
    next();
  } catch (error) {
      return res.status(400).json({
      message: error.message,
    });
  }
};

const validateToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (typeof authorization !== 'string' || authorization.length !== 16) {
      return res.status(401).json({
        message: 'Token inválido',
      });
    }
    next();
  } catch (err) {
      return res.status(400).json({
      message: err.message,
    });
  }
};

const checkRequestNameData = (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name || name === '') {
      return res.status(400).json({
        message: 'O campo "name" é obrigatório',
      });
    }
    if (name.length <= 3) {
      return res.status(400).json({
        message: 'O "name" deve ter pelo menos 3 caracteres',
      });
    }
    next();
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const checkRequestAgeData = (req, res, next) => {
  try {
    const { age } = req.body;
    if (!age || age === '') {
      return res.status(400).json({
        message: 'O campo "age" é obrigatório',
      });
    }
    if (age < 18) {
      return res.status(400).json({
        message: 'A pessoa palestrante deve ser maior de idade',
      });
    }
    next();
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const checkRequestTalkData = (req, res, next) => {
  try {
    const { talk } = req.body;
    if (!talk || talk.length < 1) {
      return res.status(400).json({
      message: 'O campo "talk" é obrigatório',
    });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const checkRequestWatchedAtData = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const expPattern = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  if (!watchedAt) {
      return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!expPattern.test(watchedAt)) {
      return res.status(400).json({ 
          message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const checkRequestRateData = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (rate === undefined) {
      return res.status(400).json({
          message: 'O campo "rate" é obrigatório',
      });
  }
  if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
      return res.status(400).json({
          message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      });
  }
  next();
};

module.exports = {
  validateEmail,
  validatePassword,
  checkToken,
  validateToken,
  checkRequestNameData,
  checkRequestAgeData,
  checkRequestTalkData,
  checkRequestWatchedAtData,
  checkRequestRateData,
};
