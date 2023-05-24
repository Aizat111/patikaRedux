import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
 

export const getToDoAsync = createAsyncThunk('todos/getToDosAsync',async()=>{
  const res = await fetch('http://localhost:7000/todos');
  return await res.json();
});
export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: 'all'
  },
  reducers: {
    addToDo: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare : ({title})=>{
        return{
          payload: {
            id: nanoid(),
            completed: false,
            title
          }
        }
      }
    },
    toggle: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find((item) => item?.id === id);
      item.completed = !item.completed;
    },
    destroy: (state, action) => {
        const id = action.payload;
        const filtered = state.items.filter((item) =>  item?.id !== id);
        state.items= filtered;
    },
    changeActiveFilter : (state, action ) =>{
        state.activeFilter = action.payload
    },
    clearCompleted : (state) =>{
        const filtered = state.items.filter(item => item.completed == false)
        state.items= filtered
    }
  },
  extraReducers : {
    [getToDoAsync.pending]:(state,action) =>{
      state.isLoading = true;
    },
    [getToDoAsync.fulfilled]: (state, action) =>{
      state.items = action.payload;
      state.isLoading = false;
    },
    [getToDoAsync.rejected] : (state, action)=>{
      state.isLoading = false;
      state.error = action.error.message;
    }
  }
});

export const { addToDo, toggle, destroy , changeActiveFilter, clearCompleted} = todosSlice.actions;
export default todosSlice.reducer;
