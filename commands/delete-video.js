const { SlashCommandBuilder } = require('discord.js');
const { query } = require('../libs/db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete-video')
        .setDescription('刪除課程影片')
        .addStringOption(option => option.setName('keyword').setDescription('影片關鍵字')),
    async execute(interaction) {
        const keyword = interaction.options.getString('keyword');
        await query(`DELETE FROM videos WHERE keyword='${keyword}'`);
        await interaction.reply('刪除影片成功。');
    },
};
