const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkw5WElNVm1GRE1CQWFIczM1NlB6R0JqOXN3czhrTlFCZUFURUVvTitHOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoianFCNGpYSUJ0elZpRnM4blNLSDVCTXlmeWM5V1ZHbVREVHZiamkxOXFsWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhTzhGbUhZZ3NKTWpUSEo1ZE01cUlhUnl4VkM2d0FHQWJaa3VMM2MxbG5VPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2bnVtZVpSUUFqc3ZuVzFXbEpXdjhaWHpadG1TNFdpMEtBYmdaVFk3VzIwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBFa3ZmWU9oNkpaM2MxVG1JREFIOUVPSXl6aGhKZCtPZVJvNmM5a2J2bmM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitWK1BVNW13Qzh0QzBDMjFCSXhhazhuN2NiUU51Z3I3YVhPWEwwUmhhU1U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0k3U0NHYy9ORXB1TUdENWcrcmh5clRqUmIzWkJtVStXYnRSTW4waERrMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0Q1VEhMZlBaMXZMSDlEanhFbkhKWnc0TmpDOUQ5d3NjOVUwVHhUam5FYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhwcHdNRWRsbm9HZWFmT0tXK2hXRE9yejc1Q1hJYXpUMmNHN2RJUFQvTkt6aW5KbVB2ckNtdWJLS1RsQmtMWHc5NURzd2daOFlGK0dQaENPTWIvK0RnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI4LCJhZHZTZWNyZXRLZXkiOiJYbGd5R1VPdG9QbEJKM0JoY2JmMXRGUDZzekJ6UmcyaEV6dFVKN0w1MzlRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJUVk0wTXJxU1NmdThCWkNVWTJLZlB3IiwicGhvbmVJZCI6IjdlOTI0MmFkLWE5ZjItNGY2Yi1iNzU0LTU1NzE4NmVlZjU0NyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJSa2hLNFRmcXVEWnI1cGgybnFMMFowS0JCWUk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaU1KeU9lODJNSkh2aUE5YlZpdUhZd3BKaUlZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkJTUkg2RExXIiwibWUiOnsiaWQiOiIyNjM3NzcyOTcxMjg6NDVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2QuvCdkZbwnZGm8J2RoiDwnZGH8J2RnPCdkZrwnZGW8J2RnPCdkZjwnZGOIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPbUUzSzhCRUtxM3lMa0dHQmdnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJaSVNXd2VSWXVocEQ0NWp5OFJNTkNIcWtDbXl6OWIzU1BLdVRHdmR6dEYwPSIsImFjY291bnRTaWduYXR1cmUiOiI0bTlDMGFvTGVYVTRIM2U1QStlMWM5aE96ZTVXc2xubk1JRlZtQ0t2a0VUZ0FEUjdBMTVuanJMZ003RUh1djIrVDV5SVBvbmdLOU5QampIajhBNVVBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoidVgyVDdRaTZLTmwvUXV6U0I2RGFsVlRDWDN2VWxvWTVYS0d4V2ZCZ2I0cU9vdEYzcXhBQnFHeUhQTnpnV01yK3Qzek5PSkpiRzVGSmZUMGlKRTZEQXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3NzcyOTcxMjg6NDVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV1NFbHNIa1dMb2FRK09ZOHZFVERRaDZwQXBzcy9XOTBqeXJreHIzYzdSZCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMTMzNzE0MywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFJejQifQ==',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/Keithkeizzah/ALPHA-MD1',
    OWNER_NAME : process.env.OWNER_NAME || "giyu",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "263777297128",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'non',              
    CHATBOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.BLOCK_ALL || 'yes',              
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
    CAPTION : process.env.CAPTION || "ALPHA-MD",
    BOT : process.env.BOT_NAME || 'ALPHA_MD',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "no",
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL: process.env.ANTICALL || 'yes',              
    CHATBOT : process.env.PM_CHATBOT || 'no',  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
