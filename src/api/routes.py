"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy import select
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def create_user():
    body = request.get_json()

    if 'email' not in body or 'password' not in body:
        return jsonify({"err": "Bad request"})
    
    stmt = select(User).where(User.email == body['email'])
    existing_user = db.session.execute(stmt).scalar_one_or_none()

    if existing_user:
        return jsonify({"error": "User already exists"}), 409
    
    user = User()
    user.email = body['email']
    user.password = body['password']
    user.is_active = True
    db.session.add(user)
    db.session.commit()
    return jsonify({"ok": "User created"}),201

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()

    if 'email' not in body or 'password' not in body:
        return jsonify({"err": "Bad request"}),400
    
    email = body['email']
    password = body['password']
    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        return jsonify({"err": " El usuario no existe"}),404
    token = create_access_token(identity=str(user.id))
    
    return jsonify({"token": token}),200

@api.route('/user/personal-data',methods = ['GET'])
@jwt_required()
def get_user_data():
     current_user_id = get_jwt_identity()
  
     user = db.session.get(User,int(current_user_id))
     if user is None:
         return jsonify({"error": "User not exist"},400)
     user = user.serialize()
     return jsonify({"user" : user}), 200