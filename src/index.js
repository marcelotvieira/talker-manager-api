const express = require('express');
const services = require('./services');

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
    if (data.length < 1) res.status(200).send([]);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
  res.status(200).json();
});

app.get('/talker/:id', (req, res) => {
    const { id } = req.params;
    const talker = services.findTalkerById(Number(id));

    if (!talker) { 
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
    }
    res.status(200).send(talker);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const response = { token: services.genToken(email, password) };
  res.status(200).send(response);
});

app.listen(PORT, () => {
  console.log('Online');
});
