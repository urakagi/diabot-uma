const { SlashCommandBuilder } = require('discord.js');
const { query } = require('../libs/db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-video')
        .setDescription('新增課程影片')
        .addStringOption(option => option.setName('keyword').setDescription('影片關鍵字'))
        .addStringOption(option => option.setName('url').setDescription('影片網址')),
    async execute(interaction) {
        const keyword = interaction.options.getString('keyword');
        const url = interaction.options.getString('url');
        await query(`INSERT INTO videos (keyword, url) VALUES ('${keyword}', '${url}')`);
        await interaction.reply('新增影片成功。');
    },
};
