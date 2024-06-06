package com.beersAndCarpets.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
class User(@Id var id: String?, var name: String?,
           var email: String?, var password: String?
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