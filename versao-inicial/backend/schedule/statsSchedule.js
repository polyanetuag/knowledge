const schedule = require("node-schedule");

module.exports = (app) => {
  schedule.scheduleJob("*/1 * * * *", async function () {
    const usersCount = await app.db("users").count("id").first();
    const categoriesCount = await app.db("categories").count("id").first();
    const articlesCount = await app.db("articles").count("id").first();

    const { Stat } = app.api.Stat;

    const lasStat = await Stat.findOne({}, {}, { sort: { createdAt: -1 } });

    const stat = newStat({
      users: usersCount.count,
      categories: categoriesCount.count,
      articles: articlesCount.count,
      createdAt: new Date(),
    });

    //verificando as estatísticas
    const changeUsers = !lasStat || stat.users !== lasStat.users;
    const changeCategories = !lasStat || stat.categories !== lasStat.categories;
    const changeArticles = !lasStat || stat.articles !== lasStat.articles;

    if (changeUsers || changeCategories || changeArticles) {
      stat.save().then(() => console.log("[Stats] Estatísticas atualizadas!"));
    }
  });
};
