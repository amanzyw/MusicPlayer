import React from 'react';
import ReactDOM from 'react-dom';
import './songQlistcss.less';
import Pubsub from 'pubsub-js';
class SongQlist extends React.Component{
    constructor(props){
        super(props);
        this.state={
           currentItem:this.props.currentItem||this.props.dataSource[0],
           dataSource:this.props.dataSource
        }
    }
    componentDidMount(){
        let that=this;
        Pubsub.subscribe("playend",function(type,nextItem){
            that.setState({
                currentItem:nextItem
            });
        });
    }
    handleClick(e,idx){
        this.props.changeSongItem&&this.props.changeSongItem(e,idx);
        Pubsub.publish("songItem",idx);
        this.setState({
            currentItem:this.state.dataSource[idx]
        });
    }
    render(){
        let dataSource=[];
        let currentItem=this.state.currentItem;
        this.props.dataSource.forEach((item,idx)=>{
            dataSource.push(<li onClick={function(e){this.handleClick(e,idx)}.bind(this)} className={currentItem==item?"song-item active":"song-item"} key={idx}><div className="index"><div className="face-panel">{idx+1}</div></div><div className="wamper"><div className="song-name">{item.title}</div><div className="songer">{item.artist}</div></div></li>);
        });
        return (
            <div>
                <div className="song-list-component">
                    <ul className="song-wamp">
                        {dataSource}
                    </ul>
                </div>
            </div>
        )
    }
}
export default SongQlist;