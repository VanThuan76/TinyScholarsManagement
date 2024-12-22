package tiny_scholars_management.mapper;

import org.modelmapper.ModelMapper;
import tiny_scholars_management.dto.response.RoomResponse;
import tiny_scholars_management.entity.Room;

public class RoomMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public static RoomResponse convertToRoomResponse(Room request) {
        return modelMapper.map(request, RoomResponse.class);
    }

}
