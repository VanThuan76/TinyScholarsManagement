package tiny_scholars_management.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponse {
    private Integer id;
    private String roomName;
    private LocalDate bookedDate;
    private LocalDateTime bookTimeFrom;
    private LocalDateTime bookTimeTo;
    private CampusResponse campus;
    private ChildResponse child;
}
