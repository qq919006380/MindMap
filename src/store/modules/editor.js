
let state = {
    editItems: [],
    curEditData: {},
    todos: [
        { id: 1, text: '...', done: true },
        { id: 2, text: '...', done: false }
    ],


}
let mutations = {
    increment(state, payload) {
        state.count = payload.amount
    },

    setCurEditData(state, { data }) {
        console.log('data', data)
        Object.assign(state.curEditData, data)
    },
}
let getters = {
    doneTodos: (state) => {
        return state.todos.filter(todo => todo.done)
    },
}



export default {
    namespaced: true,
    state,
    getters,
    mutations
}
