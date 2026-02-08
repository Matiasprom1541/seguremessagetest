const idconectar = document.getElementById("idconectar")
const amigos = document.getElementById("amigos")
const text = document.getElementById("text")
const enviar = document.getElementById("send")

amigos.addEventListener("click", () => {
amigos.textContent="esperando"
    fetch('/conectar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: idconectar.value })
    });
});

enviar.addEventListener("click", () => {
    var msg = document.createElement("nav")
    msg.className = "messagebox"
    msg.textContent = text.value
    document.getElementById("mensajes").appendChild(msg)

    fetch('/mimensaje', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: text.value })
    });
    text.value = "";
});

setInterval(() => {
    fetch('/mensaje')
        .then(res => res.json())
        .then(data => {
            if (data.msg !== "") {
                var msg = document.createElement("nav")
                msg.className = "messagebox2"
                msg.textContent = data.msg
                document.getElementById("mensajes").appendChild(msg);
            }
        });
}, 1000);