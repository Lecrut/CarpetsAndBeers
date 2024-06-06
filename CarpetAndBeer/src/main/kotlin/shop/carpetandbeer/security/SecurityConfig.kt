package shop.carpetandbeer.security

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain

@Configuration
@EnableWebSecurity
class SecurityConfig {
    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .authorizeHttpRequests { authorizeRequests ->
                authorizeRequests
                    .requestMatchers("/userapi/*", "/itemapi/*").permitAll()  // Allow public access to register and login
                    .anyRequest().authenticated()
            }
            .csrf{ csrf -> csrf.disable()}  // Disable CSRF protection for simplicity in development (not recommended for production)
        return http.build()
    }
}