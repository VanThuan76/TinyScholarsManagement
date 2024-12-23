package tiny_scholars_management.controller;

import javax.servlet.http.HttpServletRequest;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Authorization;
import tiny_scholars_management.configuration.BaseResponse;
import tiny_scholars_management.dto.request.AuthRequest;
import tiny_scholars_management.dto.request.UserCreateRequest;
import tiny_scholars_management.dto.response.UserResponse;
import tiny_scholars_management.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@Api(tags = "users")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;
  private final ModelMapper modelMapper;

  @PostMapping("/signin")
  @ApiOperation(value = "${UserController.signin}")
  @ApiResponses(value = {//
      @ApiResponse(code = 400, message = "Something went wrong"), //
      @ApiResponse(code = 422, message = "Invalid username/password supplied")})
  public BaseResponse<UserResponse> login(//
                      @ApiParam("Login details") @RequestBody AuthRequest authRequest) {
    UserResponse user = userService.signin(authRequest);
    return BaseResponse.ok(user);
  }

  @PostMapping("/signup")
  @ApiOperation(value = "${UserController.signup}")
  @ApiResponses(value = {//
      @ApiResponse(code = 400, message = "Something went wrong"), //
      @ApiResponse(code = 403, message = "Access denied"), //
      @ApiResponse(code = 422, message = "Username is already in use")})
  public BaseResponse<UserResponse> signup(@ApiParam("Signup User") @RequestBody UserCreateRequest userCreateRequest) {
    UserResponse user = userService.signup(modelMapper.map(userCreateRequest, UserCreateRequest.class));
    return BaseResponse.ok(user);
  }

//  @PreAuthorize("hasRole('ROLE_CLIENT')")
  @GetMapping
  @ApiOperation(value = "Get all users with pagination", response = BaseResponse.class)
  @ApiResponses(value = {
          @ApiResponse(code = 400, message = "Something went wrong"),
          @ApiResponse(code = 403, message = "Access denied"),
          @ApiResponse(code = 500, message = "Internal server error")
  })
  public BaseResponse<List<UserResponse>> getAllUsers(
          @ApiParam("Page number") @RequestParam(value = "page", defaultValue = "1") int page,
          @ApiParam("Number of users per page") @RequestParam(value = "per_page", defaultValue = "10") int perPage) {
    List<UserResponse> users = userService.getAllUsers(page, perPage);
    return BaseResponse.ok(users);
  }

  @GetMapping("/id/{id}")
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
  @ApiOperation(value = "Get user by ID", response = UserResponse.class, authorizations = { @Authorization(value="apiKey") })
  @ApiResponses(value = {//
          @ApiResponse(code = 400, message = "Something went wrong"), //
          @ApiResponse(code = 403, message = "Access denied"), //
          @ApiResponse(code = 404, message = "User not found"), //
          @ApiResponse(code = 500, message = "Internal server error")})
  public UserResponse getUserById(
          @ApiParam("User ID") @PathVariable Integer id) {
    return modelMapper.map(userService.getUserById(id), UserResponse.class);
  }


  @DeleteMapping(value = "/{username}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @ApiOperation(value = "${UserController.delete}", authorizations = { @Authorization(value="apiKey") })
  @ApiResponses(value = {//
      @ApiResponse(code = 400, message = "Something went wrong"), //
      @ApiResponse(code = 403, message = "Access denied"), //
      @ApiResponse(code = 404, message = "The user doesn't exist"), //
      @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
  public String delete(@ApiParam("Username") @PathVariable String username) {
    userService.delete(username);
    return username;
  }

  @GetMapping(value = "/{username}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @ApiOperation(value = "${UserController.search}", response = UserResponse.class, authorizations = { @Authorization(value="apiKey") })
  @ApiResponses(value = {//
      @ApiResponse(code = 400, message = "Something went wrong"), //
      @ApiResponse(code = 403, message = "Access denied"), //
      @ApiResponse(code = 404, message = "The user doesn't exist"), //
      @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
  public UserResponse search(@ApiParam("Username") @PathVariable String username) {
    return modelMapper.map(userService.search(username), UserResponse.class);
  }

  @GetMapping(value = "/me")
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
  @ApiOperation(value = "${UserController.me}", response = UserResponse.class, authorizations = { @Authorization(value="apiKey") })
  @ApiResponses(value = {//
      @ApiResponse(code = 400, message = "Something went wrong"), //
      @ApiResponse(code = 403, message = "Access denied"), //
      @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
  public UserResponse whoami(HttpServletRequest req) {
    return modelMapper.map(userService.whoami(req), UserResponse.class);
  }

  @GetMapping("/refresh")
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
  public String refresh(HttpServletRequest req) {
    return userService.refresh(req.getRemoteUser());
  }

}
