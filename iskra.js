// Настраиваем соединение с Ethernet Shield 2
SPI2.setup({ baud: 3200000, mosi: B15, miso: B14, sck: B13 });
var eth = require("WIZnet").connect(SPI2, P10);
// подключаем библиотеку 'net' для работы с сетью Интернет
var net = require("net");

// подключаем Ethernet Shield 2 к интерфейсу SPI2
eth.setIP();
// создаем сокет-соединение на указанный IP адрес сервера и порт
net.connect({ host: "http://localhost", port: 3003 }, function (socket) {
  // каждые 3000 миллисекунд посылаем запрос на обновление состояний дверей
  setInterval(function () {
    socket.write("Get");
  }, 3000);
  // обрабатываем получение данных от сервера
  socket.on("data", function (recieved) {
    // разворачиваем принятые данные в javascript объект
    console.log("!!!!");
  });
  // обрабатываем отключение от сервера
  socket.on("close", function () {
    print("WARNING: connection closed");
  });
});
