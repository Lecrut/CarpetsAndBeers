package shop.carpetandbeer.model

import lombok.Data
import org.jetbrains.annotations.NotNull
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime

@Document(collection = "orders")
@Data
class Order (
    @Id
    var id: String?,
    @NotNull
    var userId: String?,
    @NotNull
    var items: List<CartItem>, //number of items and item
    @NotNull
    var totalPrice: Double?,
    @NotNull
    var orderDate: LocalDateTime?,
    @NotNull
    var status: OrderStatus?,
    @NotNull
    var address: Address?,
    @NotNull
    var paymentId: String?
)

enum class OrderStatus {
    RECEIVED, PENDING, DELIVERED, CANCELLED
}

class OrderRequest(
    var userId: String?,
    var items: List<CartItem>, //id produktu -> ilość produktu
    var totalPrice: Double?,
    var address: Address?
)

class CartItem(
    var id: String?,
    var quantity: Int
)

class Address (
    var number: String?,
    var building: String? = null,
    var street: String? = null,
    var city: String? = null,
    var zip: String? = null
)

class PaypalOrderRequest (
    var orderPrice: Int,
    var orderId: String
)
