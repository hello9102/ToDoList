<template>
  <div>
    <todo-form @addTodo="addTodo"></todo-form>
    <todo-list
      :todoList="todoList"
      @toggleTodo="toggleTodo"
      @removeTodo="removeTodo"
    ></todo-list>
  </div>
</template>

<script>
import TodoForm from "./TodoForm.vue";
import TodoList from "./TodoList.vue";

export default {
  name: "Todo2",
  components: {
    TodoForm,
    TodoList,
  },
  data() {
    return {
      todoList: [],
    };
  },
  methods: {
    addTodo(item) {
      this.todoList.push(item);
    },
    toggleTodo(id) {
      this.todoList = this.todoList.map((item) => {
        item.id === id && (item.completed = !item.completed);
        return item;
      });
    },
    removeTodo(id) {
      this.todoList = this.todoList.filter((item) => item.id !== id);
    },
  },
};
</script>

<style scoped></style>
