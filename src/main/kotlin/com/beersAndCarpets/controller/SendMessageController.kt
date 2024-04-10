package com.beersAndCarpets.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/message")
class SendMessageController {

    @GetMapping("/getMessage")
    fun sendMessage(): String {
        return "Message sent!"
    }
}