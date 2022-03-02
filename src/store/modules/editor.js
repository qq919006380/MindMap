
let state = {
    editItems: [],
    curEditData: {},//当前侧边栏回显的属性
    asideDrawerObj: {
        status: false,//是否打开右侧抽屉属性面板
        type: null,
    },
    canvasTarget:null,//当前画布选中的目标//线或节点
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
        Object.assign(state.curEditData, data)
    },
    setAsideDrawerObj(state, obj) {
        Object.assign(state.asideDrawerObj, obj)
        console.log(state)
    },
    setCanvasTarget(state,data){
        state.canvasTarget=data
    }
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
