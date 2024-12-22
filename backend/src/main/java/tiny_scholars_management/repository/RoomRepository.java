package tiny_scholars_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tiny_scholars_management.entity.Campus;
import tiny_scholars_management.entity.Room;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Integer> {

    List<Room> findAllByCampus(Campus campus);

}
