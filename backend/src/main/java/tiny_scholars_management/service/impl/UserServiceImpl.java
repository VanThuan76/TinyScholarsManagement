package tiny_scholars_management.service.impl;

import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tiny_scholars_management.dto.UserDataDTO;
import tiny_scholars_management.dto.request.AuthRequest;
import tiny_scholars_management.dto.request.UserCreateRequest;
import tiny_scholars_management.dto.response.UserResponse;
import tiny_scholars_management.entity.User;
import tiny_scholars_management.exception.CustomException;
import tiny_scholars_management.mapper.UserMapper;
import tiny_scholars_management.repository.UserRepository;
import tiny_scholars_management.security.JwtTokenProvider;
import tiny_scholars_management.service.UserService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    @Override
    public UserResponse signin(AuthRequest authRequest) {
        try {
            String username = authRequest.getUsername();
            String password = authRequest.getPassword();

            User user = userRepository.findByUsername(username);

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

            String token = jwtTokenProvider.createToken(username, user.getRole());

            return UserMapper.convertInitUserResponse(user, token);
        } catch (AuthenticationException e) {
            throw new CustomException("Invalid username/password supplied", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @Override
    public UserResponse signup(UserCreateRequest userCreateRequest) {
        if (userRepository.existsByUsername(userCreateRequest.getUsername())) {
            throw new CustomException("Username is already in use", HttpStatus.UNPROCESSABLE_ENTITY);
        }

        if (userRepository.existsByUsername(userCreateRequest.getEmail())) {
            throw new CustomException("Email is already in use", HttpStatus.UNPROCESSABLE_ENTITY);
        }

        String encodedPassword = passwordEncoder.encode(userCreateRequest.getPassword());
        userCreateRequest.setPassword(encodedPassword);

        User user = new User();
        LocalDateTime now = LocalDateTime.now();

        user.setUsername(userCreateRequest.getUsername());
        user.setEmail(userCreateRequest.getEmail());
        user.setPassword(userCreateRequest.getPassword());
        user.setRole(userCreateRequest.getRole());
        user.setCreatedDate(now);
        user.setModifiedDate(now);

        String token = jwtTokenProvider.createToken(user.getUsername(), user.getRole());

        user = userRepository.save(user);

        return UserMapper.convertInitUserResponse(user, token);
    }

    public List<UserResponse> getAllUsers(int page, int perPage) {
        PageRequest pageRequest = PageRequest.of(page - 1, perPage);
        Page<User> usersPage = userRepository.findAll(pageRequest);
        return usersPage.stream()
                .map(user -> UserMapper.convertToUserResponse(user))
                .collect(Collectors.toList());
    }

    @Override
    public void delete(String username) {
        userRepository.deleteByUsername(username);
    }

    @Override
    public User search(String username) {
        User appUser = userRepository.findByUsername(username);
        if (appUser == null) {
            throw new CustomException("The user doesn't exist", HttpStatus.NOT_FOUND);
        }
        return appUser;
    }

    @Override
    public User whoami(HttpServletRequest req) {
        return userRepository.findByUsername(jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(req)));
    }

    @Override
    public String refresh(String username) {
        return jwtTokenProvider.createToken(username, userRepository.findByUsername(username).getRole());
    }
}
