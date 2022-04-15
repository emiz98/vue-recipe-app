import { createStore } from "vuex";

export default createStore({
  state: {
    recipes: [
      {
        slug: "best-instant-pot®-scalloped-potatoes",
        title: "Best Instant Pot® Scalloped Potatoes",
        description:
          "Scalloped potatoes are the ultimate side dish. Try this quick and easy version made in minutes in your Instant Pot®!",
        ingredients: [
          "2 pounds Yukon gold or red potato, cut into 1/4-inch slices",
          "1 cup vegetable broth",
          "½ teaspoon salt",
          "2 cups shredded sharp Cheddar cheese, divided",
          "3 tablespoons heavy cream",
          "½ teaspoon garlic powder",
          "¼ teaspoon ground black pepper",
          "¼ teaspoon nutmeg",
        ],
        methods: [
          "Set an oven rack about 6 inches from the heat source and preheat the oven's broiler.",
          "Combine potatoes, vegetable broth, and salt in a multi-functional pressure cooker (such as Instant Pot®). Close and lock the lid. Select high pressure according to manufacturer's instructions; set timer for 1 minute. Allow 10 to 15 minutes for pressure to build.",
          "Release pressure carefully using the quick-release method according to manufacturer's instructions, about 5 minutes. Unlock and remove the lid.",
          "Transfer potatoes carefully to an 8-inch square oven-safe deep dish. Combine 1 1/2 cups Cheddar cheese, cream, garlic powder, pepper, and nutmeg in the pressure cooker with the remaining liquid; select Saute function and cook until smooth and creamy, about 5 minutes. Pour sauce evenly over potatoes and sprinkle with remaining 1/2 cup Cheddar cheese.",
          "Broil in the preheated oven until golden, about 5 minutes.",
        ],
      },
      {
        slug: "spinach-and-strawberry-salad",
        title: "Spinach and Strawberry Salad",
        description:
          "My family loves this all year round if we can find strawberries. Even the grandchildren love this salad. Quick and easy.",
        ingredients: [
          "2 bunches spinach, rinsed and torn into bite-size pieces",
          "4 cups sliced strawberries",
          "½ cup vegetable oil",
          "¼ cup white wine vinegar",
          "½ cup white sugar",
          "¼ teaspoon paprika",
          "2 tablespoons sesame seeds",
          "1 tablespoon poppy seeds",
        ],
        methods: [
          "In a large bowl, toss together the spinach and strawberries.",
          "In a medium bowl, whisk together the oil, vinegar, sugar, paprika, sesame seeds, and poppy seeds. Pour over the spinach and strawberries, and toss to coat.",
        ],
      },
      {
        slug: "world's-best-lasagna",
        title: "World's Best Lasagna",
        description: "It takes a little work, but it is worth it.",
        ingredients: [
          "1 pound sweet Italian sausage",
          "¾ pound lean ground beef",
          "½ cup minced onion",
          "2 cloves garlic, crushed",
          "1 (28 ounce) can crushed tomatoes",
          "2 (6 ounce) cans tomato paste",
          "2 (6.5 ounce) cans canned tomato sauce",
          "½ cup water",
          "2 tablespoons white sugar",
          "1 ½ teaspoons dried basil leaves",
          "½ teaspoon fennel seeds",
          "1 teaspoon Italian seasoning",
          "1 ½ teaspoons salt, divided, or to taste",
          "¼ teaspoon ground black pepper",
          "4 tablespoons chopped fresh parsley",
          "12 lasagna noodles",
          "16 ounces ricotta cheese",
          "1 egg",
          "¾ pound mozzarella cheese, sliced",
          "¾ cup grated Parmesan cheese",
        ],
        methods: [
          "In a Dutch oven, cook sausage, ground beef, onion, and garlic over medium heat until well browned. Stir in crushed tomatoes, tomato paste, tomato sauce, and water. Season with sugar, basil, fennel seeds, Italian seasoning, 1 teaspoon salt, pepper, and 2 tablespoons parsley. Simmer, covered, for about 1 1/2 hours, stirring occasionally.",
          "Bring a large pot of lightly salted water to a boil. Cook lasagna noodles in boiling water for 8 to 10 minutes. Drain noodles, and rinse with cold water. In a mixing bowl, combine ricotta cheese with egg, remaining parsley, and 1/2 teaspoon salt.",
          "Preheat oven to 375 degrees F (190 degrees C).",
          "To assemble, spread 1 1/2 cups of meat sauce in the bottom of a 9x13-inch baking dish. Arrange 6 noodles lengthwise over meat sauce. Spread with one half of the ricotta cheese mixture. Top with a third of mozzarella cheese slices. Spoon 1 1/2 cups meat sauce over mozzarella, and sprinkle with 1/4 cup Parmesan cheese. Repeat layers, and top with remaining mozzarella and Parmesan cheese. Cover with foil: to prevent sticking, either spray foil with cooking spray, or make sure the foil does not touch the cheese.",
          "Bake in preheated oven for 25 minutes. Remove foil, and bake an additional 25 minutes. Cool for 15 minutes before serving.",
        ],
      },
    ],
  },
  getters: {},
  mutations: {
    ADD_RECIPE(state, recipe) {
      state.recipes.push(recipe);
    },
    DELETE_RECIPE(state, recipeId) {
      state.recipes.splice(recipeId, 1);
    },
    UPDATE_RECIPE(state, updateRecipe) {
      const recipe = state.recipes.find(
        (existingRecipe) => existingRecipe.slug == updateRecipe.slug
      );
      recipe.description = updateRecipe.description;
      recipe.ingredients = updateRecipe.ingredients;
      recipe.methods = updateRecipe.methods;
    },
  },
});
