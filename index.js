const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()

client.login(process.env.TOKEN)
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
    const channel = client.channels.cache.get(process.env.CHANNEL_ID);

    if (!channel) return console.error('channel does not exist');
    channel.join().then(connection => {
        connection.on('speaking', (_) => {
            const dispatch = connection.play(require('path').join(__dirname, process.env.AUDIO_FILE_PATH))
            dispatch.on('start', () => {
                dispatch.setVolume(0.7);
                console.log('playing')
            })

            dispatch.on('end', end => {
                console.log('done');
            })
        })
        console.log('Worked');
    }).catch(e => console.error(e))
});

