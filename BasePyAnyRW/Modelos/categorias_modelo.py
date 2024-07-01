# defino las tablas
#from flask import request
#del modulo flask importar la clase Flask y los métodos jsonify,request
#from flask_sqlalchemy import SQLAlchemy
#from flask_sqlalchemy import Column, Integer, Table # ForeignKey,
#from flask_sqlalchemy.orm import declarative_base, relationship
from app import app, db #,ma
from sqlalchemy import Column, Integer, Table #, ForeignKey

class Categorias(db.Model):
    idCategorias=db.Column(db.Integer, primary_key=True)
    CategoriasDescripcion=db.Column(db.String(100))
    RangoidPlantas=db.Column(db.String(100))
    def __init__(self, CategoriasDescripcion,RangoidPlantas):    #crea el  constructor de la clase
        self.CategoriasDescripcion=CategoriasDescripcion
        self.RangoidPlantas=RangoidPlantas

    #  si hay que crear mas tablas , se hace aqui

with app.app_context():
    db.create_all()  # aqui crea todas las tablas si es que no estan creadas
#  ************************************************************