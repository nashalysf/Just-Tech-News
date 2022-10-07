const User = require('./user');
const Post = require('./post');

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});
//reverse association 
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
});

module.exports = { User, Post };