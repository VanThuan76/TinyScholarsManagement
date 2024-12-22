package tiny_scholars_management.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tiny_scholars_management.dto.request.RoomCreateRequest;
import tiny_scholars_management.dto.request.RoomUpdateRequest;
import tiny_scholars_management.entity.Campus;
import tiny_scholars_management.entity.Room;
import tiny_scholars_management.repository.CampusRepository;
import tiny_scholars_management.repository.RoomRepository;
import tiny_scholars_management.service.RoomService;

import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private CampusRepository campusRepository;

    @Override
    public Room getRoomById(Integer id) {
        return roomRepository.findById(id).orElseThrow(() -> new RuntimeException("Room not found"));
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public Room createRoom(RoomCreateRequest roomCreateRequest) {
        Campus campus = campusRepository.findById(roomCreateRequest.getCampusId())
                .orElseThrow(() -> new RuntimeException("Campus not found"));

        Room room = new Room();
        room.setRoomName(roomCreateRequest.getRoomName());
        room.setCampus(campus);

        return roomRepository.save(room);
    }

    @Override
    public Room updateRoom(Integer id, RoomUpdateRequest roomUpdateRequest) {
        Room existingRoom = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        Campus campus = campusRepository.findById(roomUpdateRequest.getCampusId())
                .orElseThrow(() -> new RuntimeException("Campus not found"));

        existingRoom.setRoomName(roomUpdateRequest.getRoomName());
        existingRoom.setCampus(campus);

        return roomRepository.save(existingRoom);
    }

    @Override
    public void deleteRoom(Integer id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        roomRepository.delete(room);
    }
}
