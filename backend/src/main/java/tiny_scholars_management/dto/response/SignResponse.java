package tiny_scholars_management.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import tiny_scholars_management.entity.Booking;
import tiny_scholars_management.entity.User;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignResponse {
    private Integer id;
    private String type;
    private LocalDateTime signTime;
    private String signature;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private User user;
    private Booking booking;
}