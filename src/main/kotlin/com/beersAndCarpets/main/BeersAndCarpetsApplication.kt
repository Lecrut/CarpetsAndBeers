package com.beersAndCarpets.main

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan

@SpringBootApplication
@ComponentScan("com.beersAndCarpets")
class BeersAndCarpetsApplication

fun main(args: Array<String>) {
	runApplication<BeersAndCarpetsApplication>(*args)
}
