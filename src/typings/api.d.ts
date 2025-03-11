declare namespace Api {
  interface R<T> {
    code: number;
    msg?: string;
    data: T | null;
  }

  interface LoginRsp {
    access_token: string;
    token_type: string;
  }

  interface Page<T> {
    records: T[];
    page_size: number;
    page_no: number;
    page_count: number;
    item_count: number;
  }

  interface User {
    id: number;
    username: string;
    nickname?: string;
    email?: string;
    phone?: string;
    roles?: string[];
    state?: string;
    disabled?: boolean;
  }

  interface Role {
    id: number;
    code: string;
    name: string;
    remark?: string;
    disabled?: boolean;
  }

  interface Menu {
    key: string;
    link?: string;
    name?: string;
    type?: 'divider';
    iconName?: UI.IconName;
    order?: number;
    show?: boolean;
    father?: string;
    children?: Menu[];
    remark?: string;
  }
}