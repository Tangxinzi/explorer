import React, { Component } from 'react';
/* 
    节点页面
*/
import { Descriptions } from 'antd';
export default class Home extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            data: ''
        }
    }
    componentWillMount() {
        this.setState({
            data: this.props.data
        })
    }

    componentWillReceiveProps(props) {
        this.setState({
            data: props.data
        })
    }

    render() {
        var list = this.state.data.Transaction
        return (
            <Descriptions title="交易详情" column={1}>
                <Descriptions.Item label="交易ID">{list && list.TxId}</Descriptions.Item>
                <Descriptions.Item label="通道ID">{list && list.ChannelId}</Descriptions.Item>
                <Descriptions.Item label="区块高度">
                    <this.Link to={`/search/${window.location.pathname.split('/')[2]}/${list && list.Height}`}>{list && list.Height}</this.Link>
                </Descriptions.Item>
                <Descriptions.Item label="交易链码">{list && list.ChainCode}</Descriptions.Item>
                <Descriptions.Item label="交易方法">{list && list.Method}</Descriptions.Item>
                <Descriptions.Item label="交易状态">{list && (list.CreatedFlag && '完成')}</Descriptions.Item>
                <Descriptions.Item label="交易时间">{list && this.time(list.Timestamp)}</Descriptions.Item>
                {list && list.TxArgs.map((v, i) =>
                    <Descriptions.Item label={
                        (i === 0 && '交易源') ||
                        (i === 1 && `交易人`) ||
                        (i === 2 && `代币Key`) ||
                        (i === 3 && `交易数量`) ||
                        (i === 4 && `交易详情`)
                    }>{v}</Descriptions.Item>)}
            </Descriptions>
        )
    }
}