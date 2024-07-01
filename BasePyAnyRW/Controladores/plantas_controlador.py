from flask import jsonify, request
# del modulo flask importar la clase Flask y los métodos jsonify,request
#from flask_cors import CORS       # del modulo flask_cors importar CORS
#from flask_sqlalchemy import SQLAlchemy
#from flask_marshmallow import Marshmallow
from app import app, db, ma
from Modelos.plantas_modelo import *


class PlantasSchema(ma.Schema):
    class Meta:
        fields=('idPlantas','PlantasNombre', 'Categoria', 'CategoriaDescripcion','Estado','Proceso')

planta_schema=PlantasSchema()  # El objeto planta_schema es para traer un producto
plantas_schema=PlantasSchema(many=True)  # El objeto plantas_schema es para traer multiples registros de producto

# crea los endpoint o rutas (json)
@app.route('/plantas', methods=['GET'])
def get_Plantas():
    all_plantas=Plantas.query.all() # el metodo query.all() lo hereda de db.Model
    resultados=plantas_schema.dump(all_plantas)  #el metodo dump() lo hereda de ma.schema y
                                                 # trae todos los registros de la tabla
    return jsonify(resultados)     # retorna un JSON de todos los registros de la tabla

@app.route('/plantas/<id>', methods=['GET'])
def get_planta(id):
    planta=Plantas.query.get(id)
    return planta_schema.jsonify(planta) # retorna el JSON de una planta recibida como parametro por id

@app.route('/plantas/<id>', methods=['DELETE'])
def delete_planta(id):
    planta=Plantas.query.get(id)
    db.session.delete(planta)
    db.session.commit()                  # confirma el delete
    return planta_schema.jsonify(planta) # me devuelve un json con el registro eliminado

@app.route('/plantas', methods=['POST']) # crea ruta o endpoint
def create_planta():
    #print(request.json)  # request.json contiene el json que envio el cliente
    idPlantas=request.json['idPlantas'] # Es decidido por el operador de acuerdo a la categoria 1 a 999 acuaticas, 1001 a 1999 exterior 2001 1 2999 interior
    PlantasNombre=request.json['PlantasNombre']
    Categoria=request.json['Categoria']
    CategoriaDescripcion=request.json['CategoriaDescripcion']
    Estado=request.json['Estado']
    Proceso=request.json['Proceso']
    new_planta=Plantas(idPlantas, PlantasNombre, Categoria, CategoriaDescripcion, Estado, Proceso)
    db.session.add(new_planta)
    db.session.commit() # confirma el alta
    return planta_schema.jsonify(new_planta)

@app.route('/plantas/<id>', methods=['PUT'])
def update_planta(id):
    planta=Plantas.query.get(id)
    planta.PlantasNombre=request.json['PlantasNombre']
    planta.Categoria=request.json['Categoria']
    planta.CategoriaDescripcion=request.json['CategoriaDescripcion']
    planta.Estado=request.json['Estado']
    planta.Proceso=request.json['Proceso']

    db.session.commit()    # confirma el cambio
    return planta_schema.jsonify(planta)    # y retorna un json con el producto

