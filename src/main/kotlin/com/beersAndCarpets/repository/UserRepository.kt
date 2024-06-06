package com.beersAndCarpets.repository

import com.beersAndCarpets.model.User
import org.springframework.data.mongodb.repository.MongoRepository

interface UserRepository : MongoRepository<User, String>