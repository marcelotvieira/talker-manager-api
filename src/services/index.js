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

module.exports = {
    read,
    findTalkerById,
};
