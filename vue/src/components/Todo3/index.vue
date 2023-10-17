<template>
  <div>
    <todo-form @addTodo="setTodoList"></todo-form>
    <todo-list
      :todoList="todoList"
      @toggleTodo="setTodoList"
      @removeTodo="setTodoList"
    ></todo-list>
  </div>
</template>

<script>
import TodoForm from "./TodoForm.vue";
import TodoList from "./TodoList.vue";

import { todoHook } from "@/hooks";

export default {
  name: "Todo2",
  components: {
    TodoForm,
    TodoList,
  },
  setup() {
    const [todoList, setTodoList] = todoHook();

    return {
      todoList,
      setTodoList,
    };
  },
};
</script>

<style scoped></style>
