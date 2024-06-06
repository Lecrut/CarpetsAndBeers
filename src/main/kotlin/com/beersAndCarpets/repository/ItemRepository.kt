package com.beersAndCarpets.repository

import com.beersAndCarpets.model.Item
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface ItemRepository: MongoRepository<Item, String>