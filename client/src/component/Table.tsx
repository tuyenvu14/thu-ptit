import React, { ReactNode, useRef, useState } from 'react'
import { Button } from 'antd'
import ProTable, { ActionType, ProTableProps } from '@ant-design/pro-table'
import { isMobile } from 'react-device-detect'
import { PaginationProps } from 'antd/lib/pagination'
import { useHistory } from 'react-router'
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SIZE_SERVICE
} from '../constants'

type ParamsType = {
  pageIndex: string
  pagingSize: string
  total: number
  linkCreate?: string
  titleCreate?: string
  linkEdit?: string
  onSearch: (value: any) => void
  onChangePageSize: (index: number, size: number) => void
  onChangePageIndex: (index: number, size: number | undefined) => void
  defaultCollapse?: boolean
  customButton?: any | []
  hideSearchButton?: boolean
  bordered?: boolean
  resource?: string
  scroll: any
  loading?: boolean
  customSearchBtn?: any
  customButtonCreate?: any | []
}

export declare type TableProps = ProTableProps<any, any> &
  Partial<PaginationProps> &
  Partial<ParamsType>

const Table: React.FC<TableProps> = (props: TableProps) => {
  const actionRef = useRef<ActionType>()
  const history = useHistory()

  const {
    bordered = true,
    pageIndex,
    pagingSize,
    total,
    linkCreate,
    linkEdit,
    onSearch,
    onChangePageIndex,
    onChangePageSize,
    form,
    defaultCollapse = true,
    customButton,
    hideSearchButton,
    resource,
    loading,
    customSearchBtn,
    customButtonCreate,
    titleCreate
  } = props

  const [isVisible, setIsVisible] = useState(false)

  return (
    <ProTable
      bordered={bordered}
      scroll={{ x: 'max-content' }}
      actionRef={actionRef}
      options={{
        fullScreen: true,
        reload: false,
        setting: false
      }}
      loading={loading}
      search={{
        defaultCollapsed: isMobile ? true : defaultCollapse,
        collapseRender: (collapsed, props, intl): ReactNode => {
          return <Button>{collapsed ? 'Mở rộng' : 'Thu gọn'}</Button>
        },
        labelWidth: 'auto',
        optionRender: ({ searchText, resetText }, { form }) => {
          return !hideSearchButton
            ? [
                <Button
                  key={'searchText'}
                  type="primary"
                  onClick={() => {
                    form?.submit()
                  }}
                  style={customSearchBtn?.style}
                >
                  {customSearchBtn?.text ?? 'Tìm kiếm'}
                </Button>
                // <Button
                //   key="resetText"
                //   onClick={() => {
                //     form?.resetFields()
                //   }}
                // >
                //   Reset
                // </Button>,
              ]
            : []
        }
      }}
      onSubmit={(params) => onSearch?.(params)}
      pagination={{
        hideOnSinglePage: true,
        showSizeChanger: true,
        size: 'default',
        current:
          parseInt(pageIndex ?? `${DEFAULT_PAGE_INDEX}`) ?? DEFAULT_PAGE_INDEX,
        pageSize:
          parseInt(pagingSize ?? `${DEFAULT_PAGE_SIZE}`) ??
          DEFAULT_PAGE_SIZE_SERVICE,

        total,
        pageSizeOptions: ['10', '30', '50'],
        onShowSizeChange: (current, pageSize) =>
          onChangePageSize?.(0, pageSize),
        onChange: (page, pageSize) => onChangePageIndex?.(page, pageSize)
      }}
      toolbar={{
        actions: [
          customButton ? [...customButton] : null,
          linkCreate ? (
            // <AuthorizedComponent authority={resource}>
            <Button type="primary" onClick={() => history.push(linkCreate)}>
              {titleCreate}
            </Button>
          ) : // </AuthorizedComponent>
          null,
          customButtonCreate ? [...customButtonCreate] : null
        ]
      }}
      {...props}
      form={{
        ...form,
        layout: 'vertical'
      }}
    />
  )
}

export default Table
