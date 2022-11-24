package murraco.repository;


import murraco.model.SanBong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SanBongRepository extends JpaRepository<SanBong, Integer> {
//    List<SanBong> findByName(String name);
}