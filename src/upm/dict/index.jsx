import CfgModel from './model/DictModel';
import {stateContainer} from 'uadp-react';
import Root from './component/Root';

let app = new stateContainer();

app.model(CfgModel);

app.ready(function (dispatch) {
	dispatch({type: 'listDict'});
});

app.start(Root, 'root');