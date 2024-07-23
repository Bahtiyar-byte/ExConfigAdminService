package exconfigadminservice; //Namespace - Main, Controllers, Models in separate packages

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.cassandra.repository.config.EnableCassandraRepositories;

@SpringBootApplication
@EnableCassandraRepositories
public class ExConfigAdminServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(ExConfigAdminServiceApplication.class, args);
	}
}