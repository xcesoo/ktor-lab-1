package com.example

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        staticResources("/", "static")

        get("/api/hello") {
            val jsonResponse = """
                {
                    "message": "Привіт! Це дані з Ktor сервера.",
                    "time": "${System.currentTimeMillis()}"
                }
            """.trimIndent()

            call.respondText(jsonResponse, ContentType.Application.Json)
        }
        get("/api/greet/{name}") {
            // Отримуємо значення, яке прийшло в адресі
            val name = call.parameters["name"] ?: "Незнайомець"

            // Логіка сервера: формуємо відповідь
            val responseText = "Привіт, $name! Твій запит успішно оброблено сервером Ktor."

            // Відправляємо простий текст
            call.respondText(responseText)
        }
        get("/api/calc") {
            try {
                // Зчитуємо параметри з адреси. Якщо їх немає — кидаємо помилку
                val a = call.request.queryParameters["a"]?.toInt()
                    ?: throw IllegalArgumentException("Не вказано число A")
                val b = call.request.queryParameters["b"]?.toInt()
                    ?: throw IllegalArgumentException("Не вказано число B")

                val sum = a + b

                // Сервер рахує і відповідає
                call.respondText("Результат обчислення на сервері: $a + $b = $sum")
            } catch (e: NumberFormatException) {
                call.respondText("Помилка: Введіть цілі числа!", status = HttpStatusCode.BadRequest)
            } catch (e: IllegalArgumentException) {
                call.respondText("Помилка: ${e.message}", status = HttpStatusCode.BadRequest)
            }
        }
    }
}

