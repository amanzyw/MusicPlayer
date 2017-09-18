const todo=(state,action)=>{
    switch(action.type){
        case "ADD_TODO":
        return {
            id:action.id,
            text:action.text,
            completed:false
        }
    }
}