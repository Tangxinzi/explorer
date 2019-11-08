import React, { Component } from 'react';


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            val: ''
        }
        console.log('')
    }
    componentWillMount() {
        console.log('组件(render)创建之前')
    }
    componentDidMount() {
        console.log('组件更新之后')
    }
    componentWillReceiveProps(props) {
        console.log('props更新后的数据:' + props)
    }
    shouldComponentUpdate(nextState, nextProps) {
        console.log('组件是否更新 默认为true')
        return true
    }
    componentWillUpdate() {
        console.log('组件更新之前')
    }
    componentDidUpdate() {
        console.log('组件更新之后')
    }


    handleChange = (e) => {
        this.setState({
            val: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
    }
    render() {
        return (
            <div className="App" >
                {/* 
                    defaultValue:静态内容
                    非受控表单控件:用户输入的内容我们不知道
                */}
                {/* <input type="text" defaultValue="请输入内容"/> */}
                <input type="text" value={this.state.val} onChange={this.handleChange} />
                <form onSubmit={this.handleSubmit}></form>
            </div>
        )
    }
}


export default App;
