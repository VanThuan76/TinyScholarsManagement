package tiny_scholars_management.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BaseDTO {
    private Boolean active=true;
    private Boolean isDelete = false;
    private Date createdDate=new Date();
    private Date updatedDate = new Date();
}

