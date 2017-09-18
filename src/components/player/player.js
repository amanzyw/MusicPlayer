import React from 'react';
import ReactDom from 'react-dom';
import Progress1 from '../progress1.js';
import '../progress.less';
import SongQlist from '../SongQlist.js';
import '../songQlistcss.less';
import Pubsub from 'pubsub-js';

let duration=null;
let currentTime=null;
function getNextCurren(datas,cur){
    let result=null,maxLen=datas.length;
    datas.forEach(function(item,idx){
        if(cur==item){
            result=idx;
        }
    });
    result=(result==maxLen-1)?0:(result+1);
    return datas[result];
}

class Player extends React.Component{
    constructor(props){
        super(props);
        this.state={
            progress:"-",
            currentTime:"-",
            durationTime:"-",
            volume:0.8,
            dataSource:this.props.dataSource,
            currentItem:this.props.currentItem
        }
    }
    componentDidMount(){
        let that=this;
        $("#jplayer").on($.jPlayer.event.timeupdate,(e)=>{
            duration=e.jPlayer.status.duration;
            $("#jplayer").jPlayer("volume",that.state.volume);
            this.setState({
                progress:e.jPlayer.status.currentPercentAbsolute,
                currentTime:e.jPlayer.status.currentTime,
                durationTime:duration
            });
        });
        $("#jplayer").on($.jPlayer.event.ended,(e)=>{
            let nextItem=getNextCurren(that.state.dataSource,that.state.currentItem);
            console.log(nextItem);
            that.setState({
               currentItem:nextItem
            });
            $("#jplayer").jPlayer("setMedia",{
                mp3:nextItem["src"]
            }).jPlayer("play");
            Pubsub.publish("playend",nextItem);
            $("#jplayer").jPlayer("play");
        });

    }
    componentWillUnmount(){
        $("#jplayer").off($.jPlayer.event.timeupdate);
        $("#jplayer").off($.jPlayer.event.ended);
    }
    onSongChangeHandle(e,idx){
        $("#jplayer").jPlayer("setMedia",{
            mp3:this.state.dataSource[idx]["src"]
        }).jPlayer("play");
        this.setState({
           currentItem:this.state.dataSource[idx]
        });
    }
    onVolumeChange(ispaused,num){
        if(ispaused){
            $("#jplayer").jPlayer("mute",true);
        }else{
            $("#jplayer").jPlayer("mute",false);
            if(num!=undefined){
                $("#jplayer").jPlayer("volume",num);
                this.setState({
                    volume:num
                });
            }
        }
    }
    onProgressChangeHandle(percent){
        $("#jplayer").jPlayer("play",percent*duration);
        this.setState({
            progress:percent
        });
    }
    //播放暂停
    onPaseOrPlayChangeHandle(isPaused){
        if(isPaused){
            currentTime=duration*this.state.progress/100;
            $("#jplayer").jPlayer( "pause",currentTime);
        }else{
            $("#jplayer").jPlayer( "play",currentTime);
        }
    }
    render(){
        let currentItem=this.state.currentItem;
        let dataSource=this.state.dataSource;
        let progress=this.state.progress;
        let currentTime=this.state.currentTime;
        let durationTime=this.state.durationTime;
        let volume=this.state.volume;
        return (
            <div>
                <Progress1 progress={progress} currentTime={currentTime} durationTime={durationTime} volume={volume} onProgressChange={this.onProgressChangeHandle.bind(this)} pauseOrPlay={this.onPaseOrPlayChangeHandle.bind(this)} volumeChange={this.onVolumeChange.bind(this)}></Progress1>
                <SongQlist dataSource={dataSource} currentItem={currentItem} changeSongItem={this.onSongChangeHandle.bind(this)}></SongQlist>
            </div>
        )
    }
}
export default Player;