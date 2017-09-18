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
            msg:"hello wrold!"
        }
    }
    componentDidMount(){
        setTimeout(() => {
            store.dispatch({
                type: 'child_2',
                data: 'hello'
            });
            console.log(store,store.getState());
        }, 1000);

        setTimeout(() => {
            store.dispatch({
                type: 'child_2_1',
                data: 'bye'
            });
            console.log(store,store.getState());
        }, 2000);

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
            <div>just Test {this.state.msg}!</div>
        )
    }
}
export default Test;