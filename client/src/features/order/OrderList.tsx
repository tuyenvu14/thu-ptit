import { EditOutlined, EyeOutlined, SolutionOutlined } from '@ant-design/icons'
import { ProColumns } from '@ant-design/pro-table'
import { Button, DatePicker, Input, Tag } from 'antd'
import { Order } from 'Models'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import ButtonTooltip from '../../component/ButtonTooltip'
import SearchEnumSelect from '../../component/SearchEnumSelect'
import CustomerSelect from '../../component/select/CustomerSelect'
import Table from '../../component/Table'
import {
  DEFAULT_FORMAT_DATE,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE
} from '../../constants'
import { OrderPaymentStatusSelect } from '../../constants/enumSelect'
import datetime from '../../extensions/datetime'
import { getColorOrderPaymentStatus } from '../../extensions/string'
import { useNotification } from '../../hook/useNotification'
import { useSearchParams, useUpdateSearch } from '../../hook/useSearchParams'
import { useSearchOrdersQuery } from './api'

const OrderList = () => {
  const { search, pathname } = useLocation()

  const history = useHistory()

  const searchParams = useSearchParams(search)
  const { handleSearchClick, handleChangePageSize } = useUpdateSearch(
    pathname,
    search
  )

  const { data, isLoading, error } = useSearchOrdersQuery({
    khachHangId: '',
    limit: DEFAULT_PAGE_SIZE,
    offset: DEFAULT_PAGE_INDEX,
    ...searchParams
  })

  // useNotification(error)

  const columns: ProColumns[] = [
    {
      dataIndex: 'keyword',
      hideInTable: true,
      title: 'Tìm kiếm',
      renderFormItem: (_, {}, form) => {
        const status = form.getFieldValue('keyword')

        return (
          <Input value={status} placeholder="Mã đơn hàng, tên khách hàng..." />
        )
      }
    },
    {
      dataIndex: 'id',
      title: 'Mã đơn hàng',
      align: 'center',
      search: false,
      render: (id, entity) => {
        return id
      }
    },
    {
      dataIndex: 'ngayDat',
      title: 'Ngày đặt',
      align: 'center',
      search: false,
      render: (text: any) =>
        text && text !== '-' ? datetime.initNewVnDate(text) : '-'
    },
    {
      dataIndex: 'khachHangId',
      title: 'Khách hàng',
      align: 'center',
      // search: false,
      render: (khachHangId: any, entity: any) => entity?.khachHang?.ten,
      renderFormItem: (_, {}, form) => {
        console.log('form.......................', form)
        const customerId = form.getFieldValue('khachHangId')
        return (
          <CustomerSelect
            path="cutomer"
            valueSelected={customerId}
            disabled={false}
            allowClear={true}
            hasChildren={false}
          />
        )
      }
    },
    {
      dataIndex: 'tongTien',
      title: 'Tổng tiền',
      align: 'center',
      search: false
    },
    {
      dataIndex: 'tienCoc',
      title: 'Tiền đặt cọc ',
      search: false,
      align: 'center'
    },
    {
      dataIndex: 'trangThaiThanhToan',
      title: 'Trạng thái thanh toán',
      align: 'center',
      render: (_, entity: any) => {
        return (
          <Tag color={getColorOrderPaymentStatus(entity?.trangThaiThanhToan)}>
            {entity?.trangThaiThanhToan === 'True'
              ? 'Đã thanh toán'
              : 'Chưa thanh toán'}
          </Tag>
        )
      },
      // search: false,
      renderFormItem: (_, {}, form) => {
        const status = form.getFieldValue('status')
        return (
          <SearchEnumSelect
            value={status}
            placeholder={'Chọn trạng thái'}
            options={OrderPaymentStatusSelect}
          />
        )
      }
    },
    {
      dataIndex: 'ngayThanhToan',
      title: 'Ngày thanh toán',
      search: false,
      align: 'center',
      render: (text: any) =>
        text && text !== '-' ? datetime.initNewVnDate(text) : '-'
    },
    {
      dataIndex: 'startDate',
      hideInTable: true,
      title: 'Ngày tạo: từ ngày',
      renderFormItem: (_, {}, form) => {
        const startDate = form.getFieldValue('startDate')
        const value = startDate ? datetime.initDate(startDate) : undefined
        return (
          <DatePicker
            value={value}
            format={DEFAULT_FORMAT_DATE}
            className="c-picker-input"
            placeholder="Chọn ngày "
          />
        )
      }
    },
    {
      dataIndex: 'endDate',
      hideInTable: true,
      title: 'Ngày tạo: đến ngày',
      renderFormItem: (_, {}, form) => {
        const endDate = form.getFieldValue('endDate')
        const startDate = form.getFieldValue('startDate')
        const value = endDate ? datetime.initDate(endDate) : undefined
        return (
          <DatePicker
            value={value}
            format={DEFAULT_FORMAT_DATE}
            className="c-picker-input"
            placeholder="Chọn ngày"
            disabledDate={(currentDate) => {
              return datetime.disabledDateBefore(currentDate, startDate)
            }}
          />
        )
      }
    },
    {
      title: 'Hành động',
      fixed: 'right',
      className: 'text-center c-action-mobile',
      search: false,
      render: (dom, entity: any) => {
        return (
          <>
            <ButtonTooltip
              title="Xem chi tết"
              buttonIcon={<EyeOutlined />}
              onClick={() => {}}
            />

            <ButtonTooltip
              title="Cập nhật"
              buttonIcon={<EditOutlined />}
              onClick={() => {}}
            />

            <ButtonTooltip
              title="Thanh toán"
              buttonIcon={<SolutionOutlined />}
              onClick={() => {
                history.push(`/order/payment/${entity?.id}`)
              }}
            />
          </>
        )
      }
    }
  ]

  return (
    <React.Fragment>
      <Table
        resource={`order`}
        loading={isLoading}
        headerTitle="Danh sách đơn hàng"
        columns={columns}
        dataSource={data?.orders}
        linkCreate={`order/create`}
        titleCreate={'Tạo đơn hàng mới'}
        onSearch={(value) => handleSearchClick(value)}
        total={data?.totalCount}
        pagingSize={searchParams?.pageSize?.toString()}
        pageIndex={searchParams?.pageIndex?.toString()}
        onChangePageIndex={handleChangePageSize}
        onChangePageSize={handleChangePageSize}
        rowKey={(record) => record.id}
        form={{
          initialValues: {
            keyword: searchParams?.keyword,
            khachHangId: searchParams?.khachHangId
          }
        }}
      />
    </React.Fragment>
  )
}

export default OrderList
