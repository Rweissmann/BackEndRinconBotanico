from flask import jsonify, request #, Flask    # del modulo flask importar la clase Flask y los métodos jsonify,request
#from flask_cors import CORS                 # del modulo flask_cors importar CORS
#from flask_sqlalchemy import SQLAlchemy
#from flask_marshmallow import Marshmallow
from Modelos.contactosSuscriptos_modelo import *
from app import app, db, ma

class EstadosSchema(ma.Schema):
    class Meta:
        fields=("idEstado", 'EstadoDescripcion')
estado_schema=EstadosSchema()  # El objeto contactosuscripto_schema es para traer un producto
estados_schema=EstadosSchema(many=True)  # El objeto contactossuscriptos_schema es para traer multiples registros de producto

# crea los endpoint o rutas (json)
@app.route('/estado', methods=['GET'])
def get_Estados():
    all_estados=Estados.query.all() # el metodo query.all() lo hereda de db.Model
    resultados=estados_schema.dump(all_estados)  #el metodo dump() lo hereda de ma.schema y
                                                 # trae todos los registros de la tabla
    return jsonify(resultados)     # retorna un JSON de todos los registros de la tabla

@app.route('/estado/<id>', methods=['GET'])
def get_estado(id):
    estado=Estados.query.get(id)
    return estado_schema.jsonify(estado)   # retorna el JSON de un producto recibido como parametro

@app.route('/estado/<id>', methods=['DELETE'])
def delete_estado(id):
    estado=Estados.query.get(id)
    db.session.delete(estado)
    db.session.commit()                     # confirma el delete
    return estado_schema.jsonify(estado) # me devuelve un json con el registro eliminado

@app.route('/estado', methods=['POST']) # crea ruta o endpoint
def create_estado():
    #print(request.json)  # request.json contiene el json que envio el cliente
    idEstado=request.json['idEstado']
    EstadoDescripcion=request.json['EstadoDescripcion']
    new_estado=Estado(idEstado, EstadoDescripcion) #idEstado no es autoincremento es I o A
    db.session.add(new_estado)
    db.session.commit() # confirma el alta
    return estado_schema.jsonify(new_estado)

@app.route('/estado/<id>', methods=['PUT']) #Cambia email
def update_estado(id):
    estado=Estados.query.get(id)
    estado.EstadoDescripcion=request.json['EstadoDescripcion']
    #db.session.update(estado)
    db.session.commit()    # confirma el cambio
    return estado_schema.jsonify(estado)    # y retorna un json con el producto


