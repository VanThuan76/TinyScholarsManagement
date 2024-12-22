package tiny_scholars_management.mapper;

import org.modelmapper.ModelMapper;
import tiny_scholars_management.dto.response.CampusResponse;
import tiny_scholars_management.dto.response.ChildResponse;
import tiny_scholars_management.dto.response.RoomResponse;
import tiny_scholars_management.dto.response.SignResponse;
import tiny_scholars_management.entity.Sign;

import java.util.List;
import java.util.stream.Collectors;

public class SignMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public static SignResponse convertToSignResponse(Sign sign) {
        return modelMapper.map(sign, SignResponse.class);
    }
}
