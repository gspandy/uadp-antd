/**
 * Created by wangjz on 2016/5/24.
 */
import React from 'react';
import {connect} from 'uadp-react';
import {Button, Table, Input, Layout} from 'antd';
import SysModal from './SysModal';
import '../../../themes/index.less';

const {Header, Content} = Layout;
const Search = Input.Search;

function Root({dispatch, sysList, sysModalProps}) {
	function onOK(isAdd, values) {
		if (isAdd) {
			dispatch({type: 'addSys', params: values});
		} else {
			dispatch({type: 'editSys', params: values});
		}
	}

	let columns = [
		{title: '系统标识', dataIndex: 'id', key: 'id', width: 250},
		{title: '系统名称', dataIndex: 'name', key: 'name', width: 350},
		{title: '前缀路径', dataIndex: 'prefixUrl', key: 'prefixUrl', width: 200},
		{title: '系统描述', dataIndex: 'remark', key: 'remark', width: 350},
		{
			title: '是否模拟登陆',
			dataIndex: 'isCheckedLogin',
			key: 'isCheckedLogin',
			width: 350,
			render: function (text, record, index) {
				return record.isCheckedLogin ? "是" : "否";
			}
		}, {
			title: '操作', width: 100, render: function (text, record, index) {
				let disabled = record.isFixed ? 'disabled' : null;
				return (<span>
              <Button title='修改' onClick={e => dispatch({
				  type: 'openSysModal',
				  params: {isNew: false, visible: true, editData: record}
			  })} size={'small'} type="ghost" shape="circle"
					  icon="edit" disabled={disabled} style={{marginRight: 2}}/>
            <Button title='删除' onClick={e => dispatch({type: 'deleteSys', params: record})} size={'small'} type="ghost"
					shape="circle"
					icon="close" disabled={disabled}/>
            </span>);
			}.bind(this)
		}];

	return (
		<Layout style={{height: '100%', background: '#fff'}}>
			<Header style={{
				height: '40px',
				lineHeight: '40px',
				background: '#fff',
				padding: '1px 10px',
				borderBottom: '1px solid #e9e9e9'
			}}>
				<Button type='primary' icon="plus" onClick={() => dispatch({
					type: 'openSysModal',
					params: {editData: {}, isNew: true, visible: true}
				})}>新增</Button>
				<div style={{float: 'right', paddingBottom: 3, paddingRight: 10}}>
					<Search placeholder="系统名称" style={{width: 200}}
							onSearch={(name) => dispatch({type: 'querySys', params: {name: name}})}/>
				</div>
			</Header>
			<Content style={{overflow: 'auto'}}>
				<Table rowKey="id" size={'middle'} bordered={true} dataSource={sysList} columns={columns}
					   pagination={false}></Table>
				<SysModal {...sysModalProps} onOk={onOK} onClose={() => dispatch({type: 'closeSysModal'})}/>
			</Content>
		</Layout>
	);
}

function mapStateToProps(state) {
	return {
		sysModalProps: state.sysModalProps,
		sysList: state.sysList,
	};
}

export default connect(mapStateToProps)(Root);
