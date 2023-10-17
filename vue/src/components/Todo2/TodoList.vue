<template>
  <ul>
    <li v-for="item of todoList" :key="item.id">
      <input
        type="checkbox"
        :checked="item.completed"
        @click="toggleTodo(item.id)"
      />
      <span :class="{ completed: item.completed }">{{ item.content }}</span>
      <button @click="removeTodo(item.id)">REMOVE</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "TodoList",
  props: {
    todoList: {
      type: Array,
      default() {
        return [];
      },
      validator(value) {
        return Object.prototype.toString.call(value) === "[object Array]";
      },
    },
  },
  emits: ["toggleTodo", "removeTodo"],
  methods: {
    toggleTodo(id) {
      this.$emit("toggleTodo", id);
    },
    removeTodo(id) {
      this.$emit("removeTodo", id);
    },
  },
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
