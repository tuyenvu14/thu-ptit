package football.repository;


import football.model.KhachHang;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KhachHangRepository extends JpaRepository<KhachHang, Integer> {
    @Query( "SELECT m FROM KhachHang m WHERE m.ten LIKE %?1% OR m.id LIKE %?1% ORDER BY m.id")
    List<KhachHang> searchCustomers(String ten, Pageable pageable);
}

