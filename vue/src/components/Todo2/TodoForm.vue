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
export default {
  name: "TdodoForm",
  data() {
    return {
      todoText: "",
    };
  },
  emits: ["addTodo"],
  methods: {
    addTodo() {
      this.$emit("addTodo", {
        id: new Date().getTime(),
        content: this.todoText,
        completed: false,
      });
    },
  },
};
</script>

<style scoped></style>
