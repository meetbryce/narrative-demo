window.firebase = require('firebase');

import 'angular';
import 'angular-material';
import 'angular-ui-router';
import 'angularfire';

import './app.module';

import './blocks/router/router.module';
import './blocks/router/router-helper.provider';

import './core/core.module';
import './core/config';
import './core/core.route';

import './dashboard/dashboard.module';
import './dashboard/dashboard.route';
import './dashboard/dashboard.component';

import './layout/layout.module';
import './layout/layout.route';
import './layout/components/header.component';
import './layout/components/footer.component';
