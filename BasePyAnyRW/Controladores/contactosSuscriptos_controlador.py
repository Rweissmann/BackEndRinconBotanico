from flask import jsonify, request #, Flask    # del modulo flask importar la clase Flask y los métodos jsonify,request
#from flask_cors import CORS                 # del modulo flask_cors importar CORS
#from flask_sqlalchemy import SQLAlchemy
#from flask_marshmallow import Marshmallow
from Modelos.contactosSuscriptos_modelo import *
from app import app, db, ma

class ContactosSuscriptosSchema(ma.Schema):
    class Meta:
        fields=("idContacto", 'Emails')
contactosuscripto_schema=ContactosSuscriptosSchema()  # El objeto contactosuscripto_schema es para traer un producto
contactossuscriptos_schema=ContactosSuscriptosSchema(many=True)  # El objeto contactossuscriptos_schema es para traer multiples registros de producto

# crea los endpoint o rutas (json)
@app.route('/contactos_suscriptos', methods=['GET'])
def get_ContactosSuscriptos():
    all_contactos=ContactosSuscriptos.query.all() # el metodo query.all() lo hereda de db.Model
    resultados=contactossuscriptos_schema.dump(all_contactos)  #el metodo dump() lo hereda de ma.schema y
                                                 # trae todos los registros de la tabla
    return jsonify(resultados)     # retorna un JSON de todos los registros de la tabla

@app.route('/contactos_suscriptos/<id>', methods=['GET'])
def get_contactosuscripto(id):
    contactosuscripto=ContactosSuscriptos.query.get(id)
    return contactosuscripto_schema.jsonify(contactosuscripto)   # retorna el JSON de un producto recibido como parametro

@app.route('/contactos_suscriptos/<id>', methods=['DELETE'])
def delete_contactosuscripto(id):
    contactosuscripto=ContactosSuscriptos.query.get(id)
    db.session.delete(contactosuscripto)
    db.session.commit()                  # confirma el delete
    return contactosuscripto_schema.jsonify(contactosuscripto) # me devuelve un json con el registro eliminado
 
@app.route('/contactos_suscriptos', methods=['POST']) # crea ruta o endpoint
def create_contactosuscripto():
    #print(request.json)  # request.json contiene el json que envio el cliente
    Emails=request.json['Emails']
    new_contactosuscripto=ContactosSuscriptos() #idContacto es autoincremento
    db.session.add(new_contactosuscripto)
    db.session.commit() # confirma el alta
    return contactosuscripto_schema.jsonify(new_contactosuscripto)

@app.route('/contactos_suscriptos/<id>', methods=['PUT']) #Cambia email
def update_contactosuscripto(id):
    contactosuscripto=ContactosSuscriptos.query.get(id)
    contactosuscripto.Emails=request.json['Emails']
    #db.session.update(contactosuscripto)
    db.session.commit()    # confirma el cambio
    return contactosuscripto_schema.jsonify(contactosuscripto)    # y retorna un json con el producto