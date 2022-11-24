declare module 'Models' {
  export interface Order {
    id?: any
    ngayDat?: any
    tienCoc?: any
    tongTien?: any
    trangThaiThanhToan?: any
    ngayThanhToan?: any
    khachHang?: KhachHang
  }

  export interface KhachHang {
    id?: any
    ten?: any
    soId?: any
    dienThoai?: any
    diaChi?: any
    email?: any
  }
}
