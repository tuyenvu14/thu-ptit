package murraco.dto.response;

import lombok.Data;
import murraco.model.DonHang;
import murraco.model.KhachHang;

import java.util.Date;
import java.util.List;
@Data
public class DonHangDTO {

    private List<DonHangResponse> donHangs;
    private long totalCount;
}
