package shop.carpetandbeer.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import shop.carpetandbeer.model.Item
import shop.carpetandbeer.model.ItemRequest
import shop.carpetandbeer.repository.ItemRepository

@RestController
@RequestMapping("/itemapi")
class ItemController(private val repository: ItemRepository) {
    @GetMapping("/getAllItems")
    fun getAllItems() : ResponseEntity<List<Item>> {
        return ResponseEntity.ok(repository.findAll())
    }

    @GetMapping("/{id}")
    fun getItemById(@PathVariable id: String) : ResponseEntity<Item> {
        return ResponseEntity.ok(repository.findById(id).get())
    }

    @PostMapping("/add")
    fun createItem(@RequestBody item: ItemRequest) : ResponseEntity<Item> {
        val itemReq = Item(null, item.name, item.price, item.description, item.category)
        return ResponseEntity.ok(repository.save(itemReq))
    }

    @PutMapping("/{id}")
    fun updateItem(@PathVariable id: String, @RequestBody item: ItemRequest) : ResponseEntity<Item> {
        val itemToUpdate = repository.findById(id).orElse(null)
        itemToUpdate?.let {
            it.name = item.name
            it.price = item.price
            it.description = item.description
            it.category = item.category
            return ResponseEntity.ok().body(repository.save(it))
        }
        return ResponseEntity.notFound().build()
    }

    @DeleteMapping("/{id}")
    fun deleteItem(@PathVariable id: String) : ResponseEntity<Unit> {
        repository.deleteById(id)
        return ResponseEntity.ok().build()
    }
}