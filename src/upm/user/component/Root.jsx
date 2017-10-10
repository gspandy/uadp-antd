/**
 * Created by wangjz on 2016/5/24.
 */
import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import {Layout, Panel, connect} from 'uadp-react';
import {Button, Table, Input} from 'antd';
import UserDialog from './UserDialog';
import ResetPasswordDialog from './ResetPasswordDialog';
import SetRoleDialog from './SetRoleDialog';
import OrgTree from '../../org/component/OrgTree';
import '../../../themes/index.less';
const Box = Layout.Box;
const Search = Input.Search;

function Root({dispatch, dataSource, pagination, loading}) {

  function onSelected(selectedOrgId) {
    this.setState({selectedOrgId:selectedOrgId});
    this.handleSearchClick({current:1,orgId:selectedOrgId})
  }
  function handleTableChange(pagination, filters, sorter) {
    this.handleSearchClick({pageSize:pagination.pageSize,current:pagination.current});
  }

  function handleSearchClick(name) {
    dispatch('searchUser', {
      //pageSize: pagination.pageSize,
      //current: pagination.current,
      name:name,
    });
  }

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        //this.selectedUsers = selectedRows;
      }
    };

    const columns = [

      {title: '登录帐号', dataIndex: 'loginName', key: 'loginName', width: 150},
      {title: '用户名称', dataIndex: 'name', key: 'name', width: 150},
      {title: '所属组织', dataIndex: 'toOrgName', key: 'toOrgName'},
      {title: '用户类型', dataIndex: 'typeName', key: 'typeName', width: 100},
      {title: '扩展码', dataIndex: 'extCode', key: 'extCode', width: 100},
      {title: '状态', dataIndex: 'status', key: 'status', width: 100, render: function(text, record, index) {
        if(record.status == 1) {
          return '正常';
        }else if(record.status == 2) {
          return '冻结';
        }else {
          return '注销';
        }
      }},
      {
        title: '操作', width: 150, render: function (text, record, index) {
          let disabled = (record.isFixed || record.isLocalRole) ? 'disabled' : null;
          return (<span>
              <Button title='修改' onClick={e=>dispatch({type: 'openUserModal', params: {isNew: false, editUser: record}})} size={'small'} type="ghost" shape="circle"
                      icon="edit" disabled={disabled} style={{marginRight:2}}/>
            <Button title='删除' onClick={e=>dispatch({type: 'deleteUser', params: {uids: record.uid}})} size={'small'} type="ghost" shape="circle"
                    icon="close" disabled={disabled} style={{marginRight:2}}/>
            <Button title='设置角色' onClick={e=>dispatch({type: 'openSetRoleModal', params: record})} size={'small'} type="ghost" shape="circle"
                    icon="setting" disabled={disabled} style={{marginRight:2}}/>
            <Button title='重置密码' onClick={e=>dispatch({type: 'openResetPasswordModal', params: record})} size={'small'} type="ghost" shape="circle"
                    icon="unlock" disabled={disabled}/>
            </span>);
        }.bind(this)
      }];

    let top = (<div>
      <Button type='primary' icon="plus" onClick={e=>dispatch({type: 'openUserModal', params: {isNew: true, editUser: {}}})} >新增</Button>
      <div style={{float: 'right', paddingBottom: 3}}>
        <Search placeholder="登录帐号/用户名称" style={{width: 200}} onSearch={name=>handleSearchClick(name)}/>
      </div>
    </div>);

    return (
      <Layout>
        <Box region="west" style={{width: 200}}>
          <Panel title="组织机构" fit={true} border={true}>
            <OrgTree/>
          </Panel>
        </Box>
        <Box region="center">
          <Panel fit={true} title={top} >
            <Table rowKey='uid' rowSelection={rowSelection} size={'middle'} bordered={true} dataSource={dataSource} columns={columns} loading={loading}
                   pagination={pagination} onChange={handleTableChange.bind(this)}>
            </Table>
            <UserDialog/>
            <ResetPasswordDialog/>
            <SetRoleDialog/>
          </Panel>
        </Box>
      </Layout>
    );
}

function mapStateToProps(state) {
  return {
    dataSource: state.dataSource,
    pagination: state.pagination,
    loading: state.loading
  };
}

export default connect(mapStateToProps)(Root);
