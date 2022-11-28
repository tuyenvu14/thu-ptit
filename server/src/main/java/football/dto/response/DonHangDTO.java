package football.dto.response;

import lombok.Data;

import java.util.List;
@Data
public class DonHangDTO {

    private List<DonHangResponse> donHangs;
    private long totalCount;
}
