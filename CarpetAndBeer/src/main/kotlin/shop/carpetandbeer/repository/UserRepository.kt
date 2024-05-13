package shop.carpetandbeer.repository

import org.springframework.data.mongodb.repository.MongoRepository
import shop.carpetandbeer.model.User

interface UserRepository : MongoRepository<User, String> {
}