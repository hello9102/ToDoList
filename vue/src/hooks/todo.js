import { ref } from "vue";
import { todoTypes } from "@/actionTypes";

export default function () {
  const todoList = ref([]);

  const setTodoList = (type, arg) => {
    switch (type) {
      case todoTypes.Add_TODO:
        todoList.value.push(arg);
        break;
      case todoTypes.TOGGLE_TODO:
        todoList.value = todoList.value.map((item) => {
          item.id === arg && (item.completed = !item.completed);
          return item;
        });
        break;
      case todoTypes.REMOVE_TODO:
        todoList.value = todoList.value.filter((item) => item.id !== arg);
        break;
      default:
        break;
    }
  };

  return [todoList, setTodoList];
}
