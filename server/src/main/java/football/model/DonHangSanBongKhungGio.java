package football.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "don_hang_san_bong_khung_gio")
@Builder
public class DonHangSanBongKhungGio implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false )
    private int id;

    @Column(name = "ngay_thue_tu_ngay")
    private Date ngayThueTuNgay;

    @Column(name = "ngay_thue_den_ngay")
    private Date ngayThueDenNgay;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "san_bong_khung_gio_id", nullable = false, referencedColumnName = "id")
    private SanBongKhungGio sanBongKhungGio;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "don_hang_id", nullable = false, referencedColumnName = "id")
//    @ManyToOne
//    @JoinColumn(name="don_hang_id",  referencedColumnName = "id")
    @JsonBackReference
    private DonHang donHang;
}
