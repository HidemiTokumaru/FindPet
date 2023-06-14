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


if __name__ == '__main__':
    app.run(debug=True)