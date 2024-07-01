# defino las tablas
#from flask import request
#del modulo flask importar la clase Flask y los métodos jsonify,request
#from flask_sqlalchemy import SQLAlchemy
#from flask_sqlalchemy import Column, Integer, Table # ForeignKey,
#from flask_sqlalchemy.orm import declarative_base, relationship
from app import app, db #,ma
from sqlalchemy import Column, Integer, Table #, ForeignKey

class Proceso(db.Model):
    idProceso=db.Column(db.String(1), primary_key=True)
    ProcesoDescripcion=db.Column(db.String(22))
    def __init__(self, idProceso, ProcesoDescripcion):    #crea el  constructor de la clase
        self.idProceso=idProceso
        self.ProcesoDescripcion=ProcesoDescripcion

    #  si hay que crear mas tablas , se hace aqui

with app.app_context():
    db.create_all()  # aqui crea todas las tablas si es que no estan creadas
#  ************************************************************