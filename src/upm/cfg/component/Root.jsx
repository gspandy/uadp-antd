import React from 'react';
import {connect} from 'uadp-react';
import {Button, Table, Input, Layout} from 'antd';
import SysModal from './CfgModal';
import '../../../themes/index.less';
const {Header, Content} = Layout;
const Search = Input.Search;

function Root({dispatch, cfgPagination, cfgModalProps}) {
	function onOK(isAdd, values) {
		if (isAdd) {
			dispatch({type: 'addCfg', params: values});
		} else {
			dispatch({type: 'updateCfg', params: values});
		}
	}

	let columns = [
		{title: '参数名称', dataIndex: 'name', key: 'name', width: 250},
		{title: '参数键', dataIndex: 'key', key: 'key', width: 350},
		{title: '参数值', dataIndex: 'value', key: 'value', width: 200},
		{title: '参数选项', dataIndex: 'options', key: 'options', width: 350},
		{title: '备注', dataIndex: 'remark', key: 'remark', width: 350}, {
			title: '操作', width: 100, render: function (text, record, index) {
				let disabled = record.fixed ? 'disabled' : null;
				return (<span>
              <Button title='修改' onClick={e => dispatch({
				  type: 'openCfgModal',
				  params: {isNew: false, visible: true, editData: record}
			  })} size={'small'} type="ghost" shape="circle"
					  icon="edit" disabled={disabled} style={{marginRight: 2}}/>
            <Button title='删除' onClick={e => dispatch({type: 'deleteCfg', params: record})} size={'small'} type="ghost"
					shape="circle"
					icon="close" disabled={disabled}/>
            </span>);
			}.bind(this)
		}];
	let pagination = {
		showSizeChanger: true,
		pageSize: cfgPagination.pageSize,
		current: cfgPagination.pageNo,
		total: cfgPagination.total,
		pageSizeOptions: ['10', '20', '50', '100'],
		onChange: function (page, pageSize) {
			dispatch({type: 'changePage', params: {pageNo: page, pageSize: pageSize}});
		},
		onShowSizeChange(current, size) {
			dispatch({type: 'changePage', params: {pageNo: current, pageSize: size}});
		}
	};

	return (
		<Layout style={{height: '100%', background: '#fff'}}>
			<Header style={{
				height: '40px',
				lineHeight: '40px',
				background: '#fff',
				padding: '1px 5px',
				borderBottom: '1px solid #e9e9e9'
			}}>
				<Button type='primary' icon="plus"
						onClick={() => dispatch({
							type: 'openCfgModal',
							params: {editData: {}, isNew: true, visible: true}
						})}>新增</Button>
				<div style={{float: 'right', paddingBottom: 3, paddingRight: 10}}>
					<Search placeholder="参数名称/参数键" style={{width: 200}}
							onSearch={(name) => dispatch({type: 'searchCfg', params: {value: name}})}/>
				</div>
			</Header>
			<Content style={{overflow: 'auto'}}>
				<Table rowKey="key" size={'middle'} bordered={true} dataSource={cfgPagination.rows} columns={columns}
					   pagination={pagination}></Table>
				<SysModal {...cfgModalProps} onOk={onOK} onClose={() => dispatch({type: 'closeCfgModal'})}/>
			</Content>
		</Layout>
	);
}

function mapStateToProps(state) {
	return {
		cfgModalProps: state.cfgModalProps,
		cfgPagination: state.cfgPagination,
	};
}

export default connect(mapStateToProps)(Root);
