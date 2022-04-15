<template>
  <div class="min-h-screen bg-black text-white">
    <div class="max-w-screen-lg mx-auto py-20 px-10 space-y-6 md:space-y-10">
      <router-link to="/" class="btn">&lt; Back</router-link>
      <h1 class="text-3xl md:text-5xl font-bold">
        {{ recipe.title }}
      </h1>
      <p class="font-light text-gray-300">{{ recipe.description }}</p>
      <hr />
      <div class="bg-[#081634] p-5 rounded-lg">
        <h3 class="text-2xl font-medium mb-3">Ingredients</h3>
        <div
          v-if="recipe.ingredients.length == 0"
          class="text-gray-300 text-sm font-light ml-5"
        >
          No Ingredients Available
        </div>
        <ul v-else class="ml-4 space-y-2">
          <li v-for="(ingredient, i) in recipe.ingredients" :key="i">
            ▻ {{ ingredient }}
          </li>
        </ul>
      </div>
      <hr />
      <div class="bg-[#081634] p-5 rounded-lg">
        <h3 class="text-2xl font-medium mb-3">Methods</h3>
        <div
          v-if="recipe.methods.length == 0"
          class="text-gray-300 text-sm font-light ml-5"
        >
          No Methods Available
        </div>
        <ul v-else class="ml-4 space-y-2">
          <li v-for="(step, i) in recipe.methods" :key="i">
            <span v-html="cleanText(step)"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    recipe() {
      return this.$store.state.recipes.find(
        (recipe) => recipe.slug == this.$route.params.slug
      );
    },
  },
  methods: {
    cleanText(text) {
      return "▻ " + text.replace(/\n/g, "<br/>");
    },
  },
};
</script>
