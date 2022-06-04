let express = require('express');
let app = express();
let cors = require('cors');
let bodyparser = require('body-parser');

let mongoClient = require('mongodb').MongoClient;
let PORT = 3001;
let dbURL = "mongodb://localhost:27017";

app.listen(PORT, () => {
    console.log(`Server running at port number ${PORT}`);
});

app.use(cors());
app.use(bodyparser.json());

//for all contacts
app.get("/contacts", (request,response) => {
    mongoClient.connect(dbURL, {useNewUrlParser : true}, (error, client) => {
        if(error){
            throw error;
        }
        else{
            let db = client.db("mydb"); 
            let cursor = db.collection("contacts").find();
            let allContacts = [];

            cursor.forEach((doc,err) =>{
                if(err)
                    throw err;
                allContacts.push(doc);
            }, () => {
                response.json(allContacts);
                client.close();
            })
        }
    })
});

//getting contacts using name
app.get("/contacts/name/:name", (request, response) => {
    let name = request.params.name.toLowerCase();
    console.log(name);
    mongoClient.connect(dbURL, {useNewUrlParser:true}, (error, client) => {
        if(error){
            throw error;
        }
        else{
            let db = client.db("mydb");
            let cursor = db.collection('contacts').find();
            let allContacts = [];
            let contactName =[];
            let counter = 0;
            
            cursor.forEach((doc,err) => {
                if(err) throw err;
                else allContacts.push(doc)
            }, () => {
                for(let i=0;i<allContacts.length;i++){
                    if(allContacts[i].name.toLowerCase().startsWith(name)){
                        counter++;
                        contactName.push(allContacts[i]) 
                    }
                }
                if(counter == 0) response.status(404).json({"message":"No Contacts Available!"});
                else response.json(contactName);
                client.close();
            });
        }
    })
})

// //getting contacts using number
app.get("/contacts/number/:number", (request, response) => {
    let number = request.params.number; 
    console.log(number);
    mongoClient.connect(dbURL, {useNewUrlParser:true}, (error, client) => {
        if(error) throw error;
        else{
            let db = client.db("mydb");
            let cursor = db.collection('contacts').find();
            let allContacts = [];
            let contactNumber =[];
            let counter = 0;

            cursor.forEach((doc,err) => {
                if(err) throw err;
                else allContacts.push(doc);
            }, () => {
                for(let i=0; i<allContacts.length; i++){
                    if(allContacts[i].phone.toString().startsWith(number)){
                        counter++;
                        contactNumber.push(allContacts[i]);
                    }
                }
                if(counter == 0) response.status(404).json({"message":"No Contacts Available!"});
                else response.json(contactNumber);
                client.close();
            })
        }
    })
}) 