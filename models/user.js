const { Model, DataTypes } = require ('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//create user model
class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password);
    }
}

//define table, columns and config
User.init(
    {
         // ID COLUMN
    id: {
        // use the Sequelize DataTypes object to provide type of data
        type: DataTypes.INTEGER,
        // this is the equivalent of SQL's `NOT NULL` option
        allowNull: false,
        // instruct that this is the Primary Key
        primaryKey: true,
        // turn on auto increment
        autoIncrement: true
      },
      // USERNAME COLUMN
    username: {
        type: DataTypes.STRING,
        allowNull: false
      },
       // EMAIL COLUMN
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        // there cannot be any duplicate email values in this table
        unique: true,
        // if allowNull is set to false, we can run our data through validators before creating the table data
        validate: {
          isEmail: true
        }
      },
       // PASSWORD COLUMN
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // this means the password must be at least four characters long
          len: [4]
        }
      }
    },

    { //TABLE CONFIG OPTIONS GO HERE
        
            hooks:{
                //set up beforeCreate lifecycle()
                async beforeCreate(newUserData) {
                    newUserData.password = await bcrypt.hash(newUserData.password, 10);
                    return newUserData;
                  },
                  //set up beforeUpdate lifecylce
                  async beforeUpdate(updateUserData){
                    updateUserData.password = await bcrypt.hash(updateUserData.password, 10);
                    return updateUserData;
                  }
        },

        //pass in imported sequelize connection (the direct connection to db)
        sequelize,

        //dont automatically create createdAt/updateAt timestamp fields
        timestamps: false,

        //dont plurilize name of db table
        freezeTableName: true,

        //use underscores instead of came-casing (comment_text instead of commentText)
        underscored: true,

        //make it so model name stays lowercase in db
        modelName: 'user'
    }
);
module.exports = User;