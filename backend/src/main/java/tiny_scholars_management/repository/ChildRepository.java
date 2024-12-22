package tiny_scholars_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tiny_scholars_management.entity.Child;

public interface ChildRepository extends JpaRepository<Child, Integer> {
}
