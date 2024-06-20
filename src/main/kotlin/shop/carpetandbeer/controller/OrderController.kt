package shop.carpetandbeer.controller

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import io.github.cdimascio.dotenv.Dotenv
import jakarta.annotation.PostConstruct
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.RequestBody.Companion.toRequestBody
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.bind.annotation.RequestBody
import shop.carpetandbeer.model.Order
import shop.carpetandbeer.model.OrderRequest
import shop.carpetandbeer.model.OrderStatus
import shop.carpetandbeer.model.PaypalOrderRequest
import shop.carpetandbeer.repository.OrderRepository
import java.io.IOException
import java.time.LocalDateTime
import java.util.*
import java.util.logging.Logger

@RestController
@RequestMapping("/api/orderapi")
class OrderController(private val repository: OrderRepository) {

    companion object {
        private val dotenv = Dotenv.load()
        private val PAYPAL_CLIENT_ID: String = dotenv["PAYPAL_CLIENT_ID"] ?: ""
        private val PAYPAL_CLIENT_SECRET: String = dotenv["PAYPAL_CLIENT_SECRET"] ?: ""
        private const val BASE_URL = "https://api-m.sandbox.paypal.com"
    }

    private val client = OkHttpClient()

    @PostConstruct
    fun init() {
        if (PAYPAL_CLIENT_ID.isEmpty() || PAYPAL_CLIENT_SECRET.isEmpty()) {
            throw IllegalStateException("MISSING_API_CREDENTIALS")
        }
    }

    @GetMapping("/getAllOrders")
    fun getAllOrders(): ResponseEntity<List<Order>> {
        return ResponseEntity.ok(repository.findAll())
    }

    @GetMapping("/{id}")
    fun getOrderById(@PathVariable id: String): ResponseEntity<Order> {
        return ResponseEntity.ok(repository.findById(id).orElseThrow { RuntimeException("Order not found") })
    }

    @GetMapping("/user/{userId}")
    fun getOrdersByUserId(@PathVariable userId: String): ResponseEntity<List<Order>> {
        val orders : List<Order> = repository.findAll()
        return ResponseEntity.ok(orders.filter { it.userId == userId })
    }

    @PostMapping("/add")
    fun createOrder(@RequestBody orderRequest: OrderRequest): ResponseEntity<Order> {
        val logger = Logger.getLogger(OrderController::class.java.name)
        logger.info("Order request: $orderRequest")
        val order = Order(
            id = null,
            userId = orderRequest.userId,
            items = orderRequest.items,
            totalPrice = orderRequest.totalPrice,
            orderDate = LocalDateTime.now(),
            status = OrderStatus.RECEIVED,
            address = orderRequest.address,
            paymentId = null
        )
        return ResponseEntity.ok(repository.save(order))
    }

    @PostMapping("/orders")
    fun createOrder(@RequestBody paypalOrder: PaypalOrderRequest): ResponseEntity<Map<String, Any>> {
        val order: Order = repository.findById(paypalOrder.orderId).orElseThrow { RuntimeException("Order not found") }

        val accessToken = generateAccessToken() ?: throw RuntimeException("Failed to generate access token")
        val logger = Logger.getLogger(OrderController::class.java.name)
        logger.info("access token: $accessToken")
        val url = "$BASE_URL/v2/checkout/orders"
        val payload = """
            {
                "intent": "CAPTURE",
                "purchase_units": [{
                    "amount": {
                        "currency_code": "PLN",
                        "value": "${paypalOrder.orderPrice}"
                    }
                }]
            }
        """.trimIndent().toRequestBody("application/json".toMediaTypeOrNull())

        val request = Request.Builder()
            .url(url)
            .post(payload)
            .addHeader("Content-Type", "application/json")
            .addHeader("Authorization", "Bearer $accessToken")
            .build()

        val response = client.newCall(request).execute()
        val responseBody = response.body?.string() ?: throw RuntimeException("Response body is null")
        val mapper: ObjectMapper = jacksonObjectMapper()
        val jsonObject = mapper.readTree(responseBody)
        val id = jsonObject.get("id").asText()
        order.paymentId = id
        order.status = OrderStatus.PENDING
        repository.save(order)
        val jsonResponseBody = mapper.readTree(responseBody)
        return ResponseEntity.status(response.code).body(mapOf("response" to jsonResponseBody))
    }

    @PostMapping("/orders/{orderID}/{paypalOrderId}")
    fun captureOrder(@PathVariable orderID: String, @PathVariable paypalOrderId: String): ResponseEntity<Map<String, Any>> {
        val accessToken = generateAccessToken() ?: throw RuntimeException("Failed to generate access token")
        val order: Order = repository.findById(orderID).orElseThrow { RuntimeException("Order not found") }
        val logger = Logger.getLogger(OrderController::class.java.name)
        logger.info("Access token: $accessToken")

        val url = "$BASE_URL/v2/checkout/orders/$paypalOrderId/capture"
        val request = Request.Builder()
            .url(url)
            .post("".toRequestBody("application/json".toMediaTypeOrNull()))
            .addHeader("Content-Type", "application/json")
            .addHeader("Authorization", "Bearer $accessToken")
            .build()
        logger.info("Request: $request")
        val response = client.newCall(request).execute()
        val responseBody = response.body?.string() ?: throw RuntimeException("Response body is null")
        logger.info("Response: $responseBody")

        order.status = OrderStatus.COMPLETED
        repository.save(order)

        val mapper: ObjectMapper = jacksonObjectMapper()
        val jsonResponseBody = mapper.readTree(responseBody)
        return ResponseEntity.status(response.code).body(mapOf("response" to jsonResponseBody))
    }

    private fun generateAccessToken(): String? {
        val auth = Base64.getEncoder().encodeToString("$PAYPAL_CLIENT_ID:$PAYPAL_CLIENT_SECRET".toByteArray())
        val request = Request.Builder()
            .url("$BASE_URL/v1/oauth2/token")
            .post("grant_type=client_credentials".toRequestBody("application/x-www-form-urlencoded".toMediaTypeOrNull()))
            .addHeader("Authorization", "Basic $auth")
            .build()

        return try {
            val response = client.newCall(request).execute()
            val jsonResponse = response.body?.string() ?: return null
            val mapper: ObjectMapper = jacksonObjectMapper()
            val jsonObject = mapper.readTree(jsonResponse)
            jsonObject.get("access_token").asText()
        } catch (e: IOException) {
            e.printStackTrace()
            null
        }
    }
}
