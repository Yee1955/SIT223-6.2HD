require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
            ca: `
            -----BEGIN CERTIFICATE-----
            MIIEQTCCAqmgAwIBAgIUT9fnGbYZBuxYwiSVBlgDXXa1SOMwDQYJKoZIhvcNAQEM
            BQAwOjE4MDYGA1UEAwwvNjAyNDFlYzgtMGQ0Yy00OGRhLTk5NTgtOTkwN2Y1ZDJj
            Yjg5IFByb2plY3QgQ0EwHhcNMjQwNjAyMDk0MjUzWhcNMzQwNTMxMDk0MjUzWjA6
            MTgwNgYDVQQDDC82MDI0MWVjOC0wZDRjLTQ4ZGEtOTk1OC05OTA3ZjVkMmNiODkg
            IFByb2plY3QgQ0EwggGiMA0GCSqGSIb3DQEBAQUAA4IBjwAwggGKAgEB4E2gJgO+
            3iFzL5SzocGGnlLkGvB4P5W1fC9En1slhO9B2XnWepHZzycfQ6vUpql3KktkKcNU
            o8sc5chZxK8w24GH2K7svNO2RU7pLUaIcUO0XaS4DbHmn/ab45cz1zBC2lOeDniW
            Z9fM5SKv4Y2gA5eXWXuT5Y9D2GxNKN5tsl3BvNGNBjZGVGZc7f5RbhK3sxN92iYK
            zzUO6H29Wa0gAg==
            -----END CERTIFICATE-----
            `
        }
    }
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});