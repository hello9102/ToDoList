<template>
  <div>
    <input
      type="text"
      placeholder="Please type something..."
      v-model="todoText"
    />
    <button @click="addTodo">ADD</button>
  </div>
</template>

<script>
import { ref } from "vue";
import { todoTypes } from "@/actionTypes";

export default {
  name: "TdodoForm",
  emits: ["addTodo"],
  setup(props, ctx) {
    const todoText = ref("");

    const addTodo = () => {
      ctx.emit("addTodo", todoTypes.Add_TODO, {
        id: new Date().getTime(),
        content: todoText.value,
        completed: false,
      });
    };

    return {
      todoText,
      addTodo,
    };
  },
};
</script>

<style scoped></style>
