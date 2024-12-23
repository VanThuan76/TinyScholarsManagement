package tiny_scholars_management.mapper;

import tiny_scholars_management.dto.response.ChildResponse;
import tiny_scholars_management.dto.response.SignResponse;
import tiny_scholars_management.dto.response.UserResponse;
import tiny_scholars_management.entity.User;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class UserMapper {

    public static UserResponse convertInitUserResponse(User user, String token) {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setRole(user.getRole());
        userResponse.setEmail(user.getEmail());
        userResponse.setFirstName(user.getFirstName());
        userResponse.setLastName(user.getLastName());
        userResponse.setRelationship(user.getRelationship());
        userResponse.setCreatedDate(user.getCreatedDate());
        userResponse.setModifiedDate(user.getModifiedDate());
        userResponse.setAccessToken(token);
        userResponse.setChildren(Collections.emptyList());
        userResponse.setSigns(Collections.emptyList());
        return userResponse;
    }

    public static UserResponse convertToUserResponse(User user) {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setRole(user.getRole());
        userResponse.setEmail(user.getEmail());
        userResponse.setFirstName(user.getFirstName());
        userResponse.setLastName(user.getLastName());
        userResponse.setRelationship(user.getRelationship());
        userResponse.setCreatedDate(user.getCreatedDate());
        userResponse.setModifiedDate(user.getModifiedDate());
        userResponse.setAccessToken(null);

        List<ChildResponse> children = user.getChildren() != null
                ? user.getChildren().stream().map(ChildMapper::convertToChildResponse).collect(Collectors.toList())
                : Collections.emptyList();
        userResponse.setChildren(children);

        List<SignResponse> signs = user.getSigns() != null
                ? user.getSigns().stream().map(SignMapper::convertToSignResponse).collect(Collectors.toList())
                : Collections.emptyList();
        userResponse.setSigns(signs);

        return userResponse;
    }
}
