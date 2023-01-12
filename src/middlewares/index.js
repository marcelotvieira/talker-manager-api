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
    res.status(400).send(emptyEmailError);
  }
  const exp = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  const isValid = exp.test(email);
  if (!isValid) {
    res.status(400).send(emailError);
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const isValid = !password || password.length > 5;
  if (!password) {
    res.status(400).send(emptyPasswordError);
  }
  if (!isValid) {
    res.status(400).send(passwordError);
  }
  next();
};

const checkToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).json({
        message: 'Token não encontrado',
      });
    }
    next();
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const validateToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (typeof authorization !== 'string' || authorization.length !== 16) {
      res.status(401).json({
        message: 'Token inválido',
      });
    }
    next();
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const checkRequestNameData = (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name || name === '') {
      res.status(400).json({
        message: 'O campo "name" é obrigatório',
      });
    }
    if (name.length <= 3) {
      res.status(400).json({
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
      res.status(400).json({
        message: 'O campo "age" é obrigatório',
      });
    }
    if (age < 18) {
      res.status(400).json({
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
      res.status(400).json({
      message: 'O campo "talk" é obrigatório',
    });
    }
    next();
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const checkRequestWatchedAtData = (req, res, next) => {
  try {
    const { talk: { watchedAt } } = req.body;
    if (!watchedAt || watchedAt === '') {
      res.status(400).json({
        message: 'O campo "watchedAt" é obrigatório',
      });
    }
    next();
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const checkDateType = (req, res, next) => {
  try {
    const { talk: { watchedAt } } = req.body;
    const expPattern = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/g;
    if (!(expPattern.test(watchedAt))) {
      res.status(400).json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      });
    }
    next();
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const checkRequestRateData = (req, res, next) => {
  try {
    const { talk: { rate } } = req.body;
    if (!rate) {
      if (rate === 0) {
        return res.status(400).json({
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      }); 
}
      return res.status(400).json({
        message: 'O campo "rate" é obrigatório',
      });
    }
    next();
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const checkRequestRateType = (req, res, next) => {
  try {
    const { talk: { rate } } = req.body;
    if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
      res.status(400).json({
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      });
    }
    next();
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
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
  checkDateType,
  checkRequestRateData,
  checkRequestRateType,
};