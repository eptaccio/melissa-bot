const config = {
  db_uri: process.env.MONGO_DB,
  botToken: process.env.BOT_TOKEN,
  telegramId: process.env.TELEGRAM_ID,
  melissaUrl: 'https://busca.lojamelissa.com.br/busca?q=melissa&common_filter[981]=1041&common_filter[34]=57|60'
}

module.exports = {
  config
}
