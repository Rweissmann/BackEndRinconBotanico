from flask import jsonify, request #, Flask    # del modulo flask importar la clase Flask y los métodos jsonify,request
#from flask_cors import CORS                 # del modulo flask_cors importar CORS
#from flask_sqlalchemy import SQLAlchemy
#from flask_marshmallow import Marshmallow
from Modelos.categorias_modelo import *
from app import app, db, ma

class CategoriasSchema(ma.Schema):
    class Meta:
        fields=("idCategorias", 'CategoriasDescripcion', 'RangoidPlantas')
categoria_schema=CategoriasSchema()  # El objeto categoria_schema es para traer un producto
categorias_schema=CategoriasSchema(many=True)  # El objeto categorias_schema es para traer multiples registros de producto

# crea los endpoint o rutas (json)
@app.route('/categorias', methods=['GET'])
def get_Categorias():
    all_categorias=Categorias.query.all() # el metodo query.all() lo hereda de db.Model
    resultados=categorias_schema.dump(all_categorias)  #el metodo dump() lo hereda de ma.schema y
                                                 # trae todos los registros de la tabla
    return jsonify(resultados)     # retorna un JSON de todos los registros de la tabla

@app.route('/categorias/<id>', methods=['GET'])
def get_categoria(id):
    categoria=Categorias.query.get(id)
    return categoria_schema.jsonify(categoria)   # retorna el JSON de un producto recibido como parametro

@app.route('/categorias/<id>', methods=['DELETE'])
def delete_categoria(id):
    categoria=Categorias.query.get(id)
    db.session.delete(categoria)
    db.session.commit()                     # confirma el delete
    return categoria_schema.jsonify(categoria) # me devuelve un json con el registro eliminado

@app.route('/categorias', methods=['POST']) # crea ruta o endpoint
def create_categoria():
    #print(request.json)  # request.json contiene el json que envio el cliente
    CategoriasDescripcion=request.json['CategoriasDescripcion']
    RangoidPlantas=request.json['RangoidPlantas']
    new_categoria=Categorias(CategoriasDescripcion, RangoidPlantas) #idCategorias es autoincremento
    db.session.add(new_categoria)
    db.session.commit() # confirma el alta
    return categoria_schema.jsonify(new_categoria)

@app.route('/categorias/<id>', methods=['PUT']) #Cambia
def update_categoria():
    categoria=Categorias.query.get(id)
    categoria.CategoriasDescripcion=request.json['CategoriasDescripcion']
    categoria.RangoidPlantas=request.json['RangoidPlantas']
    #db.session.update(categoria)
    db.session.commit()    # confirma el cambio
    return categoria_schema.jsonify(categoria)    # y retorna un json con el producto


