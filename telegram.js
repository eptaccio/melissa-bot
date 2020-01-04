const axios = require('axios')
const { config } = require('./config')

function sendPhoto ({ photoUrl, caption, chatId }) {
  return axios({
    method: 'POST',
    url: `https://api.telegram.org/bot${config.botToken}/sendPhoto`,
    params: {
      photo: photoUrl,
      caption,
      chat_id: chatId,
      parse_mode: 'HTML'
    }
  })
}

module.exports = {
  telegram: {
    sendPhoto
  }
}
