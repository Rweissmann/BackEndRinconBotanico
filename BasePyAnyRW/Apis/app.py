from flask import Flask, jsonify, request
# del modulo flask importar la clase Flask y los métodos jsonify,request
from flask_cors import CORS       # del modulo flask_cors importar CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app=Flask(__name__)  # crear el objeto app de la clase Flask
CORS(app) #modulo cors es para que me permita acceder desde el frontend al backend

# configuro la base de datos, con el nombre el usuario y la clave
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:RWei10669#$@localhost/RinconBotanico'
# URI de la BBDD                          driver de la BD  user:clave@URLBBDD/nombreBBDD
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False #none
db= SQLAlchemy(app)   #crea el objeto db de la clase SQLAlquemy
ma=Marshmallow(app)   #crea el objeto ma de de la clase Marshmallow

from Controladores.plantas_controlador import *
from Controladores.dataPlantas_controlador import *
from Controladores.mensajes_controlador import *
from Controladores.contactosSuscriptos_controlador import *
from Controladores.usuarios_controlador import *
#from Controladores.proceso_controlador import *
#from Controladores.estado_controlador import *
#from Controladores.categorias_controlador import *
#vscode://Postman.postman-for-vscode?code=ffc660d7af92754b3074be03a1969b13b502a9720b51fed56c8664cfa7183d64
#vscode://Postman.postman-for-vscode?code=ffc660d7af92754b3074be03a1969b13b502a9720b51fed56c8664cfa7183d64
# programa principal *******************************
if __name__=='__main__':  
    app.run(debug=True, port=5000)   # ejecuta el servidor Flask en el puerto 5000