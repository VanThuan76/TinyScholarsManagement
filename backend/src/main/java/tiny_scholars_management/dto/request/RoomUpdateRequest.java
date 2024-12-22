package tiny_scholars_management.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tiny_scholars_management.dto.BaseDTO;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class RoomUpdateRequest extends BaseDTO {
    private Integer id;
    private String roomName;
    private Integer campusId;
}
