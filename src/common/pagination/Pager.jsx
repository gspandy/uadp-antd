/**
 * Created by haowl on 2017-02-18.
 */
import React, {Component, PropTypes} from 'react';
import {Button, Icon, Select, Form} from 'antd';

const Option = Select.Option;
export default class Pager extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {

	}

	previous() {
		this.props.previous();
	}

	next() {
		this.props.next();
	}

	onSelChange(value) {
		this.props.onSelChange(value)
	}


	render() {
		let that = this;
		//const { getFieldDecorator } = this.props.form;
		let options = this.props.pageSizeOptions != null && this.props.pageSizeOptions.length > 0 ?
			this.props.pageSizeOptions.map((m, index) => <Option key={m} value={m}>{m}</Option>)
			:
			"";
		return (
			<div style={{marginTop: '10px', marginBottom: '10px', textAlign: 'right'}}>
				<span style={{marginRight: 20}}>当前第 {this.props.current} 页</span>
				<span>每页显示 </span>

				<Select size='small' style={{width: 50}} onChange={this.onSelChange.bind(this)}
						value={this.props.pageSize}>
					{
						options
					}
				</Select>
				<span style={{marginRight: 20}}> 条</span>
				<Button.Group size='small'>
					<Button type="primary" onClick={e => this.previous()} disabled={this.props.previousDisabled}>
						<Icon type="left"/>上一页
					</Button>
					<Button type="primary" onClick={e => this.next()} disabled={this.props.nextDisabled}>
						下一页<Icon type="right"/>
					</Button>
				</Button.Group>
			</div>
		);
	}
}

