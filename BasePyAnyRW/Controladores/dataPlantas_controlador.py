from flask import jsonify, request #, Flask  # del modulo flask importar la clase Flask y los métodos jsonify,request
#from flask_cors import CORS                 # del modulo flask_cors importar CORS
#from flask_sqlalchemy import SQLAlchemy
#from flask_marshmallow import Marshmallow
from Modelos.dataPlantas_modelo import *
from app import app, db, ma

class DataPlantasSchema(ma.Schema):
    class Meta:
        fields=('idPlantas','Ubicacion', 'Sustrato', 'Riego','Floracion','Tamano','Observaciones','LinkImagen','Estado','Proceso')
dataplanta_schema=DataPlantasSchema()  # El objeto dataplantas_schema es para traer un producto
dataplantas_schema=DataPlantasSchema(many=True)  # El objeto dataplantas_schema es para traer multiples registros de producto

# crea los endpoint o rutas (json)
@app.route('/data_plantas',methods=['GET'])
def get_DataPlantas():
    all_dataplantas=DataPlantas.query.all() # el metodo query.all() lo hereda de db.Model}
    resultados=dataplantas_schema.dump(all_dataplantas)  #el metodo dump() lo hereda de ma.schema y
                                                 # trae todos los registros de la tabla
    return jsonify(resultados)     # retorna un JSON de todos los registros de la tabla

@app.route('/data_plantas/<id>', methods=['GET'])
def get_DataPlanta(id):
    dataplanta=DataPlantas.query.get(id)
    return dataplanta_schema.jsonify(dataplanta)   # retorna el JSON de un producto recibido como parametro por id

@app.route('/data_plantas/<id>',methods=['DELETE'])
def delete_dataplanta(id):
    dataplanta=DataPlantas.query.get(id)
    db.session.delete(dataplanta)
    db.session.commit()                     # confirma el delete
    return dataplanta_schema.jsonify(dataplanta) # me devuelve un json con el registro eliminado

@app.route('/data_plantas', methods=['POST']) # crea ruta o endpoint
def create_dataplanta():
    #print(request.json)  # request.json contiene el json que envio el cliente
    idPlantas=request.json['idPlantas']
    Ubicacion=request.json['Ubicacion']
    Sustrato=request.json['Sustrato']
    Riego=request.json['Riego']
    Floracion=request.json['Floracion']
    Tamano=request.json['Tamano']
    Observaciones=request.json['Observaciones']
    LinkImagenes=request.json['LinkImagenes']
    Estado=request.json['Estado'] # por defecto "I" inactivo excepto dba confirme definitivo en cuyo caso es "A"
    Proceso=request.json['Proceso'] # por defecto "N" no procesado excepto dba confirme definitivo en cuyo caso es "P"

    new_dataplanta=DataPlantas(idPlantas, Ubicacion, Sustrato, Riego, Floracion, Tamano, Observaciones, LinkImagenes, Estado, Proceso)
    db.session.add(new_dataplanta)
    db.session.commit() # confirma el alta
    return dataplanta_schema.jsonify(new_dataplanta)

@app.route('/data_plantas/<id>' ,methods=['PUT'])
def update_dataplanta(id):
    dataplanta=DataPlantas.query.get(id)
    dataplanta.Ubicacion=request.json['Ubicacion']
    dataplanta.Sustrato=request.json['Sustrato']
    dataplanta.Riego=request.json['Riego']
    dataplanta.Floracion=request.json['Floracion']
    dataplanta.Tamano=request.json['Tamano']
    dataplanta.Observaciones=request.json['Observaciones']
    dataplanta.LinkImagenes=request.json['LinkImagenes']
    dataplanta.Estado=request.json['Estado']
    dataplanta.Proceso=request.json['Proceso']

    db.session.commit()    # confirma el cambio
    return dataplanta_schema.jsonify(dataplanta)    # y retorna un json con el dataplanta

