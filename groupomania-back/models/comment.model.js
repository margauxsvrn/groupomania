module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
      comment_content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      postId : {
        type: Sequelize.INTEGER,
        references: { model: 'posts', // name of Target model 
        key: 'id', // key in Target model that we're referencing 
      }, 
      onUpdate: 'CASCADE', 
      onDelete: 'CASCADE',
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
  
    return Comment;
  };