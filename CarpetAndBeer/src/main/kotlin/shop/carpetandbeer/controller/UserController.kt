package shop.carpetandbeer.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.crypto.bcrypt.BCrypt
import org.springframework.security.crypto.bcrypt.BCrypt.hashpw
import org.springframework.web.bind.annotation.*
import shop.carpetandbeer.model.User
import shop.carpetandbeer.model.UserLogin
import shop.carpetandbeer.model.UserRequest
import shop.carpetandbeer.repository.UserRepository
import java.util.*

@RestController
@RequestMapping("/userapi")
class UserController( private val repository: UserRepository) {
    @GetMapping("/")
    fun getALlUsers(): ResponseEntity<List<User>> {
        return ResponseEntity.ok(repository.findAll())
    }

    @GetMapping("/{id}")
    fun getUserById(@PathVariable id: String): ResponseEntity<out Any> {
        val user = repository.findById(id).orElse(null)
        return if (user != null) {
            ResponseEntity.ok(user)
        } else {
            ResponseEntity.badRequest().body(mapOf("message" to "User not found"))
        }
    }


    @PostMapping("/login")
    fun getUserById(@RequestBody user: UserLogin): ResponseEntity<User> {
        repository.findAll().let { users ->
            users.forEach {
                if (
                    it.email == user.email
                    && it.password == hashpw(user.password, it.salt)
                )
                    return ResponseEntity.ok(it)
            }
        }
        return ResponseEntity.notFound().build()
    }

    @PostMapping("/register")
    fun registerUser(@RequestBody user: UserRequest): ResponseEntity<out Any> {
        if(user.email?.let { getUserByEmail(it) } != null) {
            return ResponseEntity.badRequest().body("{\"message\": \"User already exists\"}")
        }
        val salt = BCrypt.gensalt()
        val hash = hashpw(user.password, salt)

        val newUser = User(null, user.name, user.email, hash, salt)
        return ResponseEntity.ok(repository.save(newUser))
    }

    @PutMapping("/{id}")
    fun updateUser(@PathVariable id: String, @RequestBody user: User): ResponseEntity<out Any> {
        val userToUpdate = repository.findById(id).orElse(null)
        userToUpdate?.let {
            it.name = user.name
            it.email = user.email
            it.password = user.password
            return ResponseEntity.ok(repository.save(it))
        }
        return ResponseEntity.badRequest().body(mapOf("message" to "User not found"))
    }

    @DeleteMapping("/{id}")
    fun deleteUser(@PathVariable id: String): ResponseEntity<out Any> {
        val user = repository.findById(id)
        if (user.isPresent) {
            repository.deleteById(id)
            return ResponseEntity.ok(mapOf("message" to "User deleted"))
        } else {
            return ResponseEntity.badRequest().body(mapOf("message" to "User not found"))
        }
    }

    fun getUserByEmail(email: String): User? {
        repository.findAll().let { users ->
            users.forEach {
                if (it.email == email)
                    return it
            }
        }
        return null
    }
}