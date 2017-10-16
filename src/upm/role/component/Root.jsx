/**
 * Created by wangjz on 2016/5/24.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'uadp-react';
import {Button, Table, Tooltip, Layout} from 'antd';
import OrgTree from '../../org/component/OrgTree';
import ModuleModal from '../component/ModuleModal';
import RoleModal from '../component/RoleModal';
import '../../../themes/index.less';

const {Header, Footer, Sider, Content} = Layout;

function Root({dispatch, dataSource}) {
	let top = (<div>
		<Button type='primary' icon="plus"
				onClick={() => dispatch({type: 'openRoleModal', params: {isNew: true, editData: {}}})}>新增角色</Button>
	</div>);
	const columns = [
		{title: '组织机构', dataIndex: 'toOrgName', key: 'toOrgName', width: 200},
		{title: '角色名称', dataIndex: 'name', key: 'name', width: 200},
		{title: '角色代码', dataIndex: 'code', key: 'code', width: 200},
		{title: '角色描述', dataIndex: 'remark', key: 'remark', width: 200},
		{
			title: '是否全局', dataIndex: 'isGlobal', key: 'isGlobal', width: 100, render: function (text, record, index) {
			if (record.isGlobal == "1") {
				return "是";
			} else {
				return "否";
			}
		}
		},
		{
			title: '操作', width: 200, render: function (text, record, index) {
			let disabled = (record.isFixed || !record.isLocalRole) ? 'disabled' : null;
			return (<span>
            <Tooltip title="修改角色">
              <Button onClick={e => dispatch({type: 'openRoleModal', params: {isNew: false, editData: record}})}
					  size={'small'} type="ghost" shape="circle"
					  icon="edit" disabled={disabled} style={{marginRight: 5}}/>
            </Tooltip>
            <Tooltip title="删除角色">
              <Button onClick={e => dispatch({type: 'deleteRole', params: {roleId: record.id}})} size={'small'}
					  type="ghost" shape="circle"
					  icon="close" disabled={disabled} style={{marginRight: 5}}/>
            </Tooltip>
            <Tooltip title="设置功能模块">
              <Button onClick={e => dispatch({type: 'openModuleModal', params: {roleId: record.id, isSet: true}})}
					  size={'small'} type="ghost" shape="circle"
					  icon="setting" disabled={disabled} style={{marginRight: 5}}/>
            </Tooltip>
            <Tooltip title="查看功能模块">
              <Button onClick={e => dispatch({type: 'openModuleModal', params: {roleId: record.id, isSet: false}})}
					  size={'small'} type="ghost" shape="circle"
					  icon="bars"/>
            </Tooltip>
          </span>);
		}.bind(this)
		}];
	return (
		<Layout style={{height: '100%', background: '#fff'}}>
			<Sider style={{
				width: 200,
				height: '100%',
				background: '#fff',
				overflow: 'auto',
				borderRight: '1px solid #e9e9e9'
			}}>
				<OrgTree/>
			</Sider>
			<Content>
				<Table rowKey="id" size={'middle'} bordered={true} dataSource={dataSource} columns={columns}
					   pagination={false}></Table>
				<ModuleModal/><RoleModal/>
			</Content>
		</Layout>
	);
}

function mapStateToProps(state) {
	return {
		dataSource: state.dataSource
	}
}

export default connect(mapStateToProps)(Root);
