var express = require("express")
var fso = require("fs")
var app = express()

app.use(express.urlencoded({ extended: true }))


app.get("/", function(req, res) {

    fso.readFile("chat.txt", "utf8", function(err, data) {

        if (err) {
            data = ""
        }

        res.send(
            "<html>" +
            "<body bgcolor='skyblue'>" +

            "<h1>きゅうきゅうのBBS</h1>" +

            "<div>" +
            data +
            "</div>" +

            "<form method='POST' action='/'>" +
            "Name:<input type='text' name='name'><br>" +
            "Chat:<input type='text' name='chat'>" +
            "<input type='submit'>" +
            "</form>" +

            "</body>" +
            "</html>"
        )

    })

})


app.post("/", function(req, res) {

    var name = req.body.name
    var chat = req.body.chat

    if (name == "" || chat == "") {
        return res.send("空欄があります")
    }


    var now = new Date()

    var text =
        now.getFullYear() +
        "/" +
        (now.getMonth() + 1) +
        "/" +
        now.getDate() +
        "[" +
        name +
        "]" +
        chat +
        "<br>"


    fso.appendFile(
        "chat.txt",
        text,
        "utf8",
        function(err) {

            if (err) {
                return res.send("保存エラー")
            }

            res.redirect("/")
        }
    )

})


app.listen(3000, "0.0.0.0", function(){
    console.log("started")
})
