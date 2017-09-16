import React from 'react';
import ReactDom from 'react-dom';
import Header from '../components/header.js';
import Player from '../components/player/player';

import DataSource from '../data/dataSource.js';



class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentItem:DataSource[0],
            dataSource:DataSource
        }
    }
    componentWillMount(){

    }
    componentDidMount(){
        $('#jplayer').jPlayer({
            ready:function(){
                /*$(this).jPlayer("setMedia",{
                    mp3:"./assets/music/1.mp3"
                }).jPlayer("play");*/
                $(this).jPlayer("setMedia",{
                    mp3:"./assets/music/1.mp3"
                });
            },
            supplied:"mp3",
            wmode:"window"
        });

    }

    render(){
        let progress=this.state.progress;
        return (
            <div>
                <Header/>
                <Player currentItem={this.state.currentItem} dataSource={this.state.dataSource}/>
            </div>
        )
    }
}

ReactDom.render(<App/>,document.getElementById("root"));
