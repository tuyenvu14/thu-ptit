package football.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "don_hang")
@Builder
public class DonHang implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false )
    private int id;

    @Column(name = "ngay_dat")
    private Date ngayDat;

    @Column(name = "tien_coc")
    private int tienCoc;

    @Column(name = "tong_tien")
    private int tongTien;

    @Column(name = "trang_thai_thanh_toan")
    private String trangThaiThanhToan;

    @Column(name = "ngay_thanh_toan")
    private Date ngayThanhToan;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "khach_hang_id", nullable = false, referencedColumnName = "id")
    private KhachHang khachHang;

    @OneToMany( fetch = FetchType.LAZY, mappedBy = "donHang", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<DonHangSanBongKhungGio> donHangSanBongKhungGioList;

    @OneToMany(mappedBy = "donHang", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<LichSuDonHang> lichSuDonHangList;

}