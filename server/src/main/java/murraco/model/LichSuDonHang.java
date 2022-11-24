package murraco.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "lich_su_don_hang")
@Builder
public class LichSuDonHang implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false )
    private int id;

    @Column(name = "ghi_chu")
    private String ten;

    @Column(name = "gio_vao_san")
    private Date gioVaoSan;

    @Column(name = "gio_ra_san")
    private Date gioRaSan;

    @Column(name = "ngay")
    private Date ngay;

    @Column(name = "tien_phat")
    private int tienPhat;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "don_hang_id", nullable = false, referencedColumnName = "id")
    @JsonBackReference
    private DonHang donHang;

    @OneToMany(mappedBy = "lichSuDonHang", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<LichSuDonHangSanPham> lichSuDonHangSanPhamList;


}