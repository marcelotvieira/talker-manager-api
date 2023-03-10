const express = require('express');
const services = require('./services');
const {
  validateEmail,
  validatePassword,
  checkToken,
  validateToken,
  checkRequestNameData,
  checkRequestAgeData,
  checkRequestTalkData,
  checkRequestWatchedAtData,
  checkRequestRateData,
} = require('./middlewares');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res) => {
  try {
    const data = services.read();
    if (!data) throw new Error('Não foi possível ler a lista de palestrantes');
    if (data.length < 1) return res.status(200).send([]);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
  }
});

app.post(
  '/talker',
   checkToken,
   validateToken,
   checkRequestNameData,
   checkRequestAgeData,
   checkRequestTalkData,
   checkRequestWatchedAtData,
   checkRequestRateData,
      (req, res) => {
  try {
    const data = services.read();
    const newTalker = { id: data.length + 1, ...req.body };
    services.write(newTalker);
    res.status(201).json(newTalker);
  } catch (err) {
    res.status(400).send(err.message);
  }
},
);

app.put('/talker/:id',
checkToken,
validateToken,
checkRequestNameData,
checkRequestAgeData,
checkRequestTalkData,
checkRequestWatchedAtData,
checkRequestRateData,
(req, res) => {
  try {
    const { id } = req.params;
    const newTalker = { id: Number(id), ...req.body };
    services.update(newTalker);
    res.status(200).json(newTalker);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.delete('/talker/:id', checkToken, validateToken, (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    services.destroy(id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({
      msg: err.message,
    });
  }
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talker = services.findTalkerById(Number(id));

  if (!talker) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).send(talker);
});

app.post('/login', validateEmail, validatePassword, (req, res) => {
  const { email, password } = req.body;
  const response = { token: services.genToken(email, password) };
  res.status(200).send(response);
});

app.listen(PORT, () => {
  console.log('Online');
});
