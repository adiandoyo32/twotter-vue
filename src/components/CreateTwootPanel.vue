<template>
  <form
    class="user-profile__create-twoot"
    @submit.prevent="createNewTwoot"
    :class="{ '--exceeded': characterCount > 180 }"
  >
    <label for="newTwoot">
      <strong>New Twoot</strong> ({{ characterCount }}/180)
    </label>
    <textarea id="newTwoot" rows="4" v-model="state.newTwootContent"></textarea>
    <div class="user-profile__create-twoot-type">
      <label for="newTwootType">
        <strong>Type: </strong>
      </label>
      <select id="newTwootType" v-model="state.selectedTwootType">
        <option
          :value="option.value"
          v-for="(option, index) in state.twootTypes"
          :key="index"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
    <button>Twoot!</button>
  </form>
</template>

<script>
import { reactive, computed } from "vue";

export default {
  name: "CreateTwootPanel",
  setup(props, ctx) {
    const state = reactive({
      newTwootContent: "",
      selectedTwootType: "instant",
      twootTypes: [
        { value: "draft", name: "Draft" },
        { value: "instant", name: "Instant" },
      ],
    });

    const newTwootCharCount = computed(() => state.newTwootContent.length);

    function createNewTwoot() {
      if (state.newTwootContent && state.selectedTwootType !== "draft") {
        ctx.emit("add-twoot", state.newTwootContent);
        state.newTwootContent = "";
      }
    }

    return {
      state,
      newTwootCharCount,
      createNewTwoot,
    };
  },
};
</script>

<style>
</style>