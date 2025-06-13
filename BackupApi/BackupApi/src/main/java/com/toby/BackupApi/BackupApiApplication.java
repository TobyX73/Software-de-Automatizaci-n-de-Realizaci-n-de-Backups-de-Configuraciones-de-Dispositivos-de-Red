package com.toby.BackupApi;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;


@SpringBootApplication(scanBasePackages = "com.toby.BackupApi")
@EnableScheduling
public class BackupApiApplication {

	public static void main(String[] args) {
		// 🔹 Cargar .env ANTES de que arranque Spring
		Dotenv dotenv = Dotenv.configure()
				.directory(System.getProperty("user.dir"))
				.ignoreIfMissing()
				.load();

		setIfPresent("DB_URL", "spring.datasource.url", dotenv);
		setIfPresent("DB_USER", "spring.datasource.username", dotenv);
		setIfPresent("DB_PASS", "spring.datasource.password", dotenv);

		// 🔹 Driver de PostgreSQL (necesario si no se autoconfigura)
		System.setProperty("spring.datasource.driver-class-name", "org.postgresql.Driver");

		SpringApplication.run(BackupApiApplication.class, args);
	}

	private static void setIfPresent(String envKey, String springKey, Dotenv dotenv) {
		String value = dotenv.get(envKey);
		if (value != null) {
			System.setProperty(springKey, value);
			System.out.println("✅ " + springKey + " <- " + value);
		} else {
			System.out.println("⚠️  No se encontró " + envKey + " en el .env");
		}
	}

	@Autowired
	private DataSource dataSource;

	@PostConstruct
	public void showDatabaseConnection() throws SQLException {
		System.out.println("📌 Conectado a: " + dataSource.getConnection().getMetaData().getURL());
	}
}
