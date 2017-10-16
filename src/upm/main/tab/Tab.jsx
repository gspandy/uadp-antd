/**
 * Created by wangjz on 2016/5/24.
 */
import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import {Menu, Icon, Tooltip, Dropdown, Modal, message, Layout} from 'antd';
import Iframe from './component/Iframe'
import ModifyPassword from '../component/ModifyPasswrod'
import * as MainAction from '../action/MainAction'

const SubMenu = Menu.SubMenu;
import './css/index.less';

const {Header, Footer, Sider, Content} = Layout;

export default class Tab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
			src: '',
			mode: 'inline',
			moduleTree: [],
			isTopMenu: true,
			defaultOpenKeys: [],
			defaultSelectedKeys: [],
			autoRunModules: [],
			modifyPwVisible: false,
			isForceModifyPassword: false
		};
	}

	componentWillMount() {
		MainAction.needtModifyPassword(this);
	}


	handleMenuClick(obj) {
		let moduleTree;
		let menu = this.props.userInfo.menu;
		for (let i = 0; i < menu.length; i++) {
			if (menu[i].id == obj.key) {
				moduleTree = menu[i].children;
				if (moduleTree == null) {
					if (menu[i].url == "") {
						message.success(menu[i].name + '功能未开通!', 3);
						return;
					}
					this.setState({src: menu[i].url, collapsed: true});
				}
				break;
			}
		}

		this.setState({moduleTree: moduleTree, collapsed: false});
	}

	modifyPwOk() {
		this.setState({modifyPwVisible: false, isForceModifyPassword: false});
	}

	modifyPwCancel() {
		if (this.state.isForceModifyPassword) {
			message.error('强制修改密码，不能取消！');
		} else {
			this.setState({modifyPwVisible: false});
		}
	}

	handleModuleClick(item, key, keyPath) {
		var clickItem;
		var loop = function (data) {
			for (let i = 0; i < data.length; i++) {
				if (data[i].id == item.key) {
					clickItem = data[i];
				}
				if (data[i].children != null) {
					loop(data[i].children);
				}
			}
		}
		let menu = this.props.userInfo.menu;
		loop(menu);
		if (clickItem.url == "") {
			message.success(clickItem.name + '功能未开通!', 3);
			return;
		}
		let tempUrl = '';
		if (clickItem.url.indexOf('?') == -1) {
			tempUrl = clickItem.url + '?' + Math.random();
		} else {
			tempUrl = clickItem.url + '&' + Math.random();
		}
		this.setState({src: tempUrl});
	}

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.userInfo.menu != null && nextProps.userInfo.menu.length > 0) {
			if (nextProps.userInfo.isTopMenu == 'true') {
				if (nextProps.userInfo.menu && nextProps.userInfo.menu.length > 0) {
					for (let i = 0; i < nextProps.userInfo.menu.length; i++) {
						if (nextProps.userInfo.menu[i].isAutorun == 1) {
							this.state.autoRunModules.push(nextProps.userInfo.menu[i]);
						}
					}
				}
				this.setState({isTopMenu: true, moduleTree: nextProps.userInfo.menu[0].children});
			} else {
				this.setState({isTopMenu: false, moduleTree: nextProps.userInfo.menu});
			}
		}
	}

	render() {
		const userInfo = this.props.userInfo;
		let that = this;

		const loop = function (data) {
			if (data == null) {
				that.state.collapsed = true;
				return
			}
			return data.map((item) => {
				if (item.children && item.children.length > 0) {
					if (that.state.defaultOpenKeys.length == 0) {
						that.state.defaultOpenKeys.push(item.id + "");
					}

					return <SubMenu key={item.id} className="leftMenu-background-color"
									title={<span>{item.icon == "" ? "" :
										<Icon type={item.icon}/>}{item.name}</span>}>{loop(item.children)}</SubMenu>;
				}
				/*if (that.state.defaultSelectedKeys.length == 0) {
				  that.state.defaultSelectedKeys.push(item.id+"");
				  that.state.src = item.url;
				}*/
				if (item.isAutorun == 1) {
					that.state.autoRunModules.push(item);
				}
				return <Menu.Item className="leftMenu-background-color" key={item.id}><span>{item.icon == "" ? "" :
					<Icon type={item.icon}/>}{item.name}</span></Menu.Item>;
			});
		}

		const moduleTree = loop(this.state.moduleTree);

		if (this.state.src == '' && this.state.autoRunModules.length > 0) {
			this.state.src = this.state.autoRunModules[0].url;
		}
		return (
			<Layout className="tabRoot">
				<Header style={{
					height: 60,
					paddingLeft: 10,
					paddingRight: 15,
					background: 'url(upm/main/tab/img/nav.png) repeat-x right top'
				}}>
					<div style={{
						float: 'left',
						marginRight: 5,
						background: 'url(upm/main/tab/img/nav_title.png) top center no-repeat'
					}}>
						{/*{userInfo.appTitle}*/} <img src="upm/main/tab/img/nav_title.png"></img>
					</div>
					<Icon
						style={{cursor: 'pointer', float: 'left', marginTop: 28, color: 'white', fontSize: 14}}
						type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
						onClick={this.toggle}
					/>
					<div style={{
						color: 'white',
						float: 'right',
						paddingTop: 5,
						paddingRight: 15,
						height: 57,
						lineHeight: '57px'
					}}>
						<span style={{marginRight: 5}}>{userInfo.userName == null ? '' : userInfo.userName}</span>
						<Tooltip title="修改密码">
							<a href="#" onClick={() => this.setState({modifyPwVisible: true})}>
								<Icon type="setting" style={{
									marginLeft: 2,
									fontSize: 18,
									color: 'white',
									verticalAlign: 'middle',
									marginBottom: 3,
									marginRight: 3
								}}/>
							</a>
						</Tooltip>

						<Tooltip title="退出系统">
							<a href="#" onClick={MainAction.logout.bind(this)}>
								<Icon type="logout" style={{
									fontSize: 18,
									marginLeft: 2,
									color: 'white',
									verticalAlign: 'middle',
									marginBottom: 3
								}}/>
							</a>
						</Tooltip>
						<ModifyPassword visible={this.state.modifyPwVisible} modifyPwOk={this.modifyPwOk.bind(this)}
										modifyPwCancel={this.modifyPwCancel.bind(this)}></ModifyPassword>
					</div>
					<div style={{float: 'right', marginTop: 10}}>
						<Icon type="user" className="img"/>
					</div>
					{this.state.isTopMenu == true ? <Menu onClick={this.handleMenuClick.bind(this)} style={{
						marginTop: 10,
						marginRight: 20,
						float: 'right',
						border: 0,
						background: 'none'
					}}
														  selectedKeys={[this.state.current]}
														  mode="horizontal">
						{userInfo.menu.map(function (item, index) {
							return <Menu.Item key={item.id} style={{fontSize: '14px', color: 'white'}}>
								<span>{item.icon == "" ? "" : <Icon type={item.icon}/>}{item.name}</span>
							</Menu.Item>;
						})}
					</Menu> : ''}

				</Header>
				<Layout>
					<Sider collapsible trigger={null} collapsedWidth={0}
						   collapsed={this.state.collapsed} className="overflow leftMenu-background-color"
						   style={{width: 210, borderRightWidth: 2, borderRight: '1px solid #bfbfbf'}}>
						<Menu onClick={this.handleModuleClick.bind(this)}
							  style={{width: 210, backgroundColor: '#e9e9e9'}}
							  defaultOpenKeys={this.state.defaultOpenKeys}
							  defaultSelectedKeys={this.state.defaultSelectedKeys} mode={this.state.mode}>
							{moduleTree}
						</Menu>
					</Sider>
					<Content style={{overflow: 'hidden'}}>
						<Iframe src={this.state.src}></Iframe>
					</Content>
				</Layout>
			</Layout>
		);

	}
}

