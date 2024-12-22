package tiny_scholars_management.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tiny_scholars_management.dto.BaseDTO;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class CampusCreateRequest extends BaseDTO {
    @NotNull
    private String name;
    private String address;
    private String campusEmail;
    private String campusPhoneNumber;
}
