import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { ProColumns } from '@ant-design/pro-table'
import { Tab } from '@chakra-ui/react'
import {
  Badge,
  Button,
  Card,
  Descriptions,
  Dropdown,
  Form,
  Modal,
  Space,
  TableColumnsType,
  Tabs,
  Tag
} from 'antd'
import TabPane from 'antd/lib/tabs/TabPane'
import { useState } from 'react'
import ButtonTooltip from '../../component/ButtonTooltip'
import Table from '../../component/Table'
import datetime from '../../extensions/datetime'
import utils from '../../extensions/object'
import { getColorOrderPaymentStatus } from '../../extensions/string'

interface OrderPaymentProps {
  title: string
  data: any
  handlePaymentOrder: () => void
}

interface ExpandedDataType {
  key: React.Key
  date: string
  name: string
  upgradeNum: string
}

export const OrderPaymentForm = (props: OrderPaymentProps) => {
  const { title, data, handlePaymentOrder } = props

  // console.log(data, '-------------------------data')

  const onPaymentClick = () => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn thanh toán đơn hàng này không?',
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk: () => handlePaymentOrder()
    })
  }

  const handleTotalDateHire = (x: any, y: any) => {
    const date1 = new Date(x)
    const date2 = new Date(y)
    //@ts-ignore
    const diffTime = Math.abs(date1 - date2)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    return diffDays
  }

  // const handleDataTable = (data: any, id: any) => {
  //   const dataTable: any[] = []
  //   if (data?.lichSuDonHangList && data?.lichSuDonHangList?.length > 0) {
  //     data?.lichSuDonHangList?.forEach((data1: any, index1: any) => {
  //       if (data1 && data1?.lichSuDonHangSanPhamList?.length > 0) {
  //         data1?.lichSuDonHangSanPhamList?.forEach(
  //           (data2: any, index2: any) => {
  //             dataTable.push({
  //               ...data2,
  //               ngay: data1?.ngay
  //             })
  //           }
  //         )
  //       }
  //     })
  //   }
  //   return dataTable
  // }

  const handleDataTable = (data: any, id: any) => {
    const dataTable: any[] = []
    if (data?.lichSuDonHangList && data?.lichSuDonHangList?.length > 0) {
      data?.lichSuDonHangList?.forEach((data1: any, index1: any) => {
        if (data1?.id === id) {
          if (data1 && data1?.lichSuDonHangSanPhamList?.length > 0) {
            data1?.lichSuDonHangSanPhamList?.forEach(
              (data2: any, index2: any) => {
                dataTable.push({
                  ...data2,
                  ngay: data1?.ngay
                })
              }
            )
          }
        }
      })
    }
    return dataTable
  }

  // const columns: ProColumns[] = [
  //   {
  //     dataIndex: 'sanPham',
  //     title: 'Tên',
  //     align: 'center',
  //     search: false,
  //     render: (text: any) => text?.ten
  //     // text && text !== '-' ? datetime.initNewVnDate(text) : '-'
  //   },
  //   {
  //     dataIndex: 'sanPham',
  //     title: 'Giá',
  //     align: 'center',
  //     search: false,
  //     render: (text: any) => text?.gia
  //   },
  //   {
  //     dataIndex: 'soLuong',
  //     title: 'Số lượng',
  //     search: false,
  //     align: 'center'
  //   },
  //   {
  //     dataIndex: 'ngay',
  //     title: 'Ngày dùng',
  //     align: 'center',
  //     search: false,
  //     render: (text: any) =>
  //       text && text !== '-' ? datetime.initNewVnDate(text) : '-'
  //   },
  //   {
  //     dataIndex: 'sanPham',
  //     title: 'Tổng tiền',
  //     search: false,
  //     align: 'center',
  //     render: (text: any, entity: any) =>
  //       utils.convertNumberToVND(text?.gia * entity?.soLuong)
  //   }
  // ]

  const columnHistories: ProColumns[] = [
    {
      dataIndex: 'ten',
      title: 'Ghi chú',
      align: 'center',
      search: false,
      render: (text: any) => text
    },
    {
      dataIndex: 'gioVaoSan',
      title: 'Giờ vào sân',
      align: 'center',
      search: false,
      render: (text: any) =>
        text && text !== '-' ? datetime.initNewVnDate(text) : '-'
    },
    {
      dataIndex: 'gioRaSan',
      title: 'Giờ ra sân',
      search: false,
      align: 'center',
      render: (text: any) =>
        text && text !== '-' ? datetime.initNewVnDate(text) : '-'
    },
    {
      dataIndex: 'ngay',
      title: 'Ngày sử dụng',
      align: 'center',
      search: false,
      render: (text: any) =>
        text && text !== '-' ? datetime.initNewVnDate(text) : '-'
    },
    {
      dataIndex: 'tienPhat',
      title: 'Tiền phạt',
      search: false,
      align: 'center',
      render: (text: any, entity: any) => utils.convertNumberToVND(text)
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
              title="Cập nhật"
              buttonIcon={<EditOutlined />}
              onClick={() => {}}
            />
            <ButtonTooltip
              title="Xóa"
              buttonIcon={<DeleteOutlined style={{ color: 'red' }} />}
              onClick={() => {}}
            />
            <ButtonTooltip
              title="Thêm sản phẩm sử dụng"
              buttonIcon={<PlusOutlined />}
              onClick={() => {}}
            />
          </>
        )
      }
    }
  ]

  const expandedRowRenderFnc = (
    record: any,
    index: any,
    indent: any,
    expanded: any
  ) => {
    const columns: ProColumns[] = [
      {
        dataIndex: 'sanPham',
        title: 'Tên',
        align: 'center',
        search: false,
        render: (text: any) => text?.ten
      },
      {
        dataIndex: 'sanPham',
        title: 'Giá',
        align: 'center',
        search: false,
        render: (text: any) => text?.gia
      },
      {
        dataIndex: 'soLuong',
        title: 'Số lượng',
        search: false,
        align: 'center'
      },
      {
        dataIndex: 'ngay',
        title: 'Ngày dùng',
        align: 'center',
        search: false,
        render: (text: any) =>
          text && text !== '-' ? datetime.initNewVnDate(text) : '-'
      },
      {
        dataIndex: 'sanPham',
        title: 'Tổng tiền',
        search: false,
        align: 'center',
        render: (text: any, entity: any) =>
          utils.convertNumberToVND(text?.gia * entity?.soLuong)
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
                title="Cập nhật"
                buttonIcon={<EditOutlined />}
                onClick={() => {}}
              />

              <ButtonTooltip
                title="Xóa"
                buttonIcon={<DeleteOutlined style={{ color: 'red' }} />}
                onClick={() => {}}
              />
            </>
          )
        }
      }
    ]
    return (
      <Table
        resource={`order`}
        headerTitle="Danh sách mặt hàng sử dụng trong buổi"
        columns={columns}
        dataSource={handleDataTable(data, record?.id)}
        search={false}
        total={data?.totalCount}
        rowKey={(record) => record.id}
        className="mb-7"
      />
    )
  }
  return (
    <Card size="default" title={title}>
      <Descriptions title="Thông tin khách hàng" className="mb-5 px-6">
        <Descriptions.Item label="Mã khách hàng">
          {data?.khachHang?.id}
        </Descriptions.Item>
        <Descriptions.Item label="Tên khách hàng">
          {data?.khachHang?.ten}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">
          {data?.khachHang?.dienThoai}
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">
          {data?.khachHang?.diaChi}
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          {data?.khachHang?.email}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="Thông tin đơn hàng" className="mb-1 px-6">
        <Descriptions.Item label="Mã đơn hàng">{data?.id}</Descriptions.Item>
        <Descriptions.Item label="Ngày đặt">
          {datetime.initNewVnDate(data?.ngayDat)}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái thanh toán">
          <Tag color={getColorOrderPaymentStatus(data?.trangThaiThanhToan)}>
            {data?.trangThaiThanhToan === 'True'
              ? 'Đã thanh toán'
              : 'Chưa thanh toán'}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Tổng tiền">
          {utils.convertNumberToVND(data?.tongTien)}
        </Descriptions.Item>
        <Descriptions.Item label="Tiền cọc">
          {utils.convertNumberToVND(data?.tienCoc)}
        </Descriptions.Item>
        <Descriptions.Item label="Số tiền thanh toán">
          <b>{utils.convertNumberToVND(data?.tongTien - data?.tienCoc)}</b>
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="Thông tin sân đặt" className="mb-1 px-6">
        {data?.donHangSanBongKhungGioList?.map((data: any, index: any) => (
          <div>
            <b className="mb-2">#{index + 1}</b>
            <Descriptions>
              <Descriptions.Item label="Tên sân">
                {data?.sanBongKhungGio?.sanBong?.ten}
              </Descriptions.Item>
              <Descriptions.Item label="Khung giờ thuê">
                {data?.sanBongKhungGio?.khungGio?.gio}
              </Descriptions.Item>
              <Descriptions.Item label="Giá thuê 1 buổi">
                {utils.convertNumberToVND(data?.sanBongKhungGio?.gia)}
              </Descriptions.Item>
              <Descriptions.Item label="Thuê từ ngày">
                {datetime.initNewVnDate(data?.ngayThueTuNgay)}
              </Descriptions.Item>
              <Descriptions.Item label="Thuê đến ngày">
                {datetime.initNewVnDateTime(data?.ngayThueDenNgay)}
              </Descriptions.Item>

              <Descriptions.Item label="Tổng tiền thuê sân">
                {utils.convertNumberToVND(
                  handleTotalDateHire(
                    data?.ngayThueDenNgay,
                    data?.ngayThueTuNgay
                  ) * data?.sanBongKhungGio?.gia
                )}
              </Descriptions.Item>
            </Descriptions>
          </div>
        ))}
      </Descriptions>

      {/* <Tabs defaultActiveKey="1" className=" px-6"> */}
      {/* <TabPane tab="Danh sách mặt hàng sử dụng" key="1">
          <Table
            resource={`order`}
            headerTitle="Danh sách mặt hàng sử dụng"
            columns={columns}
            dataSource={handleDataTable(data)}
            search={false}
            expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
            total={data?.totalCount}
            rowKey={(record) => record.id}
            className="mb-7"
          />
        </TabPane> */}
      {/* <TabPane tab="Danh sách lịch sử vào sân" key="2"> */}
      <Table
        resource={`order`}
        linkCreate={`order/history/create`}
        titleCreate="Tạo lịch sử mới"
        headerTitle="Danh sách lịch sử đơn hàng"
        columns={columnHistories}
        dataSource={data?.lichSuDonHangList}
        expandable={{
          expandedRowRender: (record, index, indent, expanded) =>
            expandedRowRenderFnc(record, index, indent, expanded),
          onExpand: (expanded, record) => {}
          // defaultExpandedRowKeys: ['0']
        }}
        search={false}
        total={data?.totalCount}
        rowKey={(record) => record.id}
        className="mb-7"
      />
      {/* </TabPane> */}
      {/* </Tabs> */}

      {data?.trangThaiThanhToan === 'False' && (
        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button type="primary" onClick={() => onPaymentClick()}>
            Thanh toán
          </Button>
        </Form.Item>
      )}
    </Card>
  )
}
