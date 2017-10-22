/**
 * Created by wangjz on 2016/11/12 .
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'uadp-react';
import {Button, Table, Checkbox, Input, Layout} from 'antd';
import {Panel} from 'uadp-react';
import '../../../themes/index.less';
import OrgTree from './OrgTree';
import OrgDialog from './OrgDialog';

const {Sider, Header, Content} = Layout;
const Search = Input.Search;

function Root({dispatch, dataSource}) {
	function onOk(isAdd, values) {
		if (isAdd) {
			dispatch({type: 'addOrg', params: values});
		} else {
			dispatch({type: 'editOrg', params: values});
		}
	}

	let columns = [
		{title: '机构简称', dataIndex: 'name', key: 'name', width: 250},
		{title: '机构代码', dataIndex: 'code', key: 'code', width: 200},
		{title: '机构描述', dataIndex: 'remark', key: 'remark', width: 350},
		{title: '机构类型', dataIndex: 'typeName', key: 'typeName', width: 350},
		{
			title: '操作', width: 100, render: function (text, record, index) {
			let disabled = record.isFixed ? 'disabled' : null;
			return (<span>
            <Button title='修改'
					onClick={() => dispatch({type: 'openOrgDialog', params: {isNew: false, editData: record}})}
					size={'small'} type="ghost" shape="circle" icon="edit" disabled={disabled}/>
				&nbsp;&nbsp;
				<Button title='删除' onClick={() => dispatch({type: 'deleteOrg', params: record})} size={'small'}
						type="ghost" shape="circle" icon="close" disabled={disabled}/>
          </span>);
		}.bind(this)
		}];


	let extra = (<Checkbox
		onChange={e => dispatch({type: 'onCascadeCheck', params: {cascade: e.target.checked}})}>级联显示</Checkbox>);
	return (
		<Layout style={{height: '100%', background: '#fff'}}>
			<Sider style={{width: 250, background: '#fff', overflow: 'auto', borderRight: '1px solid #e9e9e9'}}>
				<OrgTree/>
			</Sider>
			<Content>
				<Layout style={{height: '100%', background: '#fff'}}>
					<Header style={{
						height: '40px',
						lineHeight: '40px',
						background: '#fff',
						padding: '1px 10px',
						borderBottom: '1px solid #e9e9e9'
					}}>
						<div>
							<Button type='primary' icon="plus" onClick={() => dispatch({
								type: 'openOrgDialog',
								params: {isNew: true, editData: {}}
							})}>新增</Button>
							<div style={{float: 'right', paddingBottom: 3}}>
								<Search placeholder="机构名称" style={{width: 200}}
										onSearch={name => dispatch({type: 'queryOrgByName', params: {name: name}})}/>
							</div>
						</div>
					</Header>
					<Content style={{overflow: 'auto'}}>
						<Table rowKey="id" size={'middle'} bordered={true} dataSource={dataSource} columns={columns}
							   pagination={false}></Table>
						<OrgDialog/>
					</Content>
				</Layout>
			</Content>
		</Layout>
	);
}

function mapStateToProps(state) {
	return {
		dataSource: state.dataSource,
	};
}

export default connect(mapStateToProps)(Root);
