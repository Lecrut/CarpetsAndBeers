package shop.carpetandbeer.model

import lombok.Data
import org.jetbrains.annotations.NotNull
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.net.URL

enum class Category {
    BEER, CARPET
}

@Document(collection = "items")
@Data
class Item(
    @Id
    var id: String?,
    @NotNull
    var name: String?,
    @NotNull
    var price: Double?,
    @NotNull
    var description: String?,
    @NotNull
    var category: Category?,
    var imgURL: String?
)

class ItemRequest {
    var name: String? = null
    var price: Double? = null
    var description: String? = null
    var category: Category? = null
    var imgUrl: String? = null
}