import React from 'react';
import {connect} from 'uadp-react';
import {Button, Table, Input, Layout} from 'antd';
import SysModal from './DictDialog';
import Constant from '../../../common/Constant';
import '../../../themes/index.less';
import '../less/index.less';
const {Header, Content} = Layout;
const Search = Input.Search;

function Root({dispatch, dictPagination, dictDialogProps}) {
	function onOK(isAdd, values) {
		if (isAdd) {
			dispatch({type: 'addDict', params: values});
		} else {
			dispatch({type: 'updateDict', params: values});
		}
	}

	let columns = [
		{title: '字典名称', dataIndex: 'name', key: 'name', width: 250},
		{title: '字典标识', dataIndex: 'key', key: 'key', width: 350},
		{title: '对照码', dataIndex: 'code', key: 'code', width: 200},
		{title: '对照值', dataIndex: 'value', key: 'value', width: 350},
		{title: '排序号', dataIndex: 'idx', key: 'idx', width: 80},
		{title: '是否启用', dataIndex: 'status', key: 'status', width: 100, render: (text, record, index) => record.status ? "启用" : "停用"},
		{title: '备注', dataIndex: 'remark', key: 'remark', width: 350},
		{title: '操作', width: 150, render: function (text, record, index) {
				let disabled = record.fixed ? 'disabled' : null;
				return (<span>
				  <Button title='修改'
					  onClick={e => dispatch({
						  type: 'openDictDialog',
						  params: {isNew: false, visible: true, editData: record}
					  })}
					  size={'small'}
					  type="ghost"
					  shape="circle"
					  icon="edit"
					  disabled={disabled}
					  style={{marginRight: 2}}/>
				<Button title='删除'
					onClick={e => dispatch({type: 'deleteDict', params: record})}
					size={'small'}
					type="ghost"
					shape="circle"
					icon="close"
					disabled={disabled}/>
				</span>);
			}.bind(this)
		}];

	let pagination = {
		showSizeChanger: true,
		pageSize: dictPagination.pageSize,
		current: dictPagination.pageNo,
		total: dictPagination.total,
		pageSizeOptions: Constant.pageSizeOptions,
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
							type: 'openDictDialog',
							params: {editData: {}, isNew: true, visible: true}
						})}>新增</Button>
				<div style={{float: 'right', paddingBottom: 3, paddingRight: 10}}>
					<Search placeholder="参数名称/参数键" style={{width: 200}}
							onSearch={(name) => dispatch({type: 'searchDict', params: {value: name}})}/>
				</div>
			</Header>
			<Content style={{overflow: 'auto'}}>
				<Table rowKey="id" size={'middle'} bordered={true} dataSource={dictPagination.rows} columns={columns} rowClassName={record=>record.status? '' : 'rowb'}
					   pagination={pagination}></Table>
				<SysModal {...dictDialogProps} onOk={onOK} onClose={() => dispatch({type: 'closeDictDialog'})}/>
			</Content>
		</Layout>
	);
}

function mapStateToProps(state) {
	return {
		dictDialogProps: state.dictDialogProps,
		dictPagination: state.dictPagination,
	};
}

export default connect(mapStateToProps)(Root);