package com.example

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import com.example.Users
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction

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
            val name = call.parameters["name"] ?: "Незнайомець"

            val responseText = "Привіт, $name! Твій запит успішно оброблено сервером Ktor."

            call.respondText(responseText)
        }
        get("/api/calc") {
            try {
                val a = call.request.queryParameters["a"]?.toInt()
                    ?: throw IllegalArgumentException("Не вказано число A")
                val b = call.request.queryParameters["b"]?.toInt()
                    ?: throw IllegalArgumentException("Не вказано число B")

                val sum = a + b

                call.respondText("Результат обчислення на сервері: $a + $b = $sum")
            } catch (e: NumberFormatException) {
                call.respondText("Помилка: Введіть цілі числа!", status = HttpStatusCode.BadRequest)
            } catch (e: IllegalArgumentException) {
                call.respondText("Помилка: ${e.message}", status = HttpStatusCode.BadRequest)
            }
        }

        get("/api/users") {
            println("=== ЗАПИТ НА /api/users ОТРИМАНО ===")

            try {
                val jsonString = transaction {
                    val count = Users.selectAll().count()
                    println("Знайдено записів у базі: $count")

                    Users.selectAll().map { row ->
                        """
                        {
                            "name": "${row[Users.name]}",
                            "email": "${row[Users.email]}", 
                            "role": "${row[Users.userType]}"
                        }
                        """.trimIndent()
                    }.joinToString(separator = ",", prefix = "[", postfix = "]")
                }

                println("Відправляю клієнту: $jsonString")
                call.respondText(jsonString, ContentType.Application.Json)

            } catch (e: Exception) {
                println("!!! ПОМИЛКА: ${e.message}")
                e.printStackTrace()
                call.respondText("Error: ${e.message}", status = HttpStatusCode.InternalServerError)
            }
        }
    }
}

