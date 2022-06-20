import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import TagManager from 'react-gtm-module';
import FullStory from 'react-fullstory';
import mixpanel from 'mixpanel-browser';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import store from './redux/store/configureStore';
import history from './history';
import App from './screens/App';
import * as serviceWorker from './serviceWorker';
import theme from './themes';

const tagManagerArgs = {
  gtmId: '*********'
};

TagManager.initialize(tagManagerArgs);

const ORG_ID = '*******';

mixpanel.init('*******');

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <App />
        <FullStory org={ORG_ID} />
      </MuiThemeProvider>
    </Provider>
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();
