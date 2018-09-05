const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL);

const User = conn.define('user', {
  name: Sequelize.STRING
},{
  hooks: {
    beforeValidate: function(user){
      if(user.managerId === ''){
        user.managerId = null;
      }
    }
  }
});

User.belongsTo(User, { as: 'manager' });

const syncAndSeed = ()=> {
  return conn.sync({ force: true })
    .then(async()=> {
      const [moe, larry, curly ] = await Promise.all([
        User.create({ name: 'moe' }),
        User.create({ name: 'larry' }),
        User.create({ name: 'curly' }),
      ]);
      return Promise.all([
        larry.setManager(moe),
        curly.setManager(larry),
      ]);
    });
};

module.exports = {
  syncAndSeed,
  models: {
    User
  }
};
