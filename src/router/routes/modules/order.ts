import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const system: AppRouteModule = {
  path: '/order',
  name: 'Order',
  component: LAYOUT,
  redirect: '/order/ChangePassword2',
  meta: {
    orderNo: 300,
    icon: 'mdi:order-bool-ascending',
    title: t('routes.order.moduleName'),
  },
  children: [
    {
      path: 'changePassword2',
      name: 'ChangePassword2',
      meta: {
        title: t('routes.demo.system.password'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/demo/system/password/index.vue'),
    },
  ],
};

export default system;
