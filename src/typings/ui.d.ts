declare namespace UI {
  export type IconName = 'fullscreen' 
                       | 'fullscreen-exit' 
                       | 'sun' 
                       | 'moon' 
                       | 'book' 
                       | 'home' 
                       | 'wine' 
                       | 'person' 
                       | 'chart' 
                       | 'desktop' 
                       | 'logout' 
                       | 'change' 
                       | 'menu' 
                       | 'list' 
                       | 'setting' 
                       | 'people' 
                       | 'close' 
                       | 'dashboard'
                       | 'tree' 
                       | 'security' 
                       | 'verified-user' 
                       | 'users'
                       | 'money'
                       | 'colors'
                       | 'refresh'
                       ;


interface CustomMenuOption {      // 自定义菜单项 也作为 DropdownMenu 的选项
    key: string                   // 在 routes 中的 name
    label?: any                   // 一个函数，返回 router-link 或者 a 标签
    name?: string                 // 中文名
    order?: number
    icon?: any                    // 一个函数，返回 icon
    show?: boolean                // 在 menu / breadcrumb 中隐藏
    type?: 'divider'              // 分割线
    children?: CustomMenuOption[]
  }
}
