import React, { Component } from 'react';
import '../style/App.css';

// 引入路由组件
import Header from '../components/header'
import Footer from '../view/footer/footer'
import { Layout } from 'antd';


// 保存一个全局变量 区分两条数据链
class App extends Component {
  render() {
    return (
      <div className="App" >
        <Layout>
          <Header />
          <Footer />
        </Layout>
      </div>
    )
  }
}


export default App;
