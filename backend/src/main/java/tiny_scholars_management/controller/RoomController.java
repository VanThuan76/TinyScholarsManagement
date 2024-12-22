package tiny_scholars_management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tiny_scholars_management.configuration.BaseResponse;
import tiny_scholars_management.dto.request.RoomCreateRequest;
import tiny_scholars_management.dto.request.RoomUpdateRequest;
import tiny_scholars_management.entity.Room;
import tiny_scholars_management.service.RoomService;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping("/{id}")
    public BaseResponse<Room> getRoomById(@PathVariable Integer id) {
        Room room = roomService.getRoomById(id);
        return BaseResponse.ok(room);
    }

    @GetMapping
    public BaseResponse<List<Room>> getAllRooms() {
        List<Room> rooms = roomService.getAllRooms();
        return BaseResponse.ok(rooms);
    }

    @PostMapping
    public BaseResponse<Room> createRoom(@RequestBody RoomCreateRequest roomCreateRequest) {
        Room room = roomService.createRoom(roomCreateRequest);
        return BaseResponse.created(room);
    }

    @PutMapping("/{id}")
    public BaseResponse<Room> updateRoom(@PathVariable("id") Integer id, @RequestBody RoomUpdateRequest roomUpdateRequest) {
        Room updatedRoom = roomService.updateRoom(id, roomUpdateRequest);
        return BaseResponse.ok(updatedRoom);
    }

    @DeleteMapping("/{id}")
    public BaseResponse<String> deleteRoom(@PathVariable Integer id) {
        roomService.deleteRoom(id);
        return BaseResponse.deleted();
    }
}
