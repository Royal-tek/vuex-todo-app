import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    todos : []
  },


  getters :{
    allTodos : (state)=>state.todos
  },


  mutations: {
    setTodos : (state, todos)=> (state.todos = todos),
    addTodo : (state, todo)=> state.todos.unshift(todo),
    removeTodo : (state, id)=> state.todos = state.todos.filter(todo=> todo.id !== id)
  },


  actions: {

    async fetchTodos({ commit }){
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
    commit('setTodos', response.data)
    },

    async addTodo({ commit }, title){
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {title, completed:false})
      commit('addTodo', response.data)
    },

    async removeTodo({commit}, id){
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      commit('removeTodo', id)
    }
  },


  modules: {
  }
})
