import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const about: AppRouteModule = {
  path: '/account',
  name: 'Account',
  component: LAYOUT,
  redirect: '/account/index',
  meta: {
    // hideChildrenInMenu: true,
    icon: 'ant-design:team-outlined',
    title: t('routes.account.moduleName'),
    orderNo: 100,
  },
  children: [
    {
      path: 'index',
      name: 'AccountIndex',
      component: () => import('/@/views/account/index.vue'),
      meta: {
        title: t('routes.account.index'),
        ignoreKeepAlive: false,
      },
    },
    {
      path: 'role',
      name: 'Role',
      component: () => import('/@/views/role/index.vue'),
      meta: {
        title: t('routes.account.role'),
        ignoreKeepAlive: false,
      },
    },
  ],
};

export default about;
