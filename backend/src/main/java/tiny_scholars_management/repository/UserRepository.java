package tiny_scholars_management.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import tiny_scholars_management.entity.User;


public interface UserRepository extends JpaRepository<User, Integer> {

  boolean existsByUsername(String username);

  User findByUsername(String username);

  User findByEmail(String email);

  @Transactional
  void deleteByUsername(String username);

}
