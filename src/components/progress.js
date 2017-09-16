import React from 'react';
import {Carousel,Alert,Modal, Button,notification,Progress,Popconfirm,message} from 'antd';
let confirm= Modal.confirm;

const close = () => {
  console.log('Notification was closed. Either the close button was clicked or duration time elapsed.');
};
const text = 'Are you sure delete this task?';
class Progress1 extends React.Component{
    constructor(props){
        super(props);
    }
    showConfirm(){
        confirm({
            title: 'Do you want to delete these items?',
            content: 'When clicked the OK button, this dialog will be closed after 1 second',
            onOk() {
              return new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
              }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
        });
    }
    openNotification(){
        const key = `open${Date.now()}`;
        const btnClick = function () {
            // to hide notification box
            notification.close(key);
        };
        const btn = (
            <Button type="primary" size="small" onClick={btnClick}>
              Confirm
            </Button>
        );
        notification.open({
            message: 'Notification Title',
            description: 'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
            btn,
            key,
            onClose: close,
        });
    }
    confirm(){
        message.info('Click on Yes.');
    }
    render(){
        return (
            <div>
                <div>
                    <Alert message="Success Tips" type="success" showIcon />
                    <Alert message="Informational Notes" type="info" showIcon />
                    <Alert message="Warning" type="warning" showIcon />
                    <Alert message="Error" type="error" showIcon />
                    <Alert
                        message="success tips"
                        description="Detailed description and advices about successful copywriting."
                        type="success"
                        showIcon
                      />
                    <Alert
                        message="Informational Notes"
                        description="Additional description and informations about copywriting."
                        type="info"
                        showIcon
                      />
                    <Alert
                        message="Warning"
                        description="This is a warning notice about copywriting."
                        type="warning"
                        showIcon
                      />
                    <Alert
                        message="Error"
                        description="This is an error message about copywriting."
                        type="error"
                        showIcon
                      />
                </div>
                <div>
                    <Button onClick={this.showConfirm}>
                        Confirm
                    </Button>
                </div>
                <div>
                    <Button type="primary" onClick={this.openNotification}>Open the notification box</Button>
                </div>
                <div>
                    <Progress percent={30} />
                    <Progress percent={50} status="active" />
                    <Progress percent={70} status="exception" />
                    <Progress percent={100} />
                    <Progress percent={50} showInfo={false} />
                </div>
                <div>
                    <div style={{ marginLeft: 70, whiteSpace: 'nowrap' }}>
                        <Popconfirm placement="topLeft" title={text} onConfirm={this.confirm} okText="Yes" cancelText="No">
                          <Button>TL</Button>
                        </Popconfirm>
                        <Popconfirm placement="top" title={text} onConfirm={this.confirm} okText="Yes" cancelText="No">
                          <Button>Top</Button>
                        </Popconfirm>
                        <Popconfirm placement="topRight" title={text} onConfirm={this.confirm} okText="Yes" cancelText="No">
                          <Button>TR</Button>
                        </Popconfirm>
                      </div>
                      <div style={{ width: 70, float: 'left' }}>
                        <Popconfirm placement="leftTop" title={text} onConfirm={this.confirm} okText="Yes" cancelText="No">
                          <Button>LT</Button>
                        </Popconfirm>
                        <Popconfirm placement="left" title={text} onConfirm={this.confirm} okText="Yes" cancelText="No">
                          <Button>Left</Button>
                        </Popconfirm>
                        <Popconfirm placement="leftBottom" title={text} onConfirm={this.confirm} okText="Yes" cancelText="No">
                          <Button>LB</Button>
                        </Popconfirm>
                      </div>
                      <div style={{ width: 70, marginLeft: 304 }}>
                        <Popconfirm placement="rightTop" title={text} onConfirm={this.confirm} okText="Yes" cancelText="No">
                          <Button>RT</Button>
                        </Popconfirm>
                        <Popconfirm placement="right" title={text} onConfirm={this.confirm} okText="Yes" cancelText="No">
                          <Button>Right</Button>
                        </Popconfirm>
                        <Popconfirm placement="rightBottom" title={text} onConfirm={this.confirm} okText="Yes" cancelText="No">
                          <Button>RB</Button>
                        </Popconfirm>
                      </div>
                      <div style={{ marginLeft: 70, clear: 'both', whiteSpace: 'nowrap' }}>
                        <Popconfirm placement="bottomLeft" title={text} onConfirm={this.confirm} okText="Yes" cancelText="No">
                          <Button>BL</Button>
                        </Popconfirm>
                        <Popconfirm placement="bottom" title={text} onConfirm={this.confirm} okText="Yes" cancelText="No">
                          <Button>Bottom</Button>
                        </Popconfirm>
                        <Popconfirm placement="bottomRight" title={text} onConfirm={this.confirm} okText="Yes" cancelText="No">
                          <Button>BR</Button>
                        </Popconfirm>
                      </div>
                </div>
            </div>
        )
    }
}
export default Progress1;
