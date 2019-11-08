import React, { Component } from 'react';

// 引入路由组件
// import { HashRouter, Route, Link, Redirect } from 'react-router-dom';
import './echarts.css'
import { Row, Col } from 'antd';
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
} from "bizcharts";


export default class Home extends Component {
    render() {
        const data = [
            {
                year: "一周",
                value: 3
            },
            {
                year: "二周",
                value: 4
            },
            {
                year: "三周",
                value: 3.5
            },
            {
                year: "四周",
                value: 5
            },
            {
                year: "五周",
                value: 8
            },
            {
                year: "六周",
                value: 10
            },
            {
                year: "七周",
                value: 12
            },
            {
                year: "八周",
                value: 13
            }
        ];
        const cols = {
            value: {
                min: 0
            },
            year: {
                range: [0, 1]
            }
        };
        return (
            <Col className='echartsWrap' xs={24} sm={12}>
                <Chart className="echarts" height={300} data={data} scale={cols} forceFit>
                    <Axis name="year" />
                    <Axis name="value" />
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom type="line" position="year*value" size={2} shape={"smooth"} />
                </Chart>
            </Col>
        )
    }
}
