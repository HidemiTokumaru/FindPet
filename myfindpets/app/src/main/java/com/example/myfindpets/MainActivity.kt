package com.example.myfindpets

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject
import java.io.IOException

class MainActivity : AppCompatActivity() {


    private lateinit var editTextPetName: EditText
    private lateinit var editTextPetBreed: EditText
    private lateinit var editTextPetDescription: EditText
    private lateinit var editTextPetReference: EditText
    private lateinit var editTextPetOwner: EditText
    private lateinit var buttonSend: Button
    private lateinit var buttonShowPosts: Button

    private val handler = Handler(Looper.getMainLooper())

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        editTextPetName = findViewById(R.id.editTextPetName)
        editTextPetBreed = findViewById(R.id.editTextPetBreed)
        editTextPetDescription = findViewById(R.id.editTextPetDescription)
        editTextPetReference = findViewById(R.id.editTextPetReference)
        editTextPetOwner = findViewById(R.id.editTextPetOwner)
        buttonSend = findViewById(R.id.buttonSend)
        buttonShowPosts = findViewById(R.id.buttonShowPosts)

        buttonShowPosts.setOnClickListener {
            startActivity(Intent(this, MainActivity2::class.java))
        }
        buttonSend.setOnClickListener {
            val petName = editTextPetName.text.toString()
            val petBreed = editTextPetBreed.text.toString()
            val petDescription = editTextPetDescription.text.toString()
            val petReference = editTextPetReference.text.toString()
            val petOwner = editTextPetOwner.text.toString()

            val dataObject = JSONObject()
            dataObject.put("PetName", petName)
            dataObject.put("PetBreed", petBreed)
            dataObject.put("PetDescription", petDescription)
            dataObject.put("PetReference", petReference)
            dataObject.put("PetOwner", petOwner)

            val data = dataObject.toString()

            Thread {
                sendDataToServer(data)
            }.start()
        }
    }

    private fun sendDataToServer(data: String) {
        try {
            val client = OkHttpClient()
            val body = data.toRequestBody("application/json".toMediaTypeOrNull())
            val url = "http://10.100.241.104:8080/posts" // Replace with your server IP address and port number
            val request = Request.Builder().url(url).post(body).build()
            client.newCall(request).enqueue(object : Callback {
                override fun onFailure(call: Call, e: IOException) {
                    e.printStackTrace()
                    runOnUiThread {
                        val errorMessage = "Error en la comunicación con el servidor: ${e.message}"
                        Toast.makeText(this@MainActivity, errorMessage, Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onResponse(call: Call, response: Response) {
                    response.body?.let { responseBody ->
                        val responseData = responseBody.string()
                        // Process the response if needed

                        handler.post {
                            // Update the UI on the main thread if needed
                        }
                    }
                }
            })
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}