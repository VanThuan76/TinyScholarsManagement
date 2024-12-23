package tiny_scholars_management.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tiny_scholars_management.dto.BaseDTO;
import tiny_scholars_management.entity.Role;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class UserCreateRequest extends BaseDTO {
    @NotNull
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
    private String relationship;
    private Role role;
}
