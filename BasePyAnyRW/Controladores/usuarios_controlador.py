from flask import jsonify, request #, Flask  # del modulo flask importar la clase Flask y los métodos jsonify,request
#from flask_cors import CORS               # del modulo flask_cors importar CORS
#from flask_sqlalchemy import SQLAlchemy
#from flask_marshmallow import Marshmallow
from Modelos.usuarios_modelo import *
from app import app, db, ma

class UsuariosSchema(ma.Schema):
    class Meta:
        fields=('idUsuarios','NombreYApellido', 'Email', 'Clave','RolDba','Ciudad', 'Provincia', 'Pais', 'Estado', 'Proceso')

usuario_schema=UsuariosSchema()  # El objeto usuario_schema es para traer un producto
usuarios_schema=UsuariosSchema(many=True)  # El objeto usuarios_schema es para traer multiples registros de producto

# crea los endpoint o rutas (json)
@app.route('/usuarios',methods=['GET'])
def get_Usuarios():
    all_usuarios=Usuarios.query.all() # el metodo query.all() lo hereda de db.Model
    resultados=usuarios_schema.dump(all_usuarios)  #el metodo dump() lo hereda de ma.schema y
                                                 # trae todos los registros de la tabla
    return jsonify(resultados)     # retorna un JSON de todos los registros de la tabla

@app.route('/usuarios/<id>',methods=['GET'])
def get_usuario(id):
    usuario=Usuarios.query.get(id)
    return usuario_schema.jsonify(usuario)   # retorna el JSON de un producto recibido como parametro

@app.route('/usuarios/<id>',methods=['DELETE'])
def delete_usuario(id):
    usuario=Usuarios.query.get(id)
    db.session.delete(usuario)
    db.session.commit()                     # confirma el delete
    return usuario_schema.jsonify(usuario) # me devuelve un json con el registro eliminado

@app.route('/usuarios', methods=['POST']) # crea ruta o endpoint
def create_usuario():     #idUsuarios se genera automaticamente por autoincremento
    #print(request.json)  # request.json contiene el json que envio el cliente
    NombreYApellido=request.json['NombreYApellido']
    Email=request.json['Email']
    Clave=request.json['Clave']   # Deberia encriptarse
    RolDba=request.json['RolDba'] # Por defecto "" excepto "dba"
    Ciudad=request.json['Ciudad']
    Provincia=request.json['Provincia']
    Pais=request.json['Pais']
    Estado=request.json['Estado'] # Por defecto "I" de inactivo excepto dado de alta por RolDba=dba y confirmado "A"
    Proceso=request.json['Proceso'] # Por defecto "N" de no procesado excepto dado de alta por RolDba=dba y confirmado "P"

    new_usuario=Usuarios(NombreYApellido, Email, Clave, RolDba, Ciudad, Provincia, Pais, Estado, Proceso)
    db.session.add(new_usuario)
    db.session.commit() # confirma el alta
    return usuario_schema.jsonify(new_usuario)

@app.route('/usuarios/<id>' ,methods=['PUT'])
def update_usuario(id):
    usuario=Usuarios.query.get(id)
    usuario.NombreYApellido=request.json['NombreYApellido']
    usuario.Email=request.json['Email']
    usuario.Clave=request.json['Clave']
    usuario.RolDba=request.json['RolDba']
    usuario.Ciudad=request.json['Ciudad']
    usuario.Provincia=request.json['Provincia']
    usuario.Pais=request.json['Pais']
    usuario.Estado=request.json['Estado']
    usuario.Proceso=request.json['Proceso']

    db.session.commit()    # confirma el cambio
    return usuario_schema.jsonify(usuario)    # y retorna un json con el producto
