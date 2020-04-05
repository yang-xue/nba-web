import React, {Component} from 'react';

import { Radio, Row, Col, Switch } from 'antd';
import _ from 'lodash';

import ShotChart from './ShotChart';
import CounterSlider from './CounterSlider';

class DataViewContainer extends Component {
    state = {
        minCount: 2,
        chartType: "hexbin",
        displayTooltip: true
    }

    onCountSliderChange = (count) => {
        this.setState({ minCount: count });
    }

    onChartTypeChange = e => {
        // console.log('radio checked', e.target.value);
        this.setState({
            chartType: e.target.value,
        });
    }

    onTooltipChange = checked => {
        this.setState({ displayTooltip: checked })
    }

    render() {
        return (
            <div className="data-view">
                <ShotChart playerId={ this.props.playerId }
                           minCount={ this.state.minCount }
                           chartType={ this.state.chartType }
                           displayTooltip={ this.state.displayTooltip }
                />
                <div className="filters">
                    <CounterSlider onCountSliderChange={ _.debounce(this.onCountSliderChange, 500) }
                                   value={ this.state.minCount }
                    />
                    <Row>
                        <Col span={9}>
                            <Radio.Group onChange={ this.onChartTypeChange }
                                         value={ this.state.chartType }>
                                <Radio value="hexbin">Hexbin</Radio>
                                <Radio value="scatter">Scatter</Radio>
                            </Radio.Group>
                        </Col>
                        <Col span={4}>
                            <Switch checkedChildren="On"
                                    unCheckedChildren="Off"
                                    defaultChecked
                                    onChange={ this.onTooltipChange }
                            />
                        </Col>
                    </Row>
                </div>

            </div>
        );
    }
}

export default DataViewContainer;