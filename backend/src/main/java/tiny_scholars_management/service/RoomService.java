package tiny_scholars_management.service;

import tiny_scholars_management.dto.request.RoomCreateRequest;
import tiny_scholars_management.dto.request.RoomUpdateRequest;
import tiny_scholars_management.entity.Room;

import java.util.List;

public interface RoomService {

    Room getRoomById(Integer id);

    List<Room> getAllRooms();

    Room createRoom(RoomCreateRequest roomCreateRequest);

    Room updateRoom(Integer id, RoomUpdateRequest roomUpdateRequest);

    void deleteRoom(Integer id);
}
