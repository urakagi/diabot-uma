const { query } = require('../libs/db');
const ADMIN_IDS = ['191744769540620288'];

async function parseShortcuts(word) {
    const sql = `SELECT content FROM shortcuts WHERE word='${word}'`;
    const res = await query(sql);
    if (res.length > 0) {
        return res[Math.floor(res.length * Math.random())].content;
    } else {
        return null;
    }
}

async function addShortcuts(line) {
    const word = line.split(' ')[0];
    const content = line.substring(word.length + 1);
    await query(`INSERT INTO shortcuts (word, content) VALUES ('${word}', '${content}')`);
    return `成功加入${word}。`;
}

async function deleteShortcuts(word) {
    await query(`DELETE FROM shortcuts WHERE word='${word}'`);
    return `刪除${word}成功。`;
}

async function sendGameTora(page) {
    const sql = `SELECT url FROM gametora WHERE page='${page}'`;
    const res = await query(sql);
    if (res.length > 0) {
        return res[Math.floor(res.length * Math.random())].url;
    } else {
        return `尚無該頁面資料：${page}`;
    }
}

async function addGameTora(input) {
    const page = input.replaceAll('　', ' ').split(' ')[0];
    const url = input.substring(page.length + 1);
    await query(`INSERT INTO gametora (page, url) VALUES ('${page}', '${url}')`);
    return `已加入頁面資料：${page}`;
}

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        try {
            const content = message.content;
            let resp;
            if (content.startsWith('!gt ')) {
                resp = await sendGameTora(content.substring(4));
            } else if (content.startsWith('！虎 ') || content.startsWith('!虎 ')) {
                resp = await sendGameTora(content.substring(3));
            } else if (content.startsWith('+gt ')) {
                resp = await addGameTora(content.substring(4));
            } else if (content.startsWith('＋虎 ') || content.startsWith('+虎 ')) {
                resp = await addGameTora(content.substring(3));
            } else if (content.startsWith('+!') || content.startsWith('＋！') || content.startsWith('+！')) {
                if (ADMIN_IDS.includes(message.author.id)) {
                    resp = await addShortcuts(content.substring(2));
                }
            } else if (content.startsWith('-!')) {
                if (ADMIN_IDS.includes(message.author.id)) {
                    resp = await deleteShortcuts(content.substring(2));
                }
            } else if (content.startsWith('!') || content.startsWith('！')) {
                resp = await parseShortcuts(content.substring(1));
            }
            if (resp) {
                await message.channel.send(resp);
            }
        } catch (e) {
            console.log(e);
            await message.channel.send(`發生錯誤：${e}`);
        }
    },
};

