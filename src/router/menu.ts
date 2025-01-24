import type { Component } from 'vue';
import { h, } from 'vue';
import { type MenuOption } from 'naive-ui';
import { RouterLink } from 'vue-router';
import { renderIcon, HomeIcon, ChartIcon, DesktopIcon, PersonIcon, BookIcon } from '@/components/icons';


const renderLink = (route: string, title: string) => {
  return () =>
    h(
      RouterLink,
      { to: route },
      { default: () => title }
    ) 
}


const renderLinkOut = (route: string, title: string) => {
  return () =>
    h(
      'a',
      { href: route, target: '_blank', rel: 'noopenner noreferrer' },
      { default: () => title }
    ) 
}



export type MenuOptionItem = MenuOption & {
  icon?: Component
  name?: string
}


export const menuOptions: MenuOption[] = [
  {
    label: renderLink('/','首页'),
    name: '首页',
    key: 'Home',
    icon: renderIcon(HomeIcon)
  },
  {
    label: '图表',
    name: '图表',
    key: 'Charts',
    icon: renderIcon(ChartIcon),
    children: [
      {
        label: renderLink('/charts/system', '系统状态'),
        name: '系统状态',
        key: 'Charts-System',
        icon: renderIcon(DesktopIcon)
      } 
    ]
  },
  {
    label: renderLink('/profile', '个人信息'),
    name: '个人信息',
    key: 'Profile',
    icon: renderIcon(PersonIcon)
  },
  {
    key: 'Divider-1',
    type: 'divider',
  },
  {
    label: '文档',
    key: 'OutDocs',
    icon: renderIcon(BookIcon),
    children: [
      {
        label: renderLinkOut('https://vuejs.org/', 'Vue 文档'),
        key: 'OutDocs-Vue',
        icon: renderIcon(BookIcon)
      },
      {
        label: renderLinkOut('https://www.naiveui.com/', 'NaiveUI 文档'),
        key: 'OutDocs-NaiveUI', 
        icon: renderIcon(BookIcon)
      }
    ]
  }
]