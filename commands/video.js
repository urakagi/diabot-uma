const { SlashCommandBuilder } = require('discord.js');
const { query } = require('../libs/db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('video')
        .setDescription('用課程名稱取得影片')
        .addStringOption(option => option.setName('keyword').setDescription('影片關鍵字')),
    async execute(interaction) {
        const keyword = interaction.options.getString('keyword');
        const sql = `SELECT keyword, url FROM videos WHERE keyword LIKE '%${keyword}%'`;
        const res = await query(sql);
        if (res.length > 0) {
            await interaction.reply(`課程影片（${res[0].keyword}）：\n${res[0].url}`);
        } else {
            await interaction.reply(`找不到含關鍵字${interaction.options.getString('keyword')}的影片！`);
        }
    },
};
