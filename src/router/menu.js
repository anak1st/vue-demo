import { h } from 'vue'
import { RouterLink } from 'vue-router'
import { NIcon } from 'naive-ui'
import {
  BookOutlined as BookIcon,
  HomeOutlined as HomeIcon,
  WineBarFilled as WineIcon,
  PersonOutlined as PersonIcon,
  AreaChartOutlined as ChartIcon,
  DesktopWindowsOutlined as DesktopIcon,
} from '@vicons/material'


const renderIcon = (icon) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}


const renderLink = (route, title) => {
  return () =>
    h(
      RouterLink,
      { to: route },
      { default: () => title }
    ) 
}


const renderLinkOut = (route, title) => {
  return () =>
    h(
      'a',
      { href: route, target: '_blank', rel: 'noopenner noreferrer' },
      { default: () => title }
    ) 
}


export const menuOptions = [
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