<template>
  <div class="min-h-screen bg-black text-white">
    <div class="max-w-screen-lg !m-auto py-20 px-5 md:px-10">
      <div class="flex items-center justify-between mb-10">
        <h1 class="font-bold text-2xl md:text-4xl md:ml-5">My Recipes</h1>
        <button @click="togglePopup" class="btn">Add new recipe</button>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center"
      >
        <div
          v-for="(recipe, index) in $store.state.recipes"
          :key="index"
          class="card"
        >
          <h2 class="text-2xl font-medium">{{ recipe.title }}</h2>
          <p class="text-gray-300 font-light pb-3 flex-1">
            {{ recipe.description }}
          </p>
          <div class="flex items-center justify-between">
            <router-link :to="`/recipe/${recipe.slug}`">
              <button class="btn">View Recipe</button>
            </router-link>
            <div class="space-x-2 flex items-center">
              <button class="btnEdit rounded-full px-2">
                <img
                  @click="editRecipe(recipe.slug)"
                  class="w-5 h-5 invert"
                  src="../assets/edit.png"
                  alt="edit"
                />
              </button>
              <button
                @click="deleteRecipe(index)"
                class="btnSecondary rounded-full px-2"
              >
                <img
                  class="w-5 h-5 invert"
                  src="../assets/delete.png"
                  alt="edit"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="popupOpen"
        class="absolute top-0 left-0 right-0 bottom-0 h-screen w-full justify-center items-center overflow-hidden flex"
      >
        <div
          class="bg-[#06142b] p-5 md:p-10 rounded-lg max-w-screen-lg w-3/4 h-2/3 md:h-3/4 overflow-x-hidden overflow-y-scroll"
        >
          <h2 class="font-bold text-2xl mb-5">
            <span v-if="!isUpdate">Add new Recipe</span
            ><span v-else>Update Recipe</span>
          </h2>
          <form
            @submit.prevent="!isUpdate ? addNewRecipe() : updateRecipe()"
            class="space-y-6"
          >
            <div v-if="!isUpdate" class="flex-col flex space-y-3">
              <label class="font-medium text-lg">Title</label>
              <input v-model="newRecipe.title" type="text" class="inputClass" />
            </div>
            <div class="flex-col flex space-y-3">
              <label class="font-medium text-lg">Description</label>
              <textarea
                v-model="newRecipe.description"
                class="inputClass"
              ></textarea>
            </div>
            <div class="flex-col flex space-y-3">
              <label class="font-medium text-lg">Ingredients</label>
              <div
                v-for="i in newRecipe.ingredientRows"
                :key="i"
                class="gap-x-5 flex items-center"
              >
                <input
                  v-model="newRecipe.ingredients[i - 1]"
                  type="text"
                  class="inputClass"
                />
                <button
                  v-if="isUpdate"
                  @click.prevent="deleteIngredient(i - 1)"
                  class="btnSecondary rounded-full px-2"
                >
                  <img
                    class="w-5 h-5 invert"
                    src="../assets/delete.png"
                    alt="edit"
                  />
                </button>
              </div>
              <button
                @click="addNewIngredient"
                type="button"
                class="btn lg:w-1/4"
              >
                Add Ingredient
              </button>
            </div>
            <div class="flex-col flex space-y-3">
              <label class="font-medium text-lg">Method</label>
              <div
                v-for="j in newRecipe.methodRows"
                :key="j"
                class="flex items-center gap-x-5"
              >
                <textarea
                  v-model="newRecipe.methods[j - 1]"
                  class="inputClass"
                ></textarea>
                <button
                  v-if="isUpdate"
                  @click.prevent="deleteMethod(j - 1)"
                  class="btnSecondary rounded-full px-2"
                >
                  <img
                    class="w-5 h-5 invert"
                    src="../assets/delete.png"
                    alt="edit"
                  />
                </button>
              </div>
              <button @click="addNewStep" type="button" class="btn lg:w-1/4">
                Add Step
              </button>
            </div>

            <div class="flex items-center space-x-2 pt-5">
              <button type="submit" class="btn">
                <span v-if="!isUpdate">Add Recipe</span
                ><span v-else>Update Recipe</span>
              </button>
              <button @click="closeModal" type="button" class="btnSecondary">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "HomeView",
  setup() {
    const newRecipe = ref({
      title: "",
      description: "",
      ingredients: [],
      methods: [],
      ingredientRows: 1,
      methodRows: 1,
    });

    const popupOpen = ref(false);
    const isUpdate = ref(false);
    const store = useStore();

    const resetRecipe = () => {
      newRecipe.value = {
        title: "",
        description: "",
        ingredients: [],
        methods: [],
        ingredientRows: 1,
        methodRows: 1,
      };
    };
    const togglePopup = () => {
      popupOpen.value = !popupOpen.value;
    };
    const closeModal = () => {
      popupOpen.value = !popupOpen.value;
      isUpdate.value = false;
      resetRecipe();
    };

    const addNewIngredient = () => {
      newRecipe.value.ingredientRows++;
    };
    const addNewStep = () => {
      newRecipe.value.methodRows++;
    };

    const addNewRecipe = () => {
      newRecipe.value.slug = newRecipe.value.title
        .toLowerCase()
        .replace(/\s/g, "-");

      if (newRecipe.value.slug == "") {
        alert("Please enter a title");
        return;
      }

      store.commit("ADD_RECIPE", { ...newRecipe.value });
      resetRecipe();
      togglePopup();
    };

    const deleteRecipe = (recipeId) => {
      store.commit("DELETE_RECIPE", recipeId);
    };

    const editRecipe = (slug) => {
      const existingRecipe = store.state.recipes.find(
        (recipe) => recipe.slug === slug
      );
      newRecipe.value = {
        title: existingRecipe.title,
        description: existingRecipe.description,
        ingredients: existingRecipe.ingredients,
        methods: existingRecipe.methods,
        ingredientRows: existingRecipe.ingredients.length,
        methodRows: existingRecipe.methods.length,
      };
      isUpdate.value = true;
      togglePopup();
    };

    const updateRecipe = () => {
      newRecipe.value.slug = newRecipe.value.title
        .toLowerCase()
        .replace(/\s/g, "-");

      if (newRecipe.value.slug == "") {
        alert("Please enter a title");
        return;
      }

      store.commit("UPDATE_RECIPE", { ...newRecipe.value });
      resetRecipe();
      togglePopup();
      isUpdate.value = false;
    };

    const deleteIngredient = (i) => {
      newRecipe.value.ingredients.splice(i, 1);
      newRecipe.value.ingredientRows--;
    };
    const deleteMethod = (j) => {
      newRecipe.value.methods.splice(j, 1);
      newRecipe.value.methodRows--;
    };

    return {
      newRecipe,
      togglePopup,
      closeModal,
      popupOpen,
      isUpdate,
      addNewIngredient,
      addNewStep,
      addNewRecipe,
      deleteRecipe,
      editRecipe,
      updateRecipe,
      deleteIngredient,
      deleteMethod,
    };
  },
};
</script>
