import json

# Datos de entrada
data = """
Rossy,Gómez,8134058553
Elizabeth,Gómez,
Jury,Rodriguez,
Claudia,Gómez,8181874809
Leslie,Gómez,8118524951
Cecilia,Gómez,8181377888
Ruben,Rivera,
Lorenzo,Guzman,8180207395
Araceli,Cerda,8110247732
Sergio,Mendoza,
Bianca,Mendoza,8131792713
Santiago,,
Barbara,Mendoza,8119994969
Bruno,Souza,
Fidela,Rodriguez,
Myriam,Mendoza,8122118690
Olegario,Mendoza,
Emilia,Hernandez,
Francisco,Escobedo,8115785155
Ranulfo,Gómez,
Mariana,,8311769925
Selene,Mendoza,8121962518
Raúl,Vaquera,
Nancy,Mendoza,
Valeria,Mendoza,8116611760
Rocio,Dominguez,8117116762
Gustavo,Chapa,
Rocio,Cerda,5540176746
Jose,Cerda,
Gustavo,Mendoza,8120313826
Roble,Aguilar,
Karla,Salazar,8187775929
Stephany,Rodriguez,8118867663
Diego,Rodriguez,
Sarheidy,Díaz,8123819424
Jair,Leos,
Yesenia,Alday,8113740881
Myriam,Estrada,8110338040
Alfredo,Valdez ,
Alejandro,Villalpando,8112092143
Karla,Contreras,
Jorge,Campos,8116966770
Sergio,Garza,8113697120
Paola,de la Rosa,
Griselda,Gamez,8110172549
Enrique,Salas,
Gaby,Ortega,8116230081
Ingrid,Vargas,8132778588
Melissa,Montoya,8122575043
Sofía,Gaviño,8127017312
Alexa,Millan,8119019109
Ana,Patricia,8124433541
"""

# Procesamiento
lines = [line.strip() for line in data.strip().split('\n')]
entries = [line.split(',') for line in lines]

guests = []
current_parent = None

for nombre, apellido, celular in entries:
    if celular.strip():
        current_parent = {
            "nombre": nombre,
            "apellido": apellido,
            "celular": celular,
            "hijos": []
        }
        guests.append(current_parent)
    else:
        if current_parent:
            current_parent["hijos"].append({
                "nombre": nombre,
                "apellido": apellido
            })

# Guardar como archivo JSON
with open("guests_con_hijos.json", "w", encoding="utf-8") as f:
    json.dump(guests, f, indent=2, ensure_ascii=False)

print("Archivo 'guests_con_hijos.json' creado exitosamente.")
