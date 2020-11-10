module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
      text_content: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      isReported: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },

      userId : {
        type: Sequelize.INTEGER,
        references: { model: 'users', // name of Target model 
        key: 'id', // key in Target model that we're referencing 
        allowNull: false
      }, 
      onUpdate: 'CASCADE', 
      onDelete: 'CASCADE',
      }
      
    });

    return Post;
  };

  