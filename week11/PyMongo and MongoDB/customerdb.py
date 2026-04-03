import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

mydb = myclient["customerdb"]

mycol = mydb["Customer"]

customers = [
    {
        "firstName": "LeBron",
        "lastName": "James",
        "email": "lebron.james@email.com",
        "phone": "123-456-7890"
    },
    {
        "firstName": "Luka",
        "lastName": "Doncic",
        "email": "luka.doncic@email.com",
        "phone": "345-354-2345"
    },
    {
        "firstName": "Austin",
        "lastName": "Reaves",
        "email": "austin.reaves@email.com",
        "phone": "567-890-1234"
    }
]

delete_result = mycol.delete_many({})

result = mycol.insert_many(customers)

myquery = { "email": "lebron.james@email.com" }
newvalues = { "$set": { "email": "chosenone@email.com" } }

mycol.update_one(myquery, newvalues)

myquery = { "phone": "345-354-2345" }
newvalues = { "$set": { "phone": "111-111-1111" } }

mycol.update_one(myquery, newvalues)

myquery = { "lastName": "Reaves" }

mydoc = mycol.find(myquery)

for x in mydoc:
  print(x)

myquery = { "firstName": "Luka" }

mydoc = mycol.find(myquery)

for x in mydoc:
  print(x)

mycol.drop()
