import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia';
import { h } from 'vue';
import { RouterLink } from 'vue-router';
import { routePathNameMap } from '@/router/routes';
import { renderIcon } from '@/components/icons';
// import type { MenuOption } from 'naive-ui';


const renderLink = (route: string, title: string) => {
  if (route.startsWith('http')) {
    return () =>
      h(
        'a',
        { href: route, target: '_blank', rel: 'noopenner noreferrer' },
        { default: () => title }
      )
  }

  return () =>
    h(RouterLink, { to: route }, () => title)
}


export function convertMenuToTree(menu: Api.Menu[]): Api.Menu[] {
  // deep copy
  menu = JSON.parse(JSON.stringify(menu));

  // move children to father
  const menuMap = new Map<string, Api.Menu>();
  menuMap.set('root', { key: 'root', order: -1, });
  menu.forEach((item) => { menuMap.set(item.key, item); });
  menu.forEach((item) => {
    const father = menuMap.get(item.father || 'root') || menuMap.get('root')!;
    if (!father.children) {
      father.children = [];
    }
    // deep copy
    father.children.push(item);
  });

  return menuMap.get('root')!.children!;
}


export function convertMenuToFlat(menu: Api.Menu[]): Api.Menu[] {
  // deep copy
  menu = JSON.parse(JSON.stringify(menu));

  // move children to father
  const menuList: Api.Menu[] = [];
  const dfs = (item: Api.Menu) => {
    if (item.children) {
      item.children.forEach((child) => {
        dfs(child);
      });
    }
    delete item.children;
    menuList.push(item);
  }
  menu.forEach((item) => {
    dfs(item);
  });

  menuList.sort((a, b) => (a.order || 0) - (b.order || 0));
  return menuList;
}


export const createMenuOptions = (menu: Api.Menu[]): UI.CustomMenuOption[] => {
  const createMenuOptionsFunc = (m: Api.Menu[]): UI.CustomMenuOption[] => {
    return m.map((item) => {
      if (item.type === 'divider') {
        return {
          ...item,
          name: '分割线',
        } as UI.CustomMenuOption;
      }

      const routeName = routePathNameMap[item.key]?.name;
      const routeLink = routePathNameMap[item.key]?.link || item.link;

      let name = item.name ? item.name
               : routeName ? routeName 
               : null;
      
      if (!name) {
        console.error('Cannot find name for menu item:', item);
        name = item.key;
      }

      const menuOption: UI.CustomMenuOption = {
        key: item.key,
        name: name,
        label: routeLink ? renderLink(routeLink, name) : name,
        order: item.order,
        show: item.show !== false,
      };

      if (item.children) {
        menuOption.children = createMenuOptionsFunc(item.children);
      }
      if (item.iconName) {
        menuOption.icon = renderIcon(item.iconName);
      }

      return menuOption;
    }).sort((a, b) => (a.order as number || 0) - (b.order as number || 0));
  }

  const menuOptions = createMenuOptionsFunc(convertMenuToTree(menu));
  // add a divider at the beginning
  menuOptions.unshift({
    key: 'Divider-0',
    type: 'divider',
    name: '分割线',
    order: -100,
  });
  return menuOptions;
}


interface PermissionTree {
  [key: string]: unknown
  key: string
  label: string
  children?: PermissionTree[]
}


export const createMenuPermissionTree = (menu: Api.Menu[]): PermissionTree[] => {
  const permissionTree: PermissionTree[] = [];

  const dfs = (item: Api.Menu, fatherName: string): PermissionTree => {
    const routeName = routePathNameMap[item.key]?.name;
    const name = item.name || routeName || item.key;
    const label = fatherName ? `${fatherName} - ${name}` : name;
    
    const treeItem: PermissionTree = {
      key: item.key,
      label: label,
    };
    if (item.children) {
      treeItem.children = item.children.map((child) => dfs(child, label));
    }
    return treeItem;
  }

  menu.forEach((item) => {
    permissionTree.push(dfs(item, ''));
  });

  return permissionTree;
}


export const usePermissionStore = defineStore('permission', () => {

  const menuStatic = ref<Api.Menu[]>([
    {
      key: 'Divider-1',
      type: 'divider',
      order: 100,
    },
    {
      key: 'Outdocs',
      name: '文档',
      iconName: 'book',
      order: 200,
      children: [
        {
          link: 'https://vuejs.org/',
          name: 'Vue 文档',
          key: 'OutdocsVue',
          iconName: 'book',
          order: 201,
        },
        {
          link: 'https://www.naiveui.com/',
          name: 'NaiveUI 文档',
          key: 'OutdocsNaiveUI',
          iconName: 'book',
          order: 202,
        }
      ]
    }
  ]);


  const menuTree = ref<Api.Menu[]>([
    {
      key: "Home",
      name: "首页 (Test)",
      iconName: "home",
      order: 0
    },
    {
      key: "Dashboard",
      iconName: "dashboard",
      order: 10,
      children: [
        {
          father: "Status",
          key: "StatusPage",
          iconName: "dashboard",
          order: 11
        }
      ]
    },
    {
      key: "System",
      iconName: "desktop",
      order: 20,
      children: [
        {
          father: "System",
          key: "UserPage",
          iconName: "users",
          order: 21
        },
        {
          father: "System",
          key: "RolePage",
          iconName: "verified-user",
          order: 22
        },
        {
          father: "System",
          key: "PermissionPage",
          iconName: "security",
          order: 23
        }
      ]
    },
    {
      key: "Profile",
      iconName: "person",
      order: 30
    },
  ])

  const menuPermissionTree = computed(() => createMenuPermissionTree(menuTree.value));

  const menuOptions = ref<UI.CustomMenuOption[]>(createMenuOptions(menuTree.value.concat(menuStatic.value)));

  watch(menuTree, (newMenu) => {
    menuOptions.value = createMenuOptions(newMenu.concat(menuStatic.value));
  }, { deep: true });

  // const permissionList = ref<Record<string, boolean>>({});


  return {
    menuTree,
    menuPermissionTree,
    menuStatic,
    menuOptions,
    //    permissionList,
  }
})