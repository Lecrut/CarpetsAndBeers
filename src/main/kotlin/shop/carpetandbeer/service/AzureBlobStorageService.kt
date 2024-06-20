package shop.carpetandbeer.service

import com.azure.storage.blob.BlobClientBuilder
import com.azure.storage.blob.models.BlobHttpHeaders
import io.github.cdimascio.dotenv.Dotenv
import org.springframework.stereotype.Service
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.net.URL
import java.util.*
import javax.imageio.ImageIO

@Service
class AzureBlobStorageService {
    private val containerName = "beerscarpets"
    private val dotEnv = Dotenv.load()
    private val sasToken = dotEnv["SAS_TOKEN_AZURE"]

    fun uploadToBlobStorage(imageData: String): URL {
        val blobName = "${UUID.randomUUID()}.jpeg"
        val blobClient = BlobClientBuilder()
            .endpoint("https://${containerName}.blob.core.windows.net/items-photos?${sasToken}")
            .blobName(blobName)
            .buildClient()

        val base64Image = imageData.split(",")[1]
        val imageBytes = Base64.getDecoder().decode(base64Image)

        val img = ImageIO.read(ByteArrayInputStream(imageBytes))


        val os = ByteArrayOutputStream()
        ImageIO.write(img, "png", os)
        val inputStream = ByteArrayInputStream(os.toByteArray())

        val length = inputStream.available().toLong()

        blobClient.upload(inputStream, length)

        val headers = BlobHttpHeaders()
        headers.contentType = "image/jpeg"
        blobClient.setHttpHeaders(headers)

        return URL(blobClient.blobUrl)
    }
}