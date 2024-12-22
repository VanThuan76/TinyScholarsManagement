package tiny_scholars_management.service;

import javax.servlet.http.HttpServletRequest;

import tiny_scholars_management.dto.request.AuthRequest;
import tiny_scholars_management.dto.request.UserCreateRequest;
import tiny_scholars_management.dto.response.UserResponse;
import tiny_scholars_management.entity.User;

import java.util.List;

public interface UserService {

    UserResponse signin(AuthRequest authRequest);

    UserResponse signup(UserCreateRequest userCreateRequest);

    List<UserResponse> getAllUsers(int page, int perPage);

    void delete(String username);

    User search(String username);

    User whoami(HttpServletRequest req);

    String refresh(String username);
}
