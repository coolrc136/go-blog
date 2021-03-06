// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings'; //import proxy from './proxy';

const baseurl = '/admin/';
export default defineConfig({
  outputPath:'dist'+baseurl,
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: false,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          // authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: '首页',
              icon: 'Dashboard',
              component: './DashBoard/Welcome',
            },
            {
              name: '文章列表',
              icon: 'UnorderedListOutlined',
              path: '/posts',
              component: './Posts',
            },
            {
              name: '新建文章',
              icon: 'EditOutlined',
              path: '/editor',
              component: './Editor',
            },
            {
              name: '友链',
              icon: 'Link',
              path: '/links',
              component: './Links',
            },
            {
              name: '关于',
              icon: 'InfoCircleOutlined',
              path: '/about',
              component: '@/pages/About',
            },
            {
              name: '设置',
              icon: 'setting',
              path: '/setting',
              component: './Setting',
            },
            // {
            //   name: '分析页',
            //   icon: 'smile',
            //   path: '/dashboardanalysis',
            //   component: './DashboardAnalysis',
            // },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  //proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: baseurl,
  },
  base: baseurl,
  publicPath: baseurl,
});
