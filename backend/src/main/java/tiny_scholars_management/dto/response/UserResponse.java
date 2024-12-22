package tiny_scholars_management.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import tiny_scholars_management.entity.Role;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private Integer id;
    private Role role;
    private String firstName;
    private String email;
    private String lastName;
    private String relationship;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String accessToken;
    private List<ChildResponse> children;
    private List<SignResponse> signs;
}
