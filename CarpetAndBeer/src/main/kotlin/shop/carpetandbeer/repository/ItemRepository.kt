package shop.carpetandbeer.repository

import org.springframework.data.mongodb.repository.MongoRepository
import shop.carpetandbeer.model.Item

interface ItemRepository : MongoRepository<Item, String> {
}