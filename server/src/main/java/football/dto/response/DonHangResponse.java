package football.dto.response;

import lombok.Data;
import football.model.KhachHang;

import java.util.Date;

@Data
public class DonHangResponse {
    private int id;

    private Date ngayDat;

    private int tienCoc;

    private int tongTien;

    private String trangThaiThanhToan;

    private Date ngayThanhToan;

    private KhachHang khachHang;
}
