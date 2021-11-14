//  Primise Polyfill
require('es6-promise/auto');

import React from 'react';
import ReactDOM from 'react-dom';

import '../sass/app.scss';

// React + Typescript
import WizardForm from './Components/wizardForm';

if (document.getElementById('startpage-container')) {
    ReactDOM.render(<WizardForm />, document.getElementById('startpage-container'));
}
