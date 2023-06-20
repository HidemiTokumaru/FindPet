from dataclasses import dataclass
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.secret_key = 'my_secret_key'

db = SQLAlchemy(app)

@dataclass
class Usuario(db.Model):
    IdUser: int
    username: str
    email: str
    password: str

    IdUser = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<Usuario {self.id}>'


with app.app_context():
    db.create_all()


@app.route('/User', methods=["GET", "POST"])
def createUser():
    if request.method == "POST":
        data = request.json
        newUser = Usuario(username=data["username"], password=data["password"], email=data["email"])
        db.session.add(newUser)
        db.session.commit()
        return "SUCCESS"
    if request.method == "GET":
        usuario = Usuario.query.all()
        return jsonify(usuario)








@dataclass
class Post(db.Model):
    id: int
    IdUser: int
    PetName: str
    PetBreed: str
    PetDescription: str
    PetPhoto: str


    id = db.Column(db.Integer,primary_key=True)
    IdUser = db.Column(db.Integer, nullable=False)
    PetName = db.Column(db.String(100), nullable=False)
    PetBreed = db.Column(db.String(100), nullable=False)
    PetDescription = db.Column(db.String(100), nullable=False)
    PetPhoto = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<Post {self.id}>'


with app.app_context():
    db.create_all()



@app.route('/posts', methods=["GET", "POST", "PUT"])
def createPost():
    userId = request.args.get('userId')
    if request.method == "POST":
        if userId:
            data = request.get_json()
            newPost = Post(IdUser=userId, PetName=data["PetName"], PetBreed=data["PetBreed"],
                           PetDescription=data["PetDescription"], PetPhoto="/Perrofoto.jpg")
            db.session.add(newPost)
            db.session.add(newPost)
            db.session.commit()
        else:
            data = request.get_json()
            newPost = Post(IdUser=data["IdUser"], PetName=data["PetName"], PetBreed=data["PetBreed"],
                           PetDescription=data["PetDescription"], PetPhoto="/Perrofoto.jpg")
            db.session.add(newPost)
            db.session.add(newPost)
            db.session.commit()
        return "SUCCESS"

    if request.method == "GET":
        if userId:
            posts = Post.query.filter_by(IdUser=userId).all()
        else:
            posts = Post.query.all()
        return jsonify(posts)



@app.route('/posts/<id>', methods=["GET","PUT","DELETE"])
def modifyPost(id):
    if request.method == "GET":
        return jsonify(Post.query.get(id))

    if request.method == "PUT":
        info = request.get_json()
        post = Post.query.get(id)
        post.PetName = info["PetName"]
        post.PetBreed = info["PetBreed"]
        post.PetDescription = info["PetDescription"]
        # post.PetPhoto = info["PetPhoto"]
        db.session.commit()
        return "SUCCESS"

    if request.method == "DELETE":
        post = Post.query.get(id)
        db.session.delete(post)
        db.session.commit()
        return "SUCCESS"


if __name__ == '__main__':
    app.run(debug=True)