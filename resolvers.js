exports.resolvers = {
  Query: {
    getAllRecipes: async (root, args, { Recipe }) => {
      const allRecipes = await Recipe.find();
      return allRecipes;
    }
  },

  Mutation: {
    addRecipe: async (
      root,
      { name, description, category, intructions, username },
      { Recipe }
    ) => {
      const newRecipe = await new Recipe({
        name,
        description,
        category,
        intructions,
        username
      }).save();
      return newRecipe;
    }
  }
};
