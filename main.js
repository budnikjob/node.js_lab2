const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/html', (req, res) => { //02_01
    const filePath = path.join(__dirname, 'lab02_01/index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
        } else {
            res.send(data);
        }
    });
});

app.get('/png', (req, res) => { //02_02
    // Чтение файла pic.png в бинарном режиме
    fs.readFile('lab02_02/2.png', 'binary', (err, data) => {
        if (err) {
            // Если возникла ошибка чтения файла
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            // Установка заголовков для передачи файла в ответе
            res.set({
                'Content-Type': 'image/png',
                'Content-Length': data.length
            });
            // Отправка содержимого файла в теле ответа
            res.send(new Buffer.from(data, 'binary'));
        }
    });
});

app.get('/api/name', (req, res) => { //02_03
    const fullName = { firstName: 'Илья', lastName: 'Будник', middleName: 'Витальевич' };
    if (req.get('Content-Type') === 'application/json'){
        res.json(fullName);
    }
    else{
        res.set('Content-Type', 'text/html');
        res.send('Будник Илья Витальевич');
    }
});

app.get('/xmlhttprequest', (req, res) => { //02_04
    const filePath = path.join(__dirname, 'lab02_04/xml.html');
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.set('Content-Type', 'text/html');
        res.send(content);
    });
});

app.get('/fetch', async (req, res) =>{ //02_05
   const filePath = path.join(__dirname, 'lab02_05/fetch.html');
   fs.readFile(filePath,(err, content) => {
       if(err){
           res.status(500).send(err.message);
           return;
       }
       res.set('Content-Type', 'text/html');
       res.send(content);
   });
});


app.get('/jquery', async (req, res) => { //02_06
    const filePath = path.join(__dirname, 'lab02_06/ajax.html');
    fs.readFile(filePath, (err, content) => {
        if(err){
            res.status(500).send(err.message);
            return;
        };
        res.set('Content-Type', 'text/html');
        res.send(content);
    })
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});