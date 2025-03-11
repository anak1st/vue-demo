import type { Component } from 'vue';
import { h } from 'vue';
import { NIcon } from 'naive-ui';


import {
  FullscreenRound as FullscreenIcon,
  FullscreenExitRound as FullscreenExitIcon,
  WbSunnyRound as SunIcon,
  NightlightRound as MoonIcon,
  BookRound as BookIcon,
  HomeRound as HomeIcon,
  WineBarRound as WineIcon,
  PersonRound as PersonIcon,
  AreaChartRound as ChartIcon,
  DesktopWindowsRound as DesktopIcon,
  LogOutRound as LogoutIcon,
  ChangeCircleRound as ChangeIcon,
  MenuOpenRound as MenuIcon,
  ViewListRound as ListIcon,
  SettingsRound as SettingIcon,
  PeopleAltRound as PeopleIcon,
  CloseRound as CloseIcon,
  DashboardCustomizeRound as DashboardIcon,
  AccountTreeRound as TreeIcon,
  SecurityRound as SecurityIcon,
  VerifiedRound as VerifiedUserIcon,
  SupervisedUserCircleRound as UsersIcon,
  AttachMoneyRound as MoneyIcon,
  ColorLensRound as ColorsIcon,
  RefreshRound as RefreshIcon,
} from '@vicons/material';


export const IconMap : Record<UI.IconName, Component> = {
  'fullscreen': FullscreenIcon,
  'fullscreen-exit': FullscreenExitIcon,
  'sun': SunIcon,
  'moon': MoonIcon,
  'book': BookIcon,
  'home': HomeIcon,
  'wine': WineIcon,
  'person': PersonIcon,
  'chart': ChartIcon,
  'desktop': DesktopIcon,
  'logout': LogoutIcon,
  'change': ChangeIcon,
  'menu': MenuIcon,
  'list': ListIcon,
  'setting': SettingIcon,
  'people': PeopleIcon,
  'close': CloseIcon,
  'dashboard': DashboardIcon,
  'tree': TreeIcon,
  'security': SecurityIcon,
  'verified-user': VerifiedUserIcon,
  'users': UsersIcon,
  'money': MoneyIcon,
  'colors': ColorsIcon,
  'refresh': RefreshIcon,
}


export const renderIcon = (iconName: UI.IconName, args?: any) => {
  return () => h(NIcon, args, { default: () => h(IconMap[iconName]) })
}
