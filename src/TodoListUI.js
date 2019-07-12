import React, { Component } from 'react';
import { Input, Button, List } from 'antd';

class TodoListUI extends Component {
    render() {
        return (
            <div style={{ margin: '20px' }}>
                <div>
                    <Input
                        placeholder={this.props.inputValue}
                        style={{ width: '250px', marginRight: '10px' }}
                        onChange={this.props.changeInputValue}
                        value={this.props.inputValue}
                    />
                    <Button
                        type="primary"
                        onClick={this.props.addItem}
                    >增加</Button>
                </div>
                <div style={{ marginTop: "10px", width: '325px' }}>
                    <List
                        bordered
                        dataSource={this.props.list}
                        renderItem={(item) => (<List.Item>{item}<Button onClick={(index)=>{this.props.deleteItem(index)}} size="small" type="danger" style={{ float: 'right' }}>删除</Button></List.Item>)}
                    ></List>
                </div>
            </div>
        );
    }
}

export default TodoListUI;