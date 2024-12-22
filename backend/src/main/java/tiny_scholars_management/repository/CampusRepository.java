package tiny_scholars_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tiny_scholars_management.entity.Campus;

@Repository
public interface CampusRepository extends JpaRepository<Campus, Integer> {

}
