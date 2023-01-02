const fs = require('fs');

// fazer uso de caminhos absolutos
const read = () => {
    const data = JSON.parse(fs.readFileSync('src/talker.json'));
    return data;
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
};
