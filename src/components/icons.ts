import type { Component } from 'vue'
import { h } from 'vue'
import { NIcon } from 'naive-ui'


export {
  FullscreenOutlined as FullscreenIcon,
  FullscreenExitOutlined as FullscreenExitIcon,
  WbSunnyOutlined as SunIcon,
  NightlightRound as MoonIcon,
  BookOutlined as BookIcon,
  HomeOutlined as HomeIcon,
  WineBarFilled as WineIcon,
  PersonOutlined as PersonIcon,
  AreaChartOutlined as ChartIcon,
  DesktopWindowsOutlined as DesktopIcon,
  LogOutOutlined as LogoutIcon,
  ChangeCircleOutlined as ChangeIcon,
  MenuOpenOutlined as MenuIcon,
} from '@vicons/material'


export const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}
