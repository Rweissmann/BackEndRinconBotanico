from flask import jsonify, request #, Flask    # del modulo flask importar la clase Flask y los métodos jsonify,request
#from flask_cors import CORS                 # del modulo flask_cors importar CORS
#from flask_sqlalchemy import SQLAlchemy
#from flask_marshmallow import Marshmallow
from Modelos.contactosSuscriptos_modelo import *
from app import app, db, ma

class ProcesoSchema(ma.Schema):
    class Meta:
        fields=("idProceso", 'ProcesoDescripcion')
proceso_schema=ProcesoSchema()  # El objeto contactosuscripto_schema es para traer un producto
procesos_schema=ProcesoSchema(many=True)  # El objeto contactossuscriptos_schema es para traer multiples registros de producto

# crea los endpoint o rutas (json)
@app.route('/proceso', methods=['GET'])
def get_procesos():
    all_procesos=Proceso.query.all() # el metodo query.all() lo hereda de db.Model
    resultados=procesos_schema.dump(all_procesos)  #el metodo dump() lo hereda de ma.schema y
                                                 # trae todos los registros de la tabla
    return jsonify(resultados)     # retorna un JSON de todos los registros de la tabla

@app.route('/proceso/<id>', methods=['GET'])
def get_proceso(id):
    proceso=Proceso.query.get(id)
    return proceso_schema.jsonify(proceso)   # retorna el JSON de un producto recibido como parametro

@app.route('/proceso/<id>', methods=['DELETE'])
def delete_proceso(id):
    proceso=Proceso.query.get(id)
    db.session.delete(proceso)
    db.session.commit()                     # confirma el delete
    return proceso_schema.jsonify(proceso) # me devuelve un json con el registro eliminado

@app.route('/proceso', methods=['POST']) # crea ruta o endpoint
def create_proceso():
    #print(request.json)  # request.json contiene el json que envio el cliente
    idProceso=request.json['idProceso']
    ProcesoDescripcion=request.json['ProcesoDescripcion']
    new_proceso=Proceso(idProceso, ProcesoDescripcion) #idProceso no es autoincremento es I o A
    db.session.add(new_proceso)
    db.session.commit() # confirma el alta
    return proceso_schema.jsonify(new_proceso)

@app.route('/proceso/<id>', methods=['PUT']) #Cambia
def update_proceso(id):
    proceso=Proceso.query.get(id)
    ProcesoDescripcion=request.json['ProcesoDescripcion']
    #db.session.update(proceso)
    db.session.commit()    # confirma el cambio
    return proceso_schema.jsonify(proceso)    # y retorna un json con el producto


