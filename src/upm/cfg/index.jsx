import CfgModel from './model/CfgModel';
import {stateContainer} from 'uadp-react';
import Root from './component/Root';

let app = new stateContainer();

app.model(CfgModel);

app.ready(function(dispatch) {
  dispatch({type:'listCfg', params: {pageNo: 1, pageSize: 20}});
});

app.start(Root, 'root');