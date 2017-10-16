import CfgModel from './model/CfgModel';
import {stateContainer} from 'uadp-react';
import Root from './component/Root';

let app = new stateContainer();

app.model(CfgModel);

app.ready(function (dispatch) {
	dispatch({type: 'listCfg'});
});

app.start(Root, 'root');