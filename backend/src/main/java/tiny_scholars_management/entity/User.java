package tiny_scholars_management.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Size(min = 4, max = 255, message = "Minimum username length: 4 characters")
  @Column(unique = true, nullable = false)
  private String username;

  @Column(unique = true, nullable = false)
  private String email;

  @Size(min = 8, message = "Minimum password length: 8 characters")
  private String password;

  private String firstName;

  private String lastName;

  private String relationship;

  @Column(nullable = false)
  private Role role;

  @Column(nullable = false)
  private LocalDateTime createdDate;

  @Column(nullable = false)
  private LocalDateTime modifiedDate;

  @Column(nullable = false)
  private Boolean isDeleted = false;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  @JsonIgnore
  @JsonIgnoreProperties(value = {"user", "sign"})
  private List<Sign> signs;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  @JsonIgnore
  @JsonIgnoreProperties(value = {"user", "child"})
  private List<Child> children;
}
