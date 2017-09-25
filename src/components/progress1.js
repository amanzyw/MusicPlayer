import React from 'react';
import ReactDOM from 'react-dom';
import './progress.less';
import Pubsub from 'pubsub-js';

function getFormatTime(time){
    var min=parseInt(time/60);
    var second=null;
    if(min<10){
        min="0"+min;
    }
    second=parseInt(time-min*60);
    if(second<10){
        second="0"+second;
    }
    return min+":"+second;
}

class Progress1 extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isVolumePause:false,
            isPaused:true
        }
    }
    onProgressChange(e){
        var progressBar=ReactDOM.findDOMNode(this.refs.progressbar);
        var barRect=progressBar.getBoundingClientRect();
        var width=barRect.width,
            left=barRect.left,
            currentLeft=e.clientX;
        var percent=(currentLeft-left)/width;
        this.props.onProgressChange&&this.props.onProgressChange(percent);
    }
    handlePaseOrPlay(){
        this.props.pauseOrPlay&&this.props.pauseOrPlay(!this.state.isPaused);
        this.setState({
            isPaused:!this.state.isPaused
        });
    }
    onVolumeChange(){
        this.props.volumeChange&&this.props.volumeChange(!this.state.isVolumePause);
        this.setState({
            isVolumePause:!this.state.isVolumePause
        });
    }
    onVolumeNumChange(e){
        var progressBar=ReactDOM.findDOMNode(this.refs.volumeProgressBar);
        var barRect=progressBar.getBoundingClientRect();
        var width=barRect.width,
            left=barRect.left,
            currentLeft=e.clientX;
        var percent=(currentLeft-left)/width;
        this.props.volumeChange&&this.props.volumeChange(false,percent);
    }
    onSongsChange(e,indexOffset){
        var currentItem=this.props.currentItem,
            dataSource=this.props.dataSource,
            index=null;
        dataSource.forEach(function(item,idx){
            if(item==currentItem){
                index=idx;
            }
        });
        if(indexOffset==1){
            index++;
            index=index>=dataSource.length?0:index;
        }
        if(indexOffset==-1){
            index--;
            index=index<0?dataSource.length-1:index;
        }
        console.log(index);
        this.props.changeSongItem&&this.props.changeSongItem(e,index);
    }
    componentDidMount(){
        let that=this;
        Pubsub.subscribe("songItem",function(type,idx){
            that.setState({
                isPaused:false
            });
        });
    }
    componentWillUnmount(){

    }
    render(){
        let isVolumePause=this.state.isVolumePause;
        let isPaused=this.state.isPaused;
        return (
            <div className="progress-panel-box">
                    <div className="icon-btn-group">
                <div className="progress-play-btn">
                        <div className="btn-prev btn" title="上一首" onClick={function(e){this.onSongsChange(e,-1)}.bind(this)}>
                        </div>
                        <div onClick={this.handlePaseOrPlay.bind(this)} className={isPaused?'btn-current btn-lg ispaused':'btn-current btn-lg'}></div>
                        <div className="btn-next btn" title="下一首" onClick={function(e){this.onSongsChange(e,1)}.bind(this)}></div>
                    </div>
                </div>
                <div className="progree-info">
                    <div className="current-time">{getFormatTime(this.props.currentTime)}</div>
                    <div ref="progressbar" className="components-progress" onClick={this.onProgressChange.bind(this)}>
                        <div className="components-inner" style={{width:`${this.props.progress}%`}}>
                            <div className="icon-bar"></div>
                        </div>
                    </div>
                    <div className="total-time">{getFormatTime(this.props.durationTime)}</div>
                </div>
                <div className="volume">
                    <div className="volume-icon" onClick={this.onVolumeChange.bind(this)}>
                        {
                            isVolumePause?<span className="auv auv-volume-mute"></span>:<span className="auv auv-volumehigh"></span>
                        }
                    </div>
                    <div ref="volumeProgressBar" className="volume-progress" onClick={this.onVolumeNumChange.bind(this)}>
                        <div  className="volume-inner" style={{width:`${this.props.volume*100}%`}} >
                            <div className="volume-bar"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Progress1;
