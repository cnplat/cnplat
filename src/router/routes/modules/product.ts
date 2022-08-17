import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const system: AppRouteModule = {
  path: '/product',
  name: 'Product',
  component: LAYOUT,
  redirect: '/product/list',
  meta: {
    orderNo: 200,
    icon: 'material-symbols:production-quantity-limits',
    title: t('routes.product.moduleName'),
  },
  children: [
    {
      path: 'list',
      name: 'AccountManagement2',
      meta: {
        title: t('routes.demo.system.account'),
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/demo/system/account/index.vue'),
    },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: t('routes.demo.system.role'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/demo/system/role/index.vue'),
    },

  ],
};

export default system;
