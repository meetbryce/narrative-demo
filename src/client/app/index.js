
import 'angular';
import 'angular-material';
import 'angular-ui-router';
import 'angularfire';
import 'ngstorage';

import './app.module';

import './_services/services.module';
import './_services/buyOrder.service';
import './_services/modal.service';

import './blocks/router/router.module';
import './blocks/router/router-helper.provider';

import './core/core.module';
import './core/config';
import './core/core.route';

import './dashboard/dashboard.module';
import './dashboard/dashboard.route';
import './dashboard/dashboard.component';
import './dashboard/components/buyOrderModal.controller';
import './dashboard/components/orderlist.component'

import './layout/layout.module';
import './layout/layout.route';
import './layout/components/header.component';
import './layout/components/footer.component';

window.firebase = require('firebase');
