/**
 * Created by wangjz on 2016/10/31.
 */
import React, {Component, PropTypes} from 'react'
import {Tree, Spin, Button, Table, Tabs, Card} from 'antd';
import * as action from '../action/ModuleTreeAction';

const TreeNode = Tree.TreeNode;
const gData = [];

export default class ModuleTree extends Component {
	constructor(props) {
		super(props);
		this.state = {treeData: []};
		this.expandedKeys = [];
		this.selectedKey = null;
		this.defaultSelectedKey = '0';
	}

	componentDidMount() {
		action.init.bind(this)();
	}

	getSelectedKey() {
		if (this.selectedKey == null) {
			return this.defaultSelectedKey;
		}
		return this.selectedKey;
	}

	refresh() {
		action.init.bind(this)();
	}

	onDrop(info) {
		console.log("onDrop", info);
		debugger
		const dropKey = info.node.props.eventKey;
		const dragKey = info.dragNode.props.eventKey;
		const dropPos = info.node.props.pos.split('-');
		const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
		// const dragNodesKeys = info.dragNodesKeys;
		const loop = (data, key, callback) => {
			data.forEach((item, index, arr) => {
				if (item.key === key) {
					return callback(item, index, arr);
				}
				if (item.children) {
					return loop(item.children, key, callback);
				}
			});
		};
		const data = this.state.treeData;
		let dragObj;
		loop(data, dragKey, (item, index, arr) => {
			arr.splice(index, 1);
			dragObj = item;
		});
		if (info.dropToGap) {
			let ar;
			let i;
			loop(data, dropKey, (item, index, arr) => {
				ar = arr;
				i = index;
			});
			if (dropPosition === -1) {
				ar.splice(i, 0, dragObj);
			} else {
				ar.splice(i + 1, 0, dragObj);
			}
		} else {
			loop(data, dropKey, (item) => {
				item.children = item.children || [];
				// where to insert 示例添加到尾部，可以是随意位置
				item.children.push(dragObj);
			});
		}
		this.setState({
			treeData: data
		});

		action.sort({
				dragKey: dragKey,
				dropKey: dropKey,
				isContain: info.dropToGap ? false : true,
				isBeforeDropNode: dropPosition == -1 ? true : false
			}
		);
	}

	onSelect(selectKeys) {
		this.selectedKey = selectKeys[0];
		if (this.props.onSelect) {
			this.props.onSelect(this.selectedKey);
		}
	}

	render() {
		const {onSelect} = this.props;
		let _that = this;
		_that.expandedKeys.splice(0, _that.expandedKeys.length);  //清空数组

		const loop = function (data) {
			return data.map((item) => {
				if (!item.isLeaf) {
					_that.expandedKeys.push('' + item.key);
				}
				if (item.children && item.children.length) {
					return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
				}

				return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf}/>;
			});
		}


		const treeNodes = loop(this.state.treeData);
		return (
			<Tree draggable
				  onDrop={this.onDrop.bind(this)}
				  defaultSelectedKeys={[this.defaultSelectedKey]}
				  defaultExpandedKeys={this.expandedKeys}
				  defaultExpandAll={true}
				  onSelect={this.onSelect.bind(this)}>
				{treeNodes}
			</Tree>
		);
	}
}
