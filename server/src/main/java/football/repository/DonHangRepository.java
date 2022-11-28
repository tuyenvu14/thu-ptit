
package football.repository;

import football.model.DonHang;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface DonHangRepository extends JpaRepository<DonHang, Integer> {
    @Query("SELECT m FROM DonHang m WHERE m.khachHang.id LIKE ?1 ORDER BY m.id")
    Page<DonHang> findAllOrders(String khachHangId, Pageable pageable);
}