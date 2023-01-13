const fs = require('fs');
const path = require('path');

const TALKER_DATA_PATH = '../talker.json';

// fazer uso de caminhos absolutos

const fsWrite = (value) => {
    fs.writeFile(path.resolve(__dirname, TALKER_DATA_PATH), JSON.stringify(value), (err) => {
        if (err) {
          return console.log(err);
        }
    });
};

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
    fsWrite(newData);
};

const update = (talker) => {
    const data = read();
    // const filteredData = data.filter((t) => talker.id !== t.id);
    // if (data.length === filteredData.length) return;
    const newData = [...data, talker];
    return fsWrite(newData);
};

const destroy = (talkerId) => {
    const data = read();
    const newData = data.filter((talker) => talker.id !== Number(talkerId));
    console.log('asudhasiudshduih\n', talkerId);
    console.log(newData);
    return fsWrite(newData);
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
    destroy,
};
