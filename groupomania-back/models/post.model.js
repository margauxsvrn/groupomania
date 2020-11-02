module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
      user_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      text_content: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    });
  
    return Post;
  };