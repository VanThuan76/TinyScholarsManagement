package tiny_scholars_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tiny_scholars_management.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
}
