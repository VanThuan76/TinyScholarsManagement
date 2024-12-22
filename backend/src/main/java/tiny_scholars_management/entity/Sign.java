package tiny_scholars_management.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "sign")
public class Sign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnoreProperties(value = {"sign"})
    private User user;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnoreProperties(value = {"sign"})
    private Booking booking;

    @Column(nullable = false)
    private String type; // in, out

    @Column(nullable = false)
    private LocalDateTime signTime;

    @Column(nullable = false)
    private String signature; // storing electronic signatures

    @Column(nullable = false)
    private LocalDateTime createdDate;

    @Column
    private LocalDateTime modifiedDate;

    @Column(nullable = false)
    private Boolean isDeleted = false;
}
