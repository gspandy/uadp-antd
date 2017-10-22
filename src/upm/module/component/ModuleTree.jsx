/**
 * Created by wangjz on 2016/10/31.
 */
import React from 'react'
import {connect} from 'uadp-react';
import {Tree} from 'antd';
const TreeNode = Tree.TreeNode;

function ModuleTree({dispatch, onSort, onSelect, treeData, selectKey, expandedKeys}) {
	function onDrop(info) {
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
		const data = treeData;
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

		dispatch({type: 'sort', params: {
			treeData: data,
			dragNode: {
				dragKey: dragKey,
				dropKey: dropKey,
				isContain: info.dropToGap ? false : true,
				isBeforeDropNode: dropPosition == -1 ? true : false
			}
		}});
	}

	expandedKeys.splice(0, expandedKeys.length);  //清空数组

	const loop = function (data) {
		return data.map((item) => {
			if (!item.isLeaf) {
				expandedKeys.push('' + item.key);
			}
			if (item.children && item.children.length) {
				return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
			}

			return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf}/>;
		});
	}

	const treeNodes = loop(treeData);
	return (
		<Tree draggable
			  onDrop={onDrop}
			  defaultSelectedKeys={[selectKey]}
			  defaultExpandedKeys={expandedKeys}
			  defaultExpandAll={true}
			  onSelect={(selectKeys) => dispatch({
				  type: 'selectTree',
				  params: {selectKey: selectKeys[0]}
			  })}>
			{treeNodes}
		</Tree>
	);
}
function mapStateToProps(state) {
	return {
		treeData: state.moduleTreeProps.treeData,
		selectKey: state.moduleTreeProps.selectKey,
		expandedKeys: state.moduleTreeProps.expandedKeys
	};
}

export default connect(mapStateToProps)(ModuleTree);