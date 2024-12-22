package tiny_scholars_management.mapper;

import org.modelmapper.ModelMapper;
import tiny_scholars_management.dto.response.CampusResponse;
import tiny_scholars_management.dto.response.RoomResponse;
import tiny_scholars_management.entity.Campus;

import java.util.List;

public class CampusMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public static CampusResponse convertToCampusResponse(Campus request, List<RoomResponse> rooms) {
        CampusResponse response = new CampusResponse();
        response.setId(request.getId());
        response.setName(request.getName());
        response.setAddress(request.getAddress());
        response.setCampusPhoneNumber(request.getCampusPhoneNumber());
        response.setCampusEmail(request.getCampusEmail());
        response.setRooms(rooms);

        return response;
    }
}
