import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux';

function reducer(state={},action){
    return action;
}
let store=createStore(reducer)

class Test extends React.Component{
    constructor(props){
        super(props);
        this.state={
            msg: 'start'
        }
    }
    componentDidUpdate() {
        console.log('Child_2_1 update', store.getState());
    }
    componentDidMount(){
        console.log(store,store.getState());
        store.subscribe(() => {
            let state = store.getState();
            if (state.type === 'child_2_1') {
                this.setState({
                    msg: state.data
                });
            }
        });
    }
    render(){
        return (
            <div>i am come from test1!</div>
        )
    }
}
export default Test;