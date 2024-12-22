package tiny_scholars_management.entity;

import org.springframework.security.core.GrantedAuthority;


public enum Role implements GrantedAuthority {
  ROLE_ADMIN, ROLE_CLIENT, ROLE_TEACHER;

  public String getAuthority() {
    return name();
  }

}