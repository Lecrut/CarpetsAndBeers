package com.beersAndCarpets.controller

import com.beersAndCarpets.model.User
import com.beersAndCarpets.model.UserLogin
import com.beersAndCarpets.model.UserRequest
import com.beersAndCarpets.repository.UserRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("user")
class UserController( private val repository: UserRepository) {
    @GetMapping("/")
    fun getALlUsers(): ResponseEntity<List<User>> {
        return ResponseEntity.ok(repository.findAll())
    }

    @GetMapping("/{id}")
    fun getUserById(@PathVariable id: String): ResponseEntity<User> {
        return ResponseEntity.ok(repository.findById(id).orElse(null))
    }


    @PostMapping("/login")
    fun getUserById(@RequestBody user: UserLogin): ResponseEntity<User> {
        repository.findAll().let { users ->
            users.forEach {
                if (it.email == user.email && it.password == user.password)
                    return ResponseEntity.ok(it)
            }
        }
        return ResponseEntity.notFound().build()
    }

    @PostMapping("/register")
    fun registerUser(@RequestBody user: UserRequest): ResponseEntity<out Any> {
        if(user.email?.let { getUserByEmail(it) } == null)
            return ResponseEntity.badRequest().body("{\"message\": \"User already exists\"}")

        val newUser = User(null, user.name, user.email, user.password)
        return ResponseEntity.ok(repository.save(newUser))
    }

    @PutMapping("/{id}")
    fun updateUser(@PathVariable id: String, @RequestBody user: User): ResponseEntity<User> {
        val userToUpdate = repository.findById(id).orElse(null)
        userToUpdate?.let {
            it.name = user.name
            it.email = user.email
            it.password = user.password
            return ResponseEntity.ok(repository.save(it))
        }
        return ResponseEntity.notFound().build()
    }

    @DeleteMapping("/{id}")
    fun deleteUser(@PathVariable id: String): ResponseEntity<Void> {
        repository.deleteById(id)
        return ResponseEntity.noContent().build()
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