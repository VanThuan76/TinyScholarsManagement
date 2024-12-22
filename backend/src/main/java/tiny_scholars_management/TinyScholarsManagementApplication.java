package tiny_scholars_management;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@RequiredArgsConstructor
public class TinyScholarsManagementApplication implements CommandLineRunner {

  public static void main(String[] args) {
    SpringApplication.run(TinyScholarsManagementApplication.class, args);
  }

  @Bean
  public ModelMapper modelMapper() {
    return new ModelMapper();
  }

  @Override
  public void run(String... params) throws Exception {
    // No initialization logic for users
    System.out.println("Application has started successfully!");
  }
}
