package tiny_scholars_management.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "room")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "campus_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnoreProperties(value = {"room"})
    private Campus campus;

    @Column(name = "room_name", nullable = false)
    private String roomName;
}
