package shop.carpetandbeer.service

import com.azure.storage.blob.BlobClientBuilder
import com.azure.storage.blob.models.BlobHttpHeaders
import org.springframework.stereotype.Service
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.net.URL
import java.util.*
import javax.imageio.ImageIO

@Service
class AzureBlobStorageService {

    private val connectionString =
        "DefaultEndpointsProtocol=https;AccountName=beerscarpets;AccountKey=3sCRt/UHmC2lJsvKPsfUEGwkXFIP77UoaQEJrtzk6dlhdHyPJ/NMDph260nmdhG3fKefu+mkW7MV+AStzZoFog==;EndpointSuffix=core.windows.net"
    private val containerName = "beerscarpets"
    private val sasToken =
        "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-03-10T23:36:11Z&st=2024-06-20T14:36:11Z&spr=https,http&sig=jz5i4ZLhXicY%2FqDPVb1j80b%2FpIohGjlUMGkgkITg0Cg%3D"

    fun uploadToBlobStorage(imageData: String): URL {
        val blobName = "${UUID.randomUUID().toString()}.jpeg"
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