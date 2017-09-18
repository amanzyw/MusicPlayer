let nextId=0;
let addTodo=(text)=>{
    return {
        type:"ADD_TODO",
        id:nextId++,
        text
    }
}
let setVisiblity=(filter)=>{
    return {
        type:"SET_VISIBLITY_TODO",
        filter
    }
}
let toggle=(id)=>{
    return {
        type:"TOGGLE_TODO",
        id
    }
}

let result={addTodo,setVisiblity,toggle}
export default result;