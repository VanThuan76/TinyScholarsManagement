package tiny_scholars_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tiny_scholars_management.entity.Sign;

public interface SignRepository extends JpaRepository<Sign, Integer> {
}
