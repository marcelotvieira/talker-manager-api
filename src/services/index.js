const fs = require('fs');
const path = require('path');

const TALKER_DATA_PATH = '../talker.json';

// fazer uso de caminhos absolutos
const read = () => {
    try {
        const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, TALKER_DATA_PATH)));
        return data;
    } catch (err) {
        return err.message;
    }
};

const write = (talker) => {
    const data = read();
    const newData = [...data, talker];
    fs.writeFile(path.resolve(__dirname, TALKER_DATA_PATH), JSON.stringify(newData), (err) => {
        if (err) {
          return console.log(err);
        }
    });
};

const update = (talker) => {
    const data = read();
    const filteredData = data.filter((t) => talker.id === t.id);
    if (data.length === filteredData.length) return;
    const newData = [...filteredData, talker];
    console.log(newData);
    fs.writeFile(path.resolve(__dirname, TALKER_DATA_PATH), JSON.stringify(newData), (error) => {
        if (error) return console.log(error);
    });
};

const findTalkerById = (id) => {
    const data = read();
    const talker = data.find((currTalk) => currTalk.id === id);
    return talker;
};

const genToken = (email, password) => {
    const hash = [...(email.split('')), ...(password.split(''))];
    let token = '';

    for (let i = 16; i > 0; i -= 1) {
        token += hash[Math.floor(Math.random() * hash.length)];
    }
    return token;
};

module.exports = {
    read,
    findTalkerById,
    genToken,
    write,
    update,
};
