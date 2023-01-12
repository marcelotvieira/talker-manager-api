const fs = require('fs');

// fazer uso de caminhos absolutos
const read = () => {
    const data = JSON.parse(fs.readFileSync('src/talker.json'));
    return data;
};

const write = (talker) => {
    const data = read();
    const newData = [...data, talker];
    fs.writeFile('src/talker.json', JSON.stringify(newData), (err) => {
        if (err) {
          return console.log(err);
        }
    });
};

const update = (talker) => {
    const data = read();
    const filteredData = data.filter((t) => talker.id !== t.id);
    const newData = [...filteredData, talker];
    fs.writeFile('src/talker.json', JSON.stringify(newData), (err) => {
        if (err) {
          return console.log(err);
        }
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
