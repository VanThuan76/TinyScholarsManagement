package tiny_scholars_management.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tiny_scholars_management.dto.BaseDTO;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class SignUpdateRequest extends BaseDTO {
    private Integer id;
    private Integer userId;
    private Integer bookingId;
    private String type; // in, out
    private LocalDateTime signTime;
    private String signature;
}