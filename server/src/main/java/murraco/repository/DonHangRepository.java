
package murraco.repository;

import murraco.model.DonHang;
import murraco.model.KhachHang;
import murraco.model.SanBongKhungGio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface DonHangRepository extends JpaRepository<DonHang, Integer> {
    @Query("SELECT m FROM DonHang m WHERE m.khachHang.id LIKE ?1 ORDER BY m.id")
    Page<DonHang> findAllOrders(String khachHangId, Pageable pageable);
}