package com.beersAndCarpets.controller

import com.beersAndCarpets.model.Item
import com.beersAndCarpets.model.ItemRequest
import com.beersAndCarpets.repository.ItemRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/item")
class ItemController(private val repository: ItemRepository) {
    @GetMapping("/")
    fun getAllItems() : ResponseEntity<List<Item>> {
        return ResponseEntity.ok(repository.findAll())
    }

    @GetMapping("/{id}")
    fun getItemById(@PathVariable id: String) : ResponseEntity<Item> {
        return ResponseEntity.ok(repository.findById(id).get())
    }

    @PostMapping("/")
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