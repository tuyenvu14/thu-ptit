package football.model;

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
@Table(name = "khach_hang")
@Builder
public class KhachHang implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false )
    private String id;

    @Column(name = "ten")
    private String ten;

    @Column(name = "soId")
    private String soId;

    @Column(name = "dien_thoai")
    private String dienThoai;

    @Column(name = "dia_chi")
    private String diaChi;

    @Column(name = "email")
    private String email;
}