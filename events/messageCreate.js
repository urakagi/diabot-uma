function parseCommand(content) {
    if (content === '美妙') {
        return '非速智愛帶30美妙直接讓一張卡，養出辣雞馬怪我囉？';
    } else if (content === '上課') {
        return '你這個問題在我們的學程影片可以得到解答：' +
            'https://www.youtube.com/playlist?list=PL_BTNAzC0OXjiUsM58XTfkNJloTFUdxpo';
    } else if (content === '補課') {
        return '你這個問題在我們的學程影片可以得到解答：' +
            'https://www.youtube.com/playlist?list=PL_BTNAzC0OXjiUsM58XTfkNJloTFUdxpo';
    } else if (content === '歷戰') {
        return '2022年了還有人歷戰你認真的嗎\nhttps://www.youtube.com/watch?v=CFHjRCUYEAw';
    }
}

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        const content = message.content;
        if (content.startsWith('!') || content.startsWith('！')) {
            const resp = parseCommand(content.substring(1));
            if (resp) {
                await message.channel.send(resp);
            }
        }
    },
};

