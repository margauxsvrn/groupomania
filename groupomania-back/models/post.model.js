module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
      user_id: {
        type: Sequelize.STRING
      },
      text_content: {
        type: Sequelize.STRING
      },
      publish_date: {
        type: Sequelize.NUMBER
      }
    });
  
    return Post;
  };