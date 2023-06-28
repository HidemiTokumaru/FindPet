//package com.example.myfindpets
//
//import android.content.Intent
//import android.os.Bundle
//import android.os.Handler
//import android.os.Looper
//import android.widget.ArrayAdapter
//import android.widget.Button
//import android.widget.ListView
//import android.widget.Toast
//import androidx.appcompat.app.AppCompatActivity
//import okhttp3.*
//import org.json.JSONArray
//import java.io.IOException
//
//class MainActivity2 : AppCompatActivity() {
//
//    private lateinit var listViewPosts: ListView
//    private lateinit var buttonBack: Button
//    private val handler = Handler(Looper.getMainLooper())
//
//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//        setContentView(R.layout.activity_main2)
//
//        listViewPosts = findViewById(R.id.listViewPosts)
//        buttonBack = findViewById(R.id.buttonBack)
//
//        buttonBack.setOnClickListener {
//            val intent = Intent(this, MainActivity::class.java)
//            startActivity(intent)
//            finish()
//        }
//
//        getPostsFromServer()
//    }
//
//    private fun getPostsFromServer() {
//        val client = OkHttpClient()
//        val url = "http://10.100.241.104:8080/posts"
//
//        val request = Request.Builder().url(url).build()
//
//        client.newCall(request).enqueue(object : Callback {
//            override fun onFailure(call: Call, e: IOException) {
//                e.printStackTrace()
//                runOnUiThread {
//                    val errorMessage = "Error en la comunicación con el servidor: ${e.message}"
//                    Toast.makeText(this@MainActivity2, errorMessage, Toast.LENGTH_SHORT).show()
//                }
//            }
//
//            override fun onResponse(call: Call, response: Response) {
//                response.body?.let { responseBody ->
//                    val responseData = responseBody.string()
//
//                    try {
//                        val jsonArray = JSONArray(responseData)
//
//                        val posts = mutableListOf<String>()
//
//                        for (i in 0 until jsonArray.length()) {
//                            val post = jsonArray.getJSONObject(i)
//                            val petName = post.getString("PetName")
//                            val petBreed = post.getString("PetBreed")
//                            val petDescription = post.getString("PetDescription")
//                            val petReference = post.getString("PetReference")
//                            val petOwner = post.getString("PetOwner")
//                            val postId = post.getString("Id")
//
//                            val formattedPost = "Nombre de la mascota: $petName\n" +
//                                    "Raza de la mascota: $petBreed\n" +
//                                    "Descripción de la mascota: $petDescription\n" +
//                                    "Referencia de la mascota: $petReference\n" +
//                                    "Propietario de la mascota: $petOwner"
//
//                            posts.add(formattedPost)
//
//                            // Agregar botón de eliminar en cada post
//                            val deleteButton = Button(this@MainActivity2)
//                            deleteButton.text = "Eliminar"
//                            deleteButton.setOnClickListener {
//                                deletePost(postId)
//                            }
//                            listViewPosts.addFooterView(deleteButton)  // Agregar el botón como pie de página del ListView
//                        }
//
//                        handler.post {
//                            val adapter = ArrayAdapter(
//                                this@MainActivity2,
//                                android.R.layout.simple_list_item_1,
//                                posts
//                            )
//                            listViewPosts.adapter = adapter
//                        }
//                    } catch (e: Exception) {
//                        e.printStackTrace()
//                    }
//                }
//            }
//        })
//    }
//
//
//    private fun deletePost(id: String) {
//        val client = OkHttpClient()
//        val url = "http://10.100.241.104:8080/posts/$id"
//
//        val request = Request.Builder()
//            .url(url)
//            .delete()
//            .build()
//
//        client.newCall(request).enqueue(object : Callback {
//            override fun onFailure(call: Call, e: IOException) {
//                e.printStackTrace()
//                runOnUiThread {
//                    val errorMessage = "Error en la comunicación con el servidor: ${e.message}"
//                    Toast.makeText(this@MainActivity2, errorMessage, Toast.LENGTH_SHORT).show()
//                }
//            }
//
//            override fun onResponse(call: Call, response: Response) {
//                if (response.isSuccessful) {
//                    handler.post {
//                        Toast.makeText(this@MainActivity2, "Post eliminado", Toast.LENGTH_SHORT).show()
//                        // Actualizar la lista de posts nuevamente después de eliminar el post
//                        getPostsFromServer()
//                    }
//                } else {
//                    handler.post {
//                        Toast.makeText(
//                            this@MainActivity2,
//                            "Error al eliminar el post",
//                            Toast.LENGTH_SHORT
//                        ).show()
//                    }
//                }
//            }
//        })
//    }
//
//}




package com.example.myfindpets

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.ListView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import okhttp3.*
import org.json.JSONArray
import java.io.IOException

class MainActivity2 : AppCompatActivity() {

    private lateinit var listViewPosts: ListView
    private lateinit var buttonBack: Button
    private val handler = Handler(Looper.getMainLooper())

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main2)

        listViewPosts = findViewById(R.id.listViewPosts)
        buttonBack = findViewById(R.id.buttonBack)

        buttonBack.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
            finish()
        }

        getPostsFromServer()
    }

    private fun getPostsFromServer() {
        val client = OkHttpClient()
        val url = "http://10.100.249.84:5000/posts"

        val request = Request.Builder().url(url).build()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                e.printStackTrace()
                runOnUiThread {
                    val errorMessage = "Error en la comunicación con el servidor: ${e.message}"
                    Toast.makeText(this@MainActivity2, errorMessage, Toast.LENGTH_SHORT).show()
                }
            }

            override fun onResponse(call: Call, response: Response) {
                response.body?.let { responseBody ->
                    val responseData = responseBody.string()

                    try {
                        val jsonArray = JSONArray(responseData)

                        val posts = mutableListOf<String>()

                        for (i in 0 until jsonArray.length()) {
                            val post = jsonArray.getJSONObject(i)
                            val petName = post.getString("PetName")
                            val petBreed = post.getString("PetBreed")
                            val petDescription = post.getString("PetDescription")
                            val petReference = post.getString("PetReference")
                            val petOwner = post.getString("PetOwner")
                            val petPhone = post.getString("PetPhone")

                            val formattedPost = "Nombre de la mascota: $petName\n" +
                                    "Raza de la mascota: $petBreed\n" +
                                    "Descripción de la mascota: $petDescription\n" +
                                    "Referencia de la mascota: $petReference\n" +
                                    "Propietario de la mascota: $petOwner\n" +
                                    "Número de contacto: $petPhone"

                            posts.add(formattedPost)
                        }

                        handler.post {
                            val adapter = ArrayAdapter(
                                this@MainActivity2,
                                android.R.layout.simple_list_item_1,
                                posts
                            )
                            listViewPosts.adapter = adapter
                        }
                    } catch (e: Exception) {
                        e.printStackTrace()
                    }
                }
            }
        })
    }


}