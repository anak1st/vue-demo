import type { PaginationProps } from 'naive-ui'


export const usePage = () : PaginationProps => {
  return {
    page: 1,
    pageSize: 12,
    pageCount: 0,
    showSizePicker: true,
    showQuickJumper: true,
    pageSizes: [5, 10, 12, 15, 20],
    prefix({ itemCount }) {
      return `共 ${itemCount} 条`
    }
  }
}
