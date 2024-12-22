package tiny_scholars_management.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "child_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnoreProperties(value = {"booking"})
    private Child child;

    @ManyToOne
    @JoinColumn(name = "campus_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnoreProperties(value = {"booking"})
    private Campus campus;

    @Column(nullable = false)
    private String roomName;

    @Column(nullable = false)
    private LocalDate bookedDate;

    @Column(nullable = false)
    private LocalDateTime bookTimeFrom;

    @Column(nullable = false)
    private LocalDateTime bookTimeTo;

    @Column(nullable = false)
    private LocalDateTime createdDate;

    @Column
    private LocalDateTime modifiedDate;

    @Column(nullable = false)
    private Boolean isDeleted = false;
}
