package shop.carpetandbeer.repository

import org.springframework.data.mongodb.repository.MongoRepository
import shop.carpetandbeer.model.Order

interface OrderRepository : MongoRepository<Order, String> {
    fun findByUserId(userId: String): List<Order>
}