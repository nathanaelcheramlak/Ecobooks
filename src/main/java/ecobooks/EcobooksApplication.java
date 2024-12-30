package ecobooks;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class EcobooksApplication {

	public static void main(String[] args) {
		// Load from .env (Local host)
		Dotenv dotenv = Dotenv.load();

		String dbUrl = dotenv.get("DB_URL");
		String dbUsername = dotenv.get("DB_USERNAME");
		String dbPassword = dotenv.get("DB_PASSWORD");
		String jwt_secret_key = dotenv.get("JWT_SECRET_KEY");
		String jwt_secret_expiration = dotenv.get("JWT_SECRET_EXPIRATION");
		String cloud_name = dotenv.get("CLOUDINARY_USERNAME");
		String cloud_api_key = dotenv.get("CLOUDINARY_API_KEY");
		String cloud_api_secret = dotenv.get("CLOUDINARY_API_SECRET");

		// Pass them to Spring Boot's db configuration
		System.setProperty("db.url", dbUrl);
		System.setProperty("db.username", dbUsername);
		System.setProperty("db.password", dbPassword);
		System.setProperty("cloudinary.name", cloud_name);
		System.setProperty("cloudinary.api.secret", cloud_api_secret);
		System.setProperty("cloudinary.api.key", cloud_api_key);
		System.setProperty("jwt.secret.key", jwt_secret_key);
		System.setProperty("jwt.secret.expiration", jwt_secret_expiration);

		// System.out.println("EXPIRATION: " + jwt_secret_expiration);
		// System.out.println("SECRET: " + jwt_secret_key);
		// System.out.println("DB-URL: " + dbUrl);
		// System.out.println("DB-PASSWORD: " + dbPassword);

		SpringApplication.run(EcobooksApplication.class, args);
	}

}
