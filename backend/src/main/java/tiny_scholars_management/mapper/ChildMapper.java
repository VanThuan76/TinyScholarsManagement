package tiny_scholars_management.mapper;

import org.modelmapper.ModelMapper;
import tiny_scholars_management.dto.response.ChildResponse;
import tiny_scholars_management.entity.Child;
import tiny_scholars_management.entity.User;

public class ChildMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public static ChildResponse convertToChildResponse(Child child) {
        User user = modelMapper.map(child.getUser(), User.class);
        ChildResponse childResponse = modelMapper.map(child, ChildResponse.class);
        childResponse.setUser(user);
        return childResponse;
    }


}
