module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
      user_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      post_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      comment_content: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    });
  
    return Comment;
  };