module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
      text_content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      userId : {
        type: Sequelize.INTEGER,
        references: { model: 'users', // name of Target model 
        key: 'id', // key in Target model that we're referencing 
      }, 
      onUpdate: 'CASCADE', 
      onDelete: 'CASCADE',
      }
    });

    return Post;
  };