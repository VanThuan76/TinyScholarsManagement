package tiny_scholars_management.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tiny_scholars_management.dto.BaseDTO;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class BookingUpdateRequest extends BaseDTO {
    private Integer id;
    private Integer childId;
    private Integer campusId;
    private String roomName;
    private LocalDate bookedDate;
    private LocalDateTime bookTimeFrom;
    private LocalDateTime bookTimeTo;
}
