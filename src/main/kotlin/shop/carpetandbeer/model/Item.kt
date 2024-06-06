package shop.carpetandbeer.model

import lombok.Data
import org.jetbrains.annotations.NotNull
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

enum class Category {
    BEER, CARPET
}

@Document(collection = "items")
@Data
class Item(@Id
           var id: String?,
           @NotNull
           var name: String?,
           @NotNull
           var price: Double?,
           @NotNull
           var description: String?,
           @NotNull
           var category: Category?
)

class ItemRequest {
    var name: String? = null
    var price: Double? = null
    var description: String? = null
    var category: Category? = null
}