package tiny_scholars_management.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tiny_scholars_management.dto.BaseDTO;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class ChildUpdateRequest extends BaseDTO {
    private Integer id;
    private Integer userId;
    private String firstName;
    private String lastName;
    private String gender;
    private LocalDate birthday;
}