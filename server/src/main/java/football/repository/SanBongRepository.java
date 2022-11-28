package football.repository;


import football.model.SanBong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SanBongRepository extends JpaRepository<SanBong, Integer> {
//    List<SanBong> findByName(String name);
}