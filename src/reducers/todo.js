import { createSlice } from "@reduxjs/toolkit";
import testdata from "./testdata";

const getCurrentDateTime = () => {
  let todayDate = new Date().toISOString();
  todayDate = todayDate.replace("T", " ");
  todayDate = todayDate.split(".");

  return todayDate[0];
};

export const toDo = createSlice({
  name: "toDo",
  initialState: {
    todoList: testdata,
    editId: "",
    getTodoData: {}
  },
  reducers: {
    addToDo: (state, action) => {
      const totalEle = state.todoList.length;
      const { newTitle, description } = action.payload;

      let newTodoList = {
        id: totalEle + 1,
        title: newTitle,
        description: description || "",
        createdDate: getCurrentDateTime(),
        isCompleted: false,
        isDeleted: false
      };
      state.todoList.push(newTodoList);
    },
    deleteToDo: (state, action) => {
      let { todoList } = state;
      state.todoList = todoList.filter((item) => item.id !== action.payload.id);
    },
    editToDo: (state, action) => {
      state.editId = action.payload.id;
    },
    updateToDo: (state, action) => {
      let { todoList } = state;
      let { id, title, description } = action.payload;
      // eslint-disable-next-line
      const getIndex = todoList.findIndex((item) => item.id == id);
      if (getIndex >= 0) {
        todoList[getIndex] = {
          ...todoList[getIndex],
          title,
          description
        };
        state.todoList = todoList;
        state.editId = "";
      }
    },
    changeStatus: (state, action) => {
      let { todoList } = state;
      let { id, isCompleted } = action.payload;
      // eslint-disable-next-line
      const getIndex = todoList.findIndex((item) => item.id == id);
      if (getIndex >= 0) {
        todoList[getIndex] = {
          ...todoList[getIndex],
          isCompleted,
          updatedDate: getCurrentDateTime()
        };
      }
      state.todoList = todoList;
    },
    getToDo: (state, action) => {
      let { todoList } = state;
      // eslint-disable-next-line
      state.getTodoData = todoList.find((item) => item.id == action.payload.id);
    }
  }
});

export const {
  addToDo,
  deleteToDo,
  editToDo,
  updateToDo,
  changeStatus,
  getToDo
} = toDo.actions;
export default toDo.reducer;
