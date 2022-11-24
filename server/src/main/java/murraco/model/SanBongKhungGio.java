package murraco.model;

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
@Table(name = "san_bong_khung_gio")
@Builder
public class SanBongKhungGio implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false )
    private int id;

    @Column(name = "gia")
    private int gia;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "san_bong_id", nullable = false, referencedColumnName = "id")
    private SanBong sanBong;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "khung_gio_id", nullable = false, referencedColumnName = "id")
    private KhungGio khungGio;
}
