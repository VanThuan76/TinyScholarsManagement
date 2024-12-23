package tiny_scholars_management.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CampusResponse {
    private Integer id;
    private String name;
    private String imgUrl;
    private String address;
    private String campusEmail;
    private String campusPhoneNumber;
    private List<RoomResponse> rooms;
}
