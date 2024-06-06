package shop.carpetandbeer.model
import lombok.Data
import org.bson.types.ObjectId
import org.jetbrains.annotations.NotNull
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "users")
@Data
class User(@Id var id: String?,
           @Indexed(unique = true)
           @NotNull
           var name: String?,
           @Indexed(unique = true)
           @NotNull
           var email: String?,
           @NotNull
           var password: String?,
           @NotNull
           var salt: String?
)

class UserRequest {
    var name: String? = null
    var email: String? = null
    var password: String? = null
}

class UserLogin {
    var email: String? = null
    var password: String? = null
}