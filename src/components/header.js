import React from 'react';
import ReactDOM from 'react-dom';
import '../components/logo.less';
class Header extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="components-header">
                <div className="logo-wamper">
                    <img width="40" height="40" src="./assets/images/logo.png" className="-col-auto logo-img"/>
                    <h1 className="caption">React Music Player</h1>
                </div>
            </div>
        )
    }
}
export default Header;
