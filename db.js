const Sequelize = require('sequelize')

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './.sqlite',
    logging: false
})

sequelize.sync();
sequelize.authenticate().then(() => {
    //console.log('Connexion ok');
})
    .catch(err => {
        console.log('Connexion refusée', err);
    });

module.exports = sequelize