let express = require("express")
let bodyParser = require("body-parser")
let cookieParser = require('cookie-parser')
let cors = require('cors')
const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');
let moment = require('moment')

mongoose.connect('mongodb://localhost:27017/projekatRasadnici')
var db = mongoose.connection
db.on('error', console.log.bind(console, "connection error"))
db.once('open', function (callback) {
  console.log("connection succeeded")
})
 
var app = express()
var session = require('express-session');

app.use(session({ secret: 'Sesija' }));
app.use(cors())
app.use(express.static('slike'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => res.send('Hello!')).listen(5000)

//ucitajAdmine
app.get('/ucitajAdmine', (req, res) => {
console.log("connection ucitajAdmine")
  db.collection("ADMINI").find({}).toArray((err, result) => {
    if (err) throw err
    else {
      if (!result) res.send("Nema korisnika.")
      else {
        res.send(result);
      }
    }
  })
})

//ucitajPoljoprivrednike
app.get('/ucitajPoljoprivrednike', (req, res) => {
console.log("connection ucitajPoljoprivrednike")
  db.collection("POLJOPRIVREDNICI").find({}).toArray((err, result) => {
    if (err) throw err
    else {
      if (!result) res.send("Nema korisnika.")
      else {
        res.send(result);
      }
    }
  })
})

//ucitajPreduzeca
app.get('/ucitajPreduzeca', (req, res) => {
console.log("connection ucitajPreduzeca")
  db.collection("PREDUZECA").find({}).toArray((err, result) => {
    if (err) throw err
    else {
      if (!result) res.send("Nema korisnika.")
      else {
        res.send(result);
      }
    }
  })
})

//ucitajZahtevePoljo
app.get('/ucitajZahtevePoljo', (req, res) => {
console.log("connection ucitajZahtevePoljo")
  db.collection("ZAHTEVIPOLJO").find({}).toArray((err, result) => {
    if (err) throw err
    else {
      if (!result) res.send("Nema korisnika.")
      else {
        res.send(result);
      }
    }
  })
})

//ucitajZahtevePred
app.get('/ucitajZahtevePred', (req, res) => {
console.log("connection ucitajZahtevePred")
  db.collection("ZAHTEVIPRED").find({}).toArray((err, result) => {
    if (err) throw err
    else {
      if (!result) res.send("Nema korisnika.")
      else {
        res.send(result);
      }
    }
  })
})

//ZahtevZaRegPoljo
app.post('/zahtevZaPoljo', (req, res) => {
console.log("connection zahtevZaPoljo")

  var username = req.body.username
  var password = req.body.password
  var ime = req.body.ime
  var prezime = req.body.prezime
  var mestoRodjenja = req.body.mestoRodjenja
  var datumRodjenja = req.body.datumRodjenja
  var kontaktTelefon = req.body.kontaktTelefon
  var email = req.body.email



  let poljoprivrednik = {
    "username": username,
    "password": password,
    "ime": ime,
    "prezime": prezime,
    "mestoRodjenja": mestoRodjenja,
    "datumRodjenja": datumRodjenja,
    "kontaktTelefon": kontaktTelefon,
    "email": email,
  }


  db.collection("ZAHTEVIPOLJO").insertOne(poljoprivrednik, function (err, collection) {
    if (err) throw err
    else res.send("Uspesno poslat zahtev za registraciju!")
    })
})

//zahtevZaPred
app.post('/zahtevZaPred', (req, res) => {
console.log("connection zahtevZaPred")

  var username = req.body.username
  var password = req.body.password
  var naziv = req.body.naziv
  var datumOsnivanja = req.body.datumOsnivanja
  var mesto = req.body.mesto
  var email = req.body.email



  let preduzece = {
    "username": username,
    "password": password,
    "naziv": naziv,
	"mesto": mesto,
    "datumOsnivanja": datumOsnivanja,
    "email": email,
  }



  db.collection("ZAHTEVIPRED").insertOne(preduzece, function (err, collection) {
    if (err) throw err
    else res.send("Uspesno poslat zahtev za registraciju!")
    })
})
// obrisiZahtevPoljo
app.post('/obrisiZahtevPoljo', (req, res) => {
  let username = req.body.username
  db.collection('ZAHTEVIPOLJO').deleteOne({ "username": username }, function (err, obj) {
    if (err) throw err
    else { res.send("Zahtev je odbijen!") }
  })
})

// obrisiZahtevPred
app.post('/obrisiZahtevPred', (req, res) => {
  let username = req.body.username
  db.collection('ZAHTEVIPRED').deleteOne({ "username": username }, function (err, obj) {
    if (err) throw err
    else { res.send("Zahtev je odbijen!") }
  })
})

// obrisiPoljoprivrednika
app.post('/obrisiPoljoprivrednika', (req, res) => {
  let username = req.body.username
  db.collection('POLJOPRIVREDNICI').deleteOne({ "username": username }, function (err, obj) {
    if (err) throw err
    else { res.send("Obrisan je korisnik!") }
  })
})

// obrisiPreduzece
app.post('/obrisiPreduzece', (req, res) => {
  let username = req.body.username
  db.collection('PREDUZECA').deleteOne({ "username": username }, function (err, obj) {
    if (err) throw err
    else { res.send("Obrisan je korisnik!") }
  })
})

//azurirajPoljo
app.post('/azurirajPoljo', (req, res) => {
console.log("connection azurirajPoljo")

  var username = req.body.username
  var password = req.body.password
  var ime = req.body.ime
  var prezime = req.body.prezime
  var mestoRodjenja = req.body.mestoRodjenja
  var datumRodjenja = req.body.datumRodjenja
  var kontaktTelefon = req.body.kontaktTelefon
  var email = req.body.email


  let poljoprivrednik = {
    "username": username,
    "password": password,
    "ime": ime,
    "prezime": prezime,
    "mestoRodjenja": mestoRodjenja,
    "datumRodjenja": datumRodjenja,
    "kontaktTelefon": kontaktTelefon,
    "email": email,
  }


  db.collection("POLJOPRIVREDNICI").findOne({"username" : username}, (err, result) => {
    if (err) throw err
    else {
      db.collection('POLJOPRIVREDNICI').updateOne({"username" : username}, { $set: { "ime": ime , "prezime": prezime, "mestoRodjenja" : mestoRodjenja, "datumRodjenja" : datumRodjenja,
		"kontaktTelefon": kontaktTelefon, "email": email} }, (err, result) => {
        if (err) throw err
        else res.send("Podaci korisnika ce biti azurirani!")
      })
    }
  })
})

//azurirajPred
app.post('/azurirajPred', (req, res) => {
console.log("connection azurirajPred")

  var username = req.body.username
  var password = req.body.password
  var naziv = req.body.naziv
  var datumOsnivanja = req.body.datumOsnivanja
  var mesto = req.body.mesto
  var email = req.body.email



  let preduzece = {
    "username": username,
    "password": password,
    "naziv": naziv,
	"mesto": mesto,
    "datumOsnivanja": datumOsnivanja,
    "email": email,
  }


  db.collection("PREDUZECA").findOne({"username" : username}, (err, result) => {
    if (err) throw err
    else {
      db.collection('PREDUZECA').updateOne({"username" : username}, { $set: { "naziv": naziv , "datumOsnivanja": datumOsnivanja, "mesto" : mesto, "email": email} }, (err, result) => {
        if (err) throw err
        else res.send("Podaci korisnika ce biti azurirani!")
      })
    }
  })
})

// odobriRegPoljo
app.post('/regZaPoljo', (req, res) => {
console.log("connection regZaPoljo")

  var username = req.body.username
  var password = req.body.password
  var ime = req.body.ime
  var prezime = req.body.prezime
  var mestoRodjenja = req.body.mestoRodjenja
  var datumRodjenja = req.body.datumRodjenja
  var kontaktTelefon = req.body.kontaktTelefon
  var email = req.body.email



  let poljoprivrednik = {
    "username": username,
    "password": password,
    "ime": ime,
    "prezime": prezime,
    "mestoRodjenja": mestoRodjenja,
    "datumRodjenja": datumRodjenja,
    "kontaktTelefon": kontaktTelefon,
    "email": email,
  }


  db.collection("POLJOPRIVREDNICI").insertOne(poljoprivrednik, function (err, collection) {
    if (err) throw err
    else res.send("Uspesno ste registrovali korisnika!")
    })
})

// odobriRegPred
app.post('/regZaPred', (req, res) => {
console.log("connection regZaPred")

  var username = req.body.username
  var password = req.body.password
  var naziv = req.body.naziv
  var datumOsnivanja = req.body.datumOsnivanja
  var mesto = req.body.mesto
  var email = req.body.email



  let preduzece = {
    "username": username,
    "password": password,
    "naziv": naziv,
    "datumOsnivanja": datumOsnivanja,
	"mesto": mesto,
    "email": email,
  }


  db.collection("PREDUZECA").insertOne(preduzece, function (err, collection) {
    if (err) throw err
    else res.send("Uspesno ste registrovali korisnika!")
    })
})

// ucitajRasadnike
app.get('/ucitajRasadnike', (req, res) => {
console.log("connection ucitajRasadnike")
  db.collection("RASADNICI").find({}).toArray((err, result) => {
    if (err) throw err
    else {
      if (!result) res.send("Nema rasadnika.")
      else {
        res.send(result);
      }
    }
  })
})

// ucitajMagacine
app.get('/ucitajMagacine', (req, res) => {
console.log("connection ucitajMagacine")
  db.collection("MAGACINI").find({}).toArray((err, result) => {
    if (err) throw err
    else {
      if (!result) res.send("Nema magacina.")
      else {
        res.send(result);
      }
    }
  })
})

// ucitajParcele
app.get('/ucitajParcele', (req, res) => {
console.log("connection ucitajParcele")
  db.collection("PARCELE").find({}).toArray((err, result) => {
    if (err) throw err
    else {
      if (!result) res.send("Nema parcela.")
      else {
        res.send(result);
      }
    }
  })
})

// ucitajSadnice
app.get('/ucitajSadnice', (req, res) => {
console.log("connection ucitajSadnice")
  db.collection("SADNICE").find({}).toArray((err, result) => {
    if (err) throw err
    else {
      if (!result) res.send("Nema sadnica.")
      else {
        res.send(result);
      }
    }
  })
})

// ucitajPreparate
app.get('/ucitajPreparate', (req, res) => {
console.log("connection ucitajPreparate")
  db.collection("PREPARATI").find({}).toArray((err, result) => {
    if (err) throw err
    else {
      if (!result) res.send("Nema preparata.")
      else {
        res.send(result);
      }
    }
  })
})

// ucitajNarudzbine
app.get('/ucitajNarudzbine', (req, res) => {
console.log("connection ucitajNarudzbine")
  db.collection("NARUDZBINE").find({}).toArray((err, result) => {
    if (err) throw err
    else {
      if (!result) res.send("Nema narudzbina.")
      else {
        res.send(result);
      }
    }
  })
})

// ucitajKurire
app.get('/ucitajKurire', (req, res) => {
console.log("connection ucitajKurire")
  db.collection("KURIRI").find({}).toArray((err, result) => {
    if (err) throw err
    else {
      if (!result) res.send("Nema kurira.")
      else {
        res.send(result);
      }
    }
  })
})

//promeniLozinkuPoljo
app.post('/promeniLozinkuPoljo', (req, res) => {
console.log("connection promeniLozinkuPoljo")

  var username = req.body.username
  var newPassword = req.body.newPassword

  let p = {
    "username": username,
    "newPassword": newPassword
  }

  db.collection("POLJOPRIVREDNICI").findOne({"username" : username}, (err, result) => {
    if (err) throw err
    else {
      db.collection('POLJOPRIVREDNICI').updateOne({"username" : username}, { $set: { "password": newPassword } }, (err, result) => {
        if (err) throw err
        else res.send("Lozinka je promenjena!")
      })
    }
  })
})

//promeniLozinkuPred
app.post('/promeniLozinkuPred', (req, res) => {
console.log("connection promeniLozinkuPoljo")

  var username = req.body.username
  var newPassword = req.body.newPassword

  let p = {
    "username": username,
    "newPassword": newPassword
  }

  db.collection("PREDUZECA").findOne({"username" : username}, (err, result) => {
    if (err) throw err
    else {
      db.collection('PREDUZECA').updateOne({"username" : username}, { $set: { "password": newPassword } }, (err, result) => {
        if (err) throw err
        else res.send("Lozinka je promenjena!")
      })
    }
  })
})

//promeniLozinkuAdmin
app.post('/promeniLozinkuAdmin', (req, res) => {
console.log("connection promeniLozinkuAdmin")

  var username = req.body.username
  var newPassword = req.body.newPassword

  let p = {
    "username": username,
    "newPassword": newPassword
  }

  db.collection("ADMINI").findOne({"username" : username}, (err, result) => {
    if (err) throw err
    else {
      db.collection('ADMINI').updateOne({"username" : username}, { $set: { "password": newPassword } }, (err, result) => {
        if (err) throw err
        else res.send("Lozinka je promenjena!")
      })
    }
  })
})

//azurirajTemperaturu
app.post('/azurirajTemperaturu', (req, res) => {
console.log("connection azurirajTemperaturu")

  var naziv = req.body.naziv
  var temperatura = req.body.temperatura

  let p = {
    "naziv": naziv,
    "temperatura": temperatura
  }

  db.collection("RASADNICI").findOne({"naziv" : naziv}, (err, result) => {
    if (err) throw err
    else {
      db.collection('RASADNICI').updateOne({"naziv" : naziv}, { $set: { "temperatura": temperatura } }, (err, result) => {
        if (err) throw err
        else res.send("Temperatura je azurirana!")
      })
    }
  })
})

//azurirajVodu
app.post('/azurirajVodu', (req, res) => {
console.log("connection azurirajVodu")

  var naziv = req.body.naziv
  var voda = req.body.voda

  let p = {
    "naziv": naziv,
    "voda": voda
  }

  db.collection("RASADNICI").findOne({"naziv" : naziv}, (err, result) => {
    if (err) throw err
    else {
      db.collection('RASADNICI').updateOne({"naziv" : naziv}, { $set: { "voda": voda } }, (err, result) => {
        if (err) throw err
        else res.send("Voda je azurirana!")
      })
    }
  })
})

//azurirajParcele
app.post('/azurirajParcele', (req, res) => {
console.log("connection azurirajParcele")

  var nazivRas = req.body.nazivRas
  var id = req.body.id
  var idSad = req.body.idSad

  let p = {
    "nazivRas": nazivRas,
    "id": id,
	"idSad": idSad
  }

  db.collection("PARCELE").findOne({"id": id, "nazivRas" : nazivRas}, (err, result) => {
    if (err) throw err
    else {
      db.collection('PARCELE').updateOne({"id": id, "nazivRas" : nazivRas}, { $set: { "idSad": idSad } }, (err, result) => {
        if (err) throw err
        else res.send("Parcele su azurirane!")
      })
    }
  })
})

app.post('/azurirajVodu', (req, res) => {
console.log("connection azurirajVodu")

  var naziv = req.body.naziv
  var voda = req.body.voda

  let p = {
    "naziv": naziv,
    "voda": voda
  }

  db.collection("RASADNICI").findOne({"naziv" : naziv}, (err, result) => {
    if (err) throw err
    else {
      db.collection('RASADNICI').updateOne({"naziv" : naziv}, { $set: { "voda": voda } }, (err, result) => {
        if (err) throw err
        else res.send("Voda je azurirana!")
      })
    }
  })
})

//dodajPreparat11
app.post('/dodajPreparat11', (req, res) => {
console.log("connection dodajPreparat11")

  var id = req.body.id
  var lokacija = req.body.lokacija

  let p = {
      "id" : id,
      "lokacija" : lokacija
  }

  db.collection("PREPARATI").findOne({"id" : id}, (err, result) => {
    if (err) throw err
    else {
      db.collection('PREPARATI').updateOne({"id" : id}, { $set: { "lokacija": lokacija } }, (err, result) => {
        if (err) throw err
        else res.send("Preparat je azuriran!")
      })
    }
  })
})


//dodajPreparat12
app.post('/dodajPreparat12', (req, res) => {
console.log("connection dodajPreparat12")

  var id = req.body.id
  var prepa = req.body.prepa

  let p = {
      "id" : id,
      "prepa" : prepa
  }

  db.collection("SADNICE").findOne({"id" : id}, (err, result) => {
    if (err) throw err
    else {
      db.collection('SADNICE').updateOne({"id" : id}, { $set: { "prepa": prepa } }, (err, result) => {
        if (err) throw err
        else res.send("Sadnica je azurirana!")
      })
    }
  })
})

//postaviSadnicu11
app.post('/postaviSadnicu11', (req, res) => {
console.log("connection postaviSadnicu11")

  var id = req.body.id
  var nazivRas = req.body.nazivRas
  var parcelaId = req.body.parcelaId
  var zasadjena = req.body.zasadjena
  
  let p = {
      id : id,
      nazivRas : nazivRas,
      parcelaId : parcelaId,
      zasadjena : zasadjena
  }

  db.collection("SADNICE").findOne({"id" : id}, (err, result) => {
    if (err) throw err
    else {
      db.collection('SADNICE').updateOne({"id" : id}, { $set: { "lokacija": nazivRas, "zasadjena": zasadjena, "mestoURasadniku": parcelaId } }, (err, result) => {
        if (err) throw err
        else res.send("Sadnica je postavljena!")
      })
    }
  })
})

//postaviSadnicu11Rasadnik
app.post('/postaviSadnicu11Rasadnik', (req, res) => {
console.log("connection postaviSadnicu11Rasadnik")

  var nazivRas = req.body.nazivRas
  
  let p = {
      nazivRas : nazivRas
  }

  db.collection("RASADNICI").findOne({"naziv" : nazivRas}, (err, result) => {
    if (err) throw err
    else {
	  let sadnice = result.sadnice
	  sadnice = sadnice + 1;
      db.collection('RASADNICI').updateOne({"naziv" : nazivRas}, { $set: { "sadnice" : sadnice} }, (err, result) => {
        if (err) throw err
        else res.send("Sadnica je postavljena!")
      })
    }
  })
})

//presadiSadRasadnik
app.post('/presadiSadRasadnik', (req, res) => {
console.log("connection presadiSadRasadnik")

  var nazivRas = req.body.nazivRas
  
  let p = {
      nazivRas : nazivRas
  }

  db.collection("RASADNICI").findOne({"naziv" : nazivRas}, (err, result) => {
    if (err) throw err
    else {
	  let sadnice = result.sadnice
	  sadnice = sadnice - 1;
      db.collection('RASADNICI').updateOne({"naziv" : nazivRas}, { $set: { "sadnice" : sadnice} }, (err, result) => {
        if (err) throw err
        else res.send("Sadnica je presadjena!")
      })
    }
  })
})

//presadiParcela
app.post('/presadiParcela', (req, res) => {
console.log("connection presadiParcela")

  var id = req.body.id
  var idSad = req.body.idSad

  let p = {
      "id" : id,
      "idSad" : idSad
  }

  db.collection("PARCELE").findOne({"id" : id}, (err, result) => {
    if (err) throw err
    else {
      db.collection('PARCELE').updateOne({"id" : id}, { $set: { "idSad": 0 } }, (err, result) => {
        if (err) throw err
        else res.send("Sadnica ce biti presadjena!")
      })
    }
  })
})

//presadiSad
app.post('/presadiSad', (req, res) => {
console.log("connection presadiSad")

  var id = req.body.id

  let p = {
      "id" : id,
  }

  db.collection("SADNICE").findOne({"id" : id}, (err, result) => {
    if (err) throw err
    else {
      db.collection('SADNICE').updateOne({"id" : id}, { $set: { "lokacija": "PRESADJENA", "mestoURasadniku": 0 } }, (err, result) => {
        if (err) throw err
        else res.send("Sadnica je presadjena!")
      })
    }
  })
})

// obrisiSadnicu
app.post('/obrisiSadnicu', (req, res) => {
  let id = req.body.id
  db.collection('SADNICE').deleteOne({ "id": id }, function (err, obj) {
    if (err) throw err
    else { res.send("Sadnica ce biti obrisana!") }
  })
})

//odbijPreparat
app.post('/odbijPreparat', (req, res) => {
console.log("connection odbijPreparat")

  var id = req.body.id

  let p = {
      "id" : id,
  }

  db.collection("PREPARATI").findOne({"id" : id}, (err, result) => {
    if (err) throw err
    else {
      db.collection('PREPARATI').updateOne({"id" : id}, { $set: { "naruceno": 0 } }, (err, result) => {
        if (err) throw err
        else res.send("Preparat se vraca u magacin!")
      })
    }
  })
})

//odbijSadnica
app.post('/odbijSadnica', (req, res) => {
console.log("connection odbijSadnica")

  var id = req.body.id

  let p = {
      "id" : id,
  }

  db.collection("SADNICE").findOne({"id" : id}, (err, result) => {
    if (err) throw err
    else {
      db.collection('SADNICE').updateOne({"id" : id}, { $set: { "naruceno": 0 } }, (err, result) => {
        if (err) throw err
        else res.send("Sadnica se vraca u magacin!")
      })
    }
  })
})

//odbijKurir
app.post('/odbijKurir', (req, res) => {
console.log("connection odbijKurir")

  var id = req.body.id

  let p = {
      "id" : id,
  }

  db.collection("KURIRI").findOne({"id" : id}, (err, result) => {
    if (err) throw err
    else {
      db.collection('KURIRI').updateOne({"id" : id}, { $set: { "idNar": 0 , "zauzet": 0 } }, (err, result) => {
        if (err) throw err
        else res.send("Kurir je spreman opet!")
      })
    }
  })
})

// obrisiNarudzbinu
app.post('/obrisiNarudzbinu', (req, res) => {
  let id = req.body.id  
    let p = {
      "id" : id,
  }
  db.collection("NARUDZBINE").findOne({"id" : id}, (err, result) => {
    if (err) throw err
    else {
      db.collection('NARUDZBINE').updateOne({"id" : id}, { $set: { "status": "ODBIJENA" } }, (err, result) => {
        if (err) throw err
        else res.send("Narudzbina je azurirana!")
      })
    }
  })
})

// dodajRasadnik
app.post('/dodajRasadnik', (req, res) => {
console.log("connection dodajRasadnik")

  var usernameVlasnika = req.body.usernameVlasnika
  var naziv = req.body.naziv
  var mesto = req.body.mesto
  var sirina = req.body.sirina
  var duzina = req.body.duzina
  var sadnice = req.body.sadnice
  var kontaktTelefon = req.body.kontaktTelefon
  var sadniceMax = req.body.sadniceMax
  var temperatura = req.body.temperatura
  var voda = req.body.voda


  let rasadnik = {
          usernameVlasnika: usernameVlasnika,
          naziv: naziv,
          mesto: mesto,
          sirina: sirina,
          duzina: duzina,
          sadnice: 0,
          sadniceMax: sirina * duzina,
          temperatura: 18,
          voda: 200
  }


  db.collection("RASADNICI").insertOne(rasadnik, function (err, collection) {
    if (err) throw err
    else res.send("Uspesno ste dodali rasadnik!")
    })
})

//dodajMagacin
app.post('/dodajMagacin', (req, res) => {
console.log("connection dodajMagacin")

  var naziv = req.body.naziv
  var nazivRas = req.body.nazivRas


  let magacin = {
      naziv : naziv,
      nazivRas : nazivRas
  }


  db.collection("MAGACINI").insertOne(magacin, function (err, collection) {
    if (err) throw err
    else res.send("Uspesno ste dodali magacin!")
    })
})

//napraviParcele
app.post('/napraviParcele', (req, res) => {
console.log("connection napraviParcele")

  var id = req.body.id
  var idSad = req.body.idSad
  var nazivRas = req.body.nazivRas


  let parcela = {
      id : id,
      idSad : idSad,
      nazivRas : nazivRas
  }


  db.collection("PARCELE").insertOne(parcela, function (err, collection) {
    if (err) throw err
    else res.send("Uspesno ste dodali parcelu!")
    })
})

//dodajSadnicu
app.post('/dodajSadnicu', (req, res) => {
console.log("connection dodajSadnicu")

  var id = req.body.id
  var proizvodjac = req.body.proizvodjac
  var naziv = req.body.naziv
  var lokacija = req.body.lokacija
  var zasadjena = req.body.zasadjena
  var mestoURasadniku = req.body.mestoURasadniku
  var progres = req.body.progres
  var cena = req.body.cena  
  var naruceno = req.body.naruceno  
  var prepa = req.body.prepa  

  let sadnica = {
      id : id,
      proizvodjac : proizvodjac,
      naziv : naziv,
      lokacija : lokacija,
      zasadjena : zasadjena,
      mestoURasadniku : mestoURasadniku,
      progres : progres,
      cena : cena,
      naruceno : naruceno,
      prepa : prepa
  }


  db.collection("SADNICE").insertOne(sadnica, function (err, collection) {
    if (err) throw err
    else res.send("Uspesno ste dodali sadnicu!")
    })
})


//dodajPreparat
app.post('/dodajPreparat', (req, res) => {
console.log("connection dodajPreparat")

  var id = req.body.id
  var proizvodjac = req.body.proizvodjac
  var naziv = req.body.naziv
  var lokacija = req.body.lokacija
  var cena = req.body.cena  
  var progres = req.body.progres
  var naruceno = req.body.naruceno  

  let preparat = {
      id : id,
      proizvodjac : proizvodjac,
      naziv : naziv,
      lokacija : lokacija,
      cena : cena,
      progres : progres,
      naruceno : naruceno
  }


  db.collection("PREPARATI").insertOne(preparat, function (err, collection) {
    if (err) throw err
    else res.send("Uspesno ste dodali preparat!")
    })
})

// zapocniNarudzbinuSad
app.post('/zapocniNarudzbinuSad', (req, res) => {
console.log("connection zapocniNarudzbinuSad")

  var id = req.body.id
  var proizvodjac = req.body.proizvodjac
  var magacin = req.body.magacin
  var status = req.body.status
  var datum = req.body.datum
  var cena = req.body.cena
  var vrsta = req.body.vrsta
  var proizvodi = req.body.proizvodi



  let narudzbina = {
      id : id,
      proizvodjac : proizvodjac,
      magacin : magacin,
      status : status,
      datum : datum,
      cena : cena,
      vrsta : vrsta,
      proizvodi : proizvodi
  }


  db.collection("NARUDZBINE").insertOne(narudzbina, function (err, collection) {
    if (err) throw err
    else res.send("Uspesno ste dodali narudzbinu!")
    })
})

// zapocniNarudzbinuPrep
app.post('/zapocniNarudzbinuPrep', (req, res) => {
console.log("connection zapocniNarudzbinuPrep")

  var id = req.body.id
  var proizvodjac = req.body.proizvodjac
  var magacin = req.body.magacin
  var status = req.body.status
  var datum = req.body.datum
  var cena = req.body.cena
  var vrsta = req.body.vrsta
  var proizvodi = req.body.proizvodi



  let narudzbina = {
      id : id,
      proizvodjac : proizvodjac,
      magacin : magacin,
      status : status,
      datum : datum,
      cena : cena,
      vrsta : vrsta,
      proizvodi : proizvodi
  }


  db.collection("NARUDZBINE").insertOne(narudzbina, function (err, collection) {
    if (err) throw err
    else res.send("Uspesno ste dodali narudzbinu!")
    })
})

//odaberiSadnicu11Nar
app.post('/odaberiSadnicu11Nar', (req, res) => {
console.log("connection odaberiSadnicu11Nar")

  var id = req.body.id
  var cena = req.body.cena
  var proizvodi = req.body.proizvodi

  let p = {
      id : id,
      cena : cena,
      proizvodi : proizvodi
	  }

  db.collection("NARUDZBINE").findOne({"id" : id}, (err, result) => {
    if (err) throw err
    else {
      db.collection('NARUDZBINE').updateOne({"id" : id}, { $set: { "cena": cena , "proizvodi": proizvodi } }, (err, result) => {
        if (err) throw err
        else res.send("Sadnica je odabrana!")
      })
    }
  })
})

//odaberiSadnicu11Sad
app.post('/odaberiSadnicu11Sad', (req, res) => {
console.log("connection odaberiSadnicu11Sad")

  var id = req.body.id
  var naruceno = req.body.naruceno

  let p = {
      id : id,
      naruceno : naruceno,
	  }

  db.collection("SADNICE").findOne({"id" : id}, (err, result) => {
    if (err) throw err
    else {
      db.collection('SADNICE').updateOne({"id" : id}, { $set: { "naruceno": naruceno} }, (err, result) => {
        if (err) throw err
        else res.send("Sadnica je odabrana!")
      })
    }
  })
})

//odaberiPreparat11Nar
app.post('/odaberiPreparat11Nar', (req, res) => {
console.log("connection odaberiPreparat11Nar")

  var id = req.body.id
  var cena = req.body.cena
  var proizvodi = req.body.proizvodi

  let p = {
      id : id,
      cena : cena,
      proizvodi : proizvodi
	  }

  db.collection("NARUDZBINE").findOne({"id" : id}, (err, result) => {
    if (err) throw err
    else {
      db.collection('NARUDZBINE').updateOne({"id" : id}, { $set: { "cena": cena , "proizvodi": proizvodi } }, (err, result) => {
        if (err) throw err
        else res.send("Preparat je odabran!")
      })
    }
  })
})

//odaberiPreparat11Prep
app.post('/odaberiPreparat11Prep', (req, res) => {
console.log("connection odaberiPreparat11Prep")

  var id = req.body.id
  var naruceno = req.body.naruceno

  let p = {
      id : id,
      naruceno : naruceno,
	  }

  db.collection("PREPARATI").findOne({"id" : id}, (err, result) => {
    if (err) throw err
    else {
      db.collection('PREPARATI').updateOne({"id" : id}, { $set: { "naruceno": naruceno} }, (err, result) => {
        if (err) throw err
        else res.send("Preparat je odabran!")
      })
    }
  })
})

//zavrsiNarudzbinu
app.post('/zavrsiNarudzbinu', (req, res) => {
console.log("connection zavrsiNarudzbinu")

  var id = req.body.id
  var datum = req.body.datum
  var status = req.body.status

  let p = {
      id : id,
      datum : datum,
      status : status
	  }

  db.collection("NARUDZBINE").findOne({"id" : id}, (err, result) => {
    if (err) throw err
    else {
      db.collection('NARUDZBINE').updateOne({"id" : id}, { $set: { "datum": datum , "status": status } }, (err, result) => {
        if (err) throw err
        else res.send("Naruzbina je gotova!")
      })
    }
  })
})

// ukloniSadnicu
app.post('/ukloniSadnicu', (req, res) => {
console.log("connection ukloniSadnicu")

  var id = req.body.id

  let p = {
      "id" : id,
  }

  db.collection("SADNICE").findOne({"id" : id}, (err, result) => {
    if (err) throw err
    else {
      db.collection('SADNICE').updateOne({"id" : id}, { $set: { "lokacija": "VECNALOVISTA" } }, (err, result) => {
        if (err) throw err
        else res.send("Sadnica je izbrisana!")
      })
    }
  })
})

// ukloniPreparat
app.post('/ukloniPreparat', (req, res) => {
console.log("connection ukloniPreparat")

  var id = req.body.id

  let p = {
      "id" : id,
  }

  db.collection("PREPARATI").findOne({"id" : id}, (err, result) => {
    if (err) throw err
    else {
      db.collection('PREPARATI').updateOne({"id" : id}, { $set: { "lokacija": "VECNALOVISTA" } }, (err, result) => {
        if (err) throw err
        else res.send("Preparat je izbrisan!")
      })
    }
  })
})

// prihvatiNarudzbinuKurir
app.post('/prihvatiNarudzbinuKurir', (req, res) => {
console.log("connection prihvatiNarudzbinuKurir")

  var id = req.body.id
  var nazivPreduzeca = req.body.nazivPreduzeca
  var zauzet = req.body.zauzet
  var idNar = req.body.idNar

  let p = {
      "id" : id,
	  "nazivPreduzeca" : nazivPreduzeca,
	  "zauzet" : zauzet,
      "idNar" : idNar,

  }

  db.collection("KURIRI").findOne({"id" : id}, (err, result) => {
    if (err) throw err
    else {
      db.collection('KURIRI').updateOne({"id" : id, "nazivPreduzeca" : nazivPreduzeca }, { $set: { "zauzet": zauzet, "idNar" : idNar } }, (err, result) => {
        if (err) throw err
        else res.send("Kurir je prihvatio narudzbinu!")
      })
    }
  })
})

// prihvatiNarudzbinuNarudzbina
app.post('/prihvatiNarudzbinuNarudzbina', (req, res) => {
console.log("connection prihvatiNarudzbinuNarudzbina")

  var id = req.body.id
  var status = req.body.status

  let p = {
      "id" : id,
	  "status" : status,
  }

  db.collection("NARUDZBINE").findOne({"id" : id}, (err, result) => {
    if (err) throw err
    else {
      db.collection('NARUDZBINE').updateOne({"id" : id}, { $set: { "status": status } }, (err, result) => {
        if (err) throw err
        else res.send("Narudzbina je azurirana!")
      })
    }
  })
})

//napraviKurire
app.post('/napraviKurire', (req, res) => {
console.log("connection napraviKurire")

  var id = req.body.id
  var nazivPreduzeca = req.body.nazivPreduzeca
  var zauzet = req.body.zauzet
  var idNar = req.body.idNar



  let kurir = {
      id: id,
      nazivPreduzeca: nazivPreduzeca,
      zauzet: zauzet,
      idNar: idNar
  }


  db.collection("KURIRI").insertOne(kurir, function (err, collection) {
    if (err) throw err
    else res.send("Uspesno je dodat kurir!")
    })
})

// isporukaUToku
app.post('/isporukaUToku', (req, res) => {
console.log("connection isporukaUToku")

  var id = req.body.id
  var status = req.body.status

  let p = {
      "id" : id,
	  "status" : status,
  }

  db.collection("NARUDZBINE").findOne({"id" : id}, (err, result) => {
    if (err) throw err
    else {
      db.collection('NARUDZBINE').updateOne({"id" : id}, { $set: { "status": status } }, (err, result) => {
        if (err) throw err
        else res.send("Narudzbina je azurirana!")
      })
    }
  })
})

// isporukaSadnica
app.post('/isporukaSadnica', (req, res) => {
console.log("connection isporukaSadnica")

  var id = req.body.id
  var naruceno = req.body.naruceno
  var lokacija = req.body.lokacija


  let p = {
      "id" : id,
	  "naruceno" : naruceno,
      "lokacija" : lokacija,

  }

  db.collection("SADNICE").findOne({"id" : id}, (err, result) => {
    if (err) throw err
    else {
      db.collection('SADNICE').updateOne({"id" : id}, { $set: { "naruceno" : naruceno, "lokacija": lokacija } }, (err, result) => {
        if (err) throw err
        else res.send("Sadnica je azurirana!")
      })
    }
  })
})

// isporukaPreparata
app.post('/isporukaPreparata', (req, res) => {
console.log("connection isporukaPreparata")

  var id = req.body.id
  var naruceno = req.body.naruceno
  var lokacija = req.body.lokacija


  let p = {
      "id" : id,
	  "naruceno" : naruceno,
      "lokacija" : lokacija,

  }

  db.collection("PREPARATI").findOne({"id" : id}, (err, result) => {
    if (err) throw err
    else {
      db.collection('PREPARATI').updateOne({"id" : id}, { $set: { "naruceno" : naruceno, "lokacija": lokacija } }, (err, result) => {
        if (err) throw err
        else res.send("Preparat je azuriran!")
      })
    }
  })
})

// isporukaNarudzbina
app.post('/isporukaNarudzbina', (req, res) => {
console.log("connection isporukaNarudzbina")

  var id = req.body.id
  var status = req.body.status

  let p = {
      "id" : id,
	  "status" : status,
  }

  db.collection("NARUDZBINE").findOne({"id" : id}, (err, result) => {
    if (err) throw err
    else {
      db.collection('NARUDZBINE').updateOne({"id" : id}, { $set: { "status": status } }, (err, result) => {
        if (err) throw err
        else res.send("Narudzbina je azurirana!")
      })
    }
  })
})


// isporukaKurir
app.post('/isporukaKurir', (req, res) => {
console.log("connection isporukaKurir")

  var id = req.body.id
  var idNar = req.body.idNar
  var zauzet = req.body.zauzet


  let p = {
      "id" : id,
      "idNar" : idNar,
  	  "zauzet" : zauzet,

  }

  db.collection("KURIRI").findOne({"id" : id}, (err, result) => {
    if (err) throw err
    else {
      db.collection('KURIRI').updateOne({"id" : id}, { $set: { "zauzet": zauzet, "idNar" : idNar } }, (err, result) => {
        if (err) throw err
        else res.send("Kurir je slobodan!")
      })
    }
  })
})

// zapocniProgresRas
app.post('/zapocniProgresRas', (req, res) => {
console.log("connection zapocniProgresRas")

  var naziv = req.body.naziv
  var temperatura = req.body.temperatura
  var voda = req.body.voda

  

  let p = {
      "naziv" : naziv,
      "temperatura" : temperatura,
  	  "voda" : voda,

  }

  db.collection("RASADNICI").findOne({"naziv" : naziv}, (err, result) => {
    if (err) throw err
    else {
      db.collection('RASADNICI').updateOne({"naziv" : naziv}, { $set: { "temperatura": temperatura, "voda" : voda } }, (err, result) => {
        if (err) throw err
        else res.send("Rasadnik je azuriran!")
      })
    }
  })
})

// zapocniProgresSad
app.post('/zapocniProgresSad', (req, res) => {
console.log("connection zapocniProgresSad")

  var id = req.body.id
  var progres = req.body.progres


  let p = {
      "id" : id,
	  "progres" : progres,

  }

  db.collection("SADNICE").findOne({"id" : id}, (err, result) => {
    if (err) throw err
    else {
      db.collection('SADNICE').updateOne({"id" : id}, { $set: { "progres" : progres } }, (err, result) => {
        if (err) throw err
        else res.send("Sadnica je azurirana!")
      })
    }
  })
})

