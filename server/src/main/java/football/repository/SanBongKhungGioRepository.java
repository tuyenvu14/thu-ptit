
package football.repository;

import football.model.SanBongKhungGio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SanBongKhungGioRepository extends JpaRepository<SanBongKhungGio, Integer> {
//    List<SanBong> findByName(String name);
}