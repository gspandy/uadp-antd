import React from 'react';
import {connect} from 'uadp-react';
import {Button, Table, Input, Layout, Icon, Checkbox} from 'antd';
import '../../../themes/index.less'
import '../less/index.less'
import ModuleTree from './ModuleTree';
import ModuleDialog from './ModuleDialog'

const {Header, Sider, Content} = Layout;
const Search = Input.Search;

function Root({dispatch, dataSource, moduleDialogProps, moduleTreeProps}) {
	function onOK(isAdd, values) {
		if (isAdd) {
			dispatch({type: 'addModule', params: values});
		} else {
			dispatch({type: 'updateModule', params: values});
		}
	}

	const columns = [
		{
			title: '模块名称[ID]', dataIndex: 'name', key: 'name', width: 250, render: function (text, record) {
			if (record.isLeaf) {
				return <span><Icon type="file" style={{marginRight: 3}}/>{text}[{record.id}]</span>
			}
			return <span><Icon type="folder-open" style={{marginRight: 3}}/>{text}</span>;
		}
		},
		{title: '请求路径', dataIndex: 'url', key: 'url', width: 350},
		{title: '图标', dataIndex: 'icon', key: 'icon', width: 200},
		{title: '模块描述', dataIndex: 'remark', key: 'remark', width: 350},
		{
			title: '操作', width: 100, render: function (text, record) {

			let disabled = record.isFixed ? 'disabled' : null;
			return (<span>
            <Button title='修改' onClick={e => dispatch({
				type: 'openModuleDialog',
				params: {isNew: false, visible: true, editData: record}
			})} size={'small'} type="ghost" shape="circle"
					icon="edit" disabled={disabled} style={{marginRight: 2}}/>
				&nbsp;&nbsp;
				<Button title='删除' onClick={() => dispatch({type: 'deleteModule', params: record})} size={'small'}
						type="ghost"
						shape="circle" icon="close" disabled={disabled}/>
          </span>);
		}.bind(this)
		}];

	return (
		<Layout style={{height: '100%', background: '#fff'}}>
			<Sider style={{
				width: 300,
				height: '100%',
				background: '#fff',
				overflow: 'auto',
				borderRight: '1px solid #e9e9e9'
			}}>
				<ModuleTree {...moduleTreeProps}/>
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
						<Button type='primary' icon="plus" onClick={() => dispatch({
							type: 'openModuleDialog',
							params: {editData: {}, isNew: true, visible: true}
						})}>新增</Button>
						<div style={{float: 'right', paddingBottom: 3}}>
							<Search
								placeholder="功能模块名称"
								style={{width: 200}}
								onSearch={(value) => dispatch({type: 'searchModule', params: {name: value}})}/>
						</div>
					</Header>
					<Content style={{overflow: 'auto'}}>
						<Table rowKey="id" size={'middle'} bordered={true} dataSource={dataSource} columns={columns}
							   pagination={false}></Table>
						<ModuleDialog {...moduleDialogProps} selectKey={moduleTreeProps.selectKey} onOk={onOK}
									  onClose={() => dispatch({type: 'closeModuleDialog'})}/>
					</Content>
				</Layout>
			</Content>
		</Layout>
	)
}

function mapStateToProps(state) {
	return {
		dataSource: state.dataSource,
		moduleDialogProps: state.moduleDialogProps,
		moduleTreeProps: state.moduleTreeProps,
	};
}

export default connect(mapStateToProps)(Root);
