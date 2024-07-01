from flask import jsonify, request #, Flask  # del modulo flask importar la clase Flask y los métodos jsonify,request
#from flask_cors import CORS                 # del modulo flask_cors importar CORS
#from flask_sqlalchemy import SQLAlchemy
#from flask_marshmallow import Marshmallow
from Modelos.mensajes_modelo import *
from app import app, db, ma

class MensajesSchema(ma.Schema):
    class Meta:
        fields=('idMensajes','NombreYApellido', 'Email', 'Direccion','Celular','CodigoArea', 'Area', 'Mensaje', 'Archivo', 'Estado', 'Proceso')
mensaje_schema=MensajesSchema()  # El objeto mensaje_schema es para traer un producto
mensajes_schema=MensajesSchema(many=True)  # El objeto mensajes_schema es para traer multiples registros de producto

# crea los endpoint o rutas (json)
@app.route('/mensajes', methods=['GET'])
def get_Mensajes():
    all_mensajes=Mensajes.query.all() # el metodo query.all() lo hereda de db.Model
    resultados=mensajes_schema.dump(all_mensajes)  #el metodo dump() lo hereda de ma.schema y
                                                 # trae todos los registros de la tabla
    return jsonify(resultados)     # retorna un JSON de todos los registros de la tabla

@app.route('/mensajes/<id>', methods=['GET'])
def get_mensaje(id):
    mensaje=Mensajes.query.get(id)
    return mensaje_schema.jsonify(mensaje)   # retorna el JSON de un producto recibido como parametro

@app.route('/mensajes/<id>', methods=['DELETE'])
def delete_mensaje(id):
    mensaje=Mensajes.query.get(id)
    db.session.delete(mensaje)
    db.session.commit()                     # confirma el delete
    return mensaje_schema.jsonify(mensaje) # me devuelve un json con el registro eliminado

@app.route('/mensajes', methods=['POST']) # crea ruta o endpoint
def create_mensaje():
    #print(request.json)  # request.json contiene el json que envio el cliente # idMensajes es autonumerico
    NombreYApellido=request.json['NombreYApellido']
    Email=request.json['Email']
    Direccion=request.json['Direccion']
    Celular=request.json['Celular']
    CodigoArea=request.json['CodigoArea']
    Area=request.json['Area']
    Mensaje=request.json['Mensaje']
    Archivo=request.json['Archivo']
    Estado=request.json['Estado']
    Proceso=request.json['Proceso']

    new_mensaje=Mensajes(NombreYApellido, Email, Direccion, Celular, CodigoArea, Area, Mensaje, Archivo, Estado, Proceso)
    db.session.add(new_mensaje)
    db.session.commit() # confirma el alta
    return mensaje_schema.jsonify(new_mensaje)

@app.route('/mensajes/<id>' ,methods=['PUT'])
def update_mensajes(id):
    mensaje=Mensajes.query.get(id) # Es autonumerico
    mensaje.NombreYApellido=request.json['NombreYApellido']
    mensaje.Email=request.json['Email']
    mensaje.Direccion=request.json['Direccion']
    mensaje.Celular=request.json['Celular']
    mensaje.CodigoArea=request.json['CodigoArea']
    mensaje.Area=request.json['Area']
    mensaje.Mensaje=request.json['Mensaje']
    mensaje.Archivo=request.json['Archivo']
    mensaje.Estado=request.json['Estado']
    mensaje.Proceso=request.json['Proceso']

    db.session.commit()    # confirma el cambio
    return mensaje_schema.jsonify(mensaje)    # y retorna un json con el producto