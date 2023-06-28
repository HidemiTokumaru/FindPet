package com.example.myfindpets

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import org.json.JSONArray
import org.json.JSONObject
import java.io.BufferedInputStream
import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL

class LoginActivity : AppCompatActivity() {
    private lateinit var usernameEditText: EditText
    private lateinit var passwordEditText: EditText
    private lateinit var loginButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        usernameEditText = findViewById(R.id.editTextUsername)
        passwordEditText = findViewById(R.id.editTextPassword)
        loginButton = findViewById(R.id.buttonLogin)

        loginButton.setOnClickListener {
            val username = usernameEditText.text.toString()
            val password = passwordEditText.text.toString()

            if (username.isNotEmpty() && password.isNotEmpty()) {
                authenticateUser(username, password)
            } else {
                Toast.makeText(this, "Complete todos los campos", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun authenticateUser(username: String, password: String) {
        val url = URL("http://10.100.249.84:5000/User")
        val connection = url.openConnection() as HttpURLConnection

        connection.requestMethod = "GET"
        val inputStream = BufferedInputStream(connection.inputStream)
        val bufferedReader = BufferedReader(InputStreamReader(inputStream))
        val response = bufferedReader.readLine()

        val users = JSONArray(response)

        var userId: Int? = null

        for (i in 0 until users.length()) {
            val user = users.getJSONObject(i)
            val dbUsername = user.getString("username")
            val dbPassword = user.getString("password")

            if (dbUsername == username && dbPassword == password) {
                userId = user.getInt("id")
                break
            }
        }

        if (userId != null) {
            val intent = Intent(this, MainActivity::class.java)
            intent.putExtra("userId", userId) // Agregar el ID como extra
            startActivity(intent)
            finish()
        } else {
            Toast.makeText(this, "Usuario no existente", Toast.LENGTH_SHORT).show()
        }
    }
}