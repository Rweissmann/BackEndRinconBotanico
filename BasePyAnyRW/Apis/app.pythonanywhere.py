from flask import Flask
# del modulo flask importar la clase Flask y los mÃ©todos jsonify,request
from flask_cors import CORS       # del modulo flask_cors importar CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
#from flask_sqlalchemy import Column, Integer, Table # ForeignKey,

app=Flask(__name__)  # crear el objeto app de la clase Flask
CORS(app) #modulo cors es para que me permita acceder desde el frontend al backend

# configuro la base de datos, con el nombre el usuario y la clave
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://rweissmann1:RWei10669#$@rweissmann1.mysql.pythonanywhere-services.com/rweissmann1$default'
# URI de la BBDD                          driver de la BD  user:clave@URLBBDD/nombreBBDD
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False #none
db= SQLAlchemy(app)   #crea el objeto db de la clase SQLAlquemy
ma=Marshmallow(app)   #crea el objeto ma de de la clase Marshmallow

from Controladores.plantas_controlador import *
from Controladores.dataPlantas_controlador import *
from Controladores.mensajes_controlador import *
from Controladores.contactosSuscriptos_controlador import *
from Controladores.usuarios_controlador import *
from Controladores.categorias_controlador import *
# programa principal *******************************
if __name__=='__main__':
    app.run(debug=True, port=5000)   # ejecuta el servidor Flask en el puerto 5000