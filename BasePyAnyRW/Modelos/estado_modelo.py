# defino las tablas
#from flask import request
#del modulo flask importar la clase Flask y los métodos jsonify,request
#from flask_sqlalchemy import SQLAlchemy
#from flask_sqlalchemy import Column, Integer, Table # ForeignKey,
#from flask_sqlalchemy.orm import declarative_base, relationship
from app import app, db #,ma
from sqlalchemy import Column, Integer, Table #, ForeignKey

class Estado(db.Model):
    idEstado=db.Column(db.String(1), primary_key=True)
    EstadoDescripcion=db.Column(db.String(22))
    def __init__(self, idEstado, EstadoDescripcion):    #crea el  constructor de la clase
        self.idEstado=idEstado
        self.EstadoDescripcion=EstadoDescripcion

    #  si hay que crear mas tablas , se hace aqui

with app.app_context():
    db.create_all()  # aqui crea todas las tablas si es que no estan creadas
#  ************************************************************