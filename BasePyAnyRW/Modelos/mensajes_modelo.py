# defino las tablas
#from flask import request
#del modulo flask importar la clase Flask y los métodos jsonify,request
#from flask_sqlalchemy import SQLAlchemy
#from flask_sqlalchemy import Column, Integer, Table # ForeignKey,
#from flask_sqlalchemy.orm import declarative_base, relationship
from app import app, db #,ma
from sqlalchemy import Column, Integer, Table #, ForeignKey

class Mensajes (db.Model):
    idMensajes=db.Column(db.Integer, primary_key=True)
    NombreYApellido=db.Column(db.String(60))
    Email=db.Column(db.String(200))
    Direccion=db.Column(db.String(200))
    Celular=db.Column(db.String(16))
    CodigoArea=db.Column(db.String(100))
    Area=db.Column(db.String(100))
    Mensaje=db.Column(db.String(1200))
    Archivo=db.Column(db.String(50000))
    Estado=db.Column(db.String(1))
    Proceso=db.Column(db.String(1))
    def __init__(self, idMensajes, NombreYApellido, Email, Direccion, Celular, CodigoArea, Area, Mensaje, Archivo, Estado, Proceso): #crea el  constructor de la clase
        self.idMensajes=idMensajes # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.NombreYApellido=NombreYApellido
        self.Email=Email
        self.Direccion=Direccion
        self.Celular=Celular
        self.CodigoArea=CodigoArea
        self.Area=Area
        self.Mensaje=Mensaje
        self.Archivo=Archivo
        self.Estado=Estado
        self.Proceso=Proceso

    #  si hay que crear mas tablas , se hace aqui

with app.app_context():
    db.create_all()  # aqui crea todas las tablas si es que no estan creadas
#  ************************************************************

