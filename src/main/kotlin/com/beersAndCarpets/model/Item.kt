package com.beersAndCarpets.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

enum class Category {
    BEER, CARPET
}

@Document
class Item(@Id var id: String?, var name: String?, var price: Double?, var description: String?,
           var category: Category?
)

class ItemRequest {
    var name: String? = null
    var price: Double? = null
    var description: String? = null
    var category: Category? = null
}