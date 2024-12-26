require('dotenv').config()

module.exports = {
  TZ: process.env.TZ = 'Asia/Bangkok',
  port: process.env.PORT || 3000,
  isProduction: process.env.NODE_ENV === 'development',
  apiVersion: process.env.API_VERSION || 1,
  token_exp_days: process.env.TOKEN_EXP_DAYS || 1,
  pageLimit: process.env.PAGE_LIMIT || 15,
  pstDBHost: process.env.PST_DB_HOST,
  pstDB : process.env.PST_DB,
  pstDBUser: process.env.PST_USER,
  pstDBPassword: process.env.PST_PASSWORD,
  PSTIU_Unittrust : process.env.PSTIU_DB_Unittrust,
  pstIUUser: process.env.PSTIU_USER,
  pstIUPassword: process.env.PSTIU_PASSWORD,
  pstIUDBHost: process.env.PSTIU_DB_HOST,
  pstIU_A : process.env.PSTIU_DB_A,

  urlSendDiscord: process.env.URL_SEND_DISCORD,
}