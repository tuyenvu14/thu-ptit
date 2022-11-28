package football.mapper;

import football.dto.response.DonHangResponse;
import football.model.DonHang;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DonHangMapper {

    public DonHangResponse donHangToDonHangResponse(DonHang donHang) {
        DonHangResponse donHangResponse = new DonHangResponse();
        donHangResponse.setId(donHang.getId());
        donHangResponse.setNgayDat(donHang.getNgayDat());
        donHangResponse.setTienCoc(donHang.getTienCoc());
        donHangResponse.setTongTien(donHang.getTongTien());
        donHangResponse.setTrangThaiThanhToan(donHang.getTrangThaiThanhToan());
        donHangResponse.setNgayThanhToan(donHang.getNgayThanhToan());
        donHangResponse.setKhachHang(donHang.getKhachHang());
        //



        return donHangResponse;
    }

    public List<DonHangResponse> listDonHangToListDonHangResponse(List<DonHang> donHangList) {
        return donHangList.stream().map(this::donHangToDonHangResponse).collect(Collectors.toList());
    }
}
