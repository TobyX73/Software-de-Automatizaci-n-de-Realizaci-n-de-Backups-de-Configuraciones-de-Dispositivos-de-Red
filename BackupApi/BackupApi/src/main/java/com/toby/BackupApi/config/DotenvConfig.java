package com.toby.BackupApi.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

@Configuration
public class DotenvConfig {

    @PostConstruct
    public void init() {
        Dotenv dotenv = Dotenv.configure()
                .directory(System.getProperty("user.dir"))
                .ignoreIfMissing()
                .load();

        setIfPresent("DB_URL", "spring.datasource.url", dotenv);
        setIfPresent("DB_USER", "spring.datasource.username", dotenv);
        setIfPresent("DB_PASS", "spring.datasource.password", dotenv);
        System.setProperty("spring.datasource.driver-class-name", "org.postgresql.Driver");
    }

    private void setIfPresent(String envKey, String springKey, Dotenv dotenv) {
        String value = dotenv.get(envKey);
        if (value != null) {
            System.setProperty(springKey, value);
        }
    }
}