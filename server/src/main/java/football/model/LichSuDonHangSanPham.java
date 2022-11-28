package football.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "lich_su_don_hang_san_pham")
@Builder
public class LichSuDonHangSanPham implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false )
    private int id;

    @Column(name = "so_luong")
    private int soLuong;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "lich_su_don_hang_id", nullable = false, referencedColumnName = "id")
    @JsonBackReference
    private LichSuDonHang lichSuDonHang;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "san_pham_id", nullable = false, referencedColumnName = "id")
    private SanPham sanPham;
}