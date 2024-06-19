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
                    .requestMatchers("/api/userapi/*", "/api/itemapi/*", "/api/orderapi/*",
                        "/userapi/login",
                        "/userapi/register",
                        ).permitAll()
                    .anyRequest().authenticated()
            }
            .csrf{ csrf -> csrf.disable()}
        return http.build()
    }
}