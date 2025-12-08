package com.example

import org.jetbrains.exposed.sql.*

object Users : Table("Users") {
    val id = integer("Id")
    val name = text("Name")
    val email = text("Email")
    val userType = text("UserType")

    override val primaryKey = PrimaryKey(id)
}

fun initDatabase() {
    Database.connect("jdbc:sqlite:MantaDb.db", driver = "org.sqlite.JDBC")
}

@kotlinx.serialization.Serializable
data class UserDTO(val name: String, val email: String, val role: String)