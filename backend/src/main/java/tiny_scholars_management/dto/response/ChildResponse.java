package tiny_scholars_management.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import tiny_scholars_management.entity.User;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChildResponse {
    private Integer id;
    private String firstName;
    private String lastName;
    private String gender;
    private LocalDate birthday;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private User user;
}
