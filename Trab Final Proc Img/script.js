let canvas = document.getElementById("canvas1");
let canvas2 = document.getElementById("canvas2");
let canvasResult = document.getElementById("canvasResult");
let ctx = canvas.getContext("2d");
let ctx2 = canvas2.getContext("2d");
let ctxResult = canvasResult.getContext("2d");
let width;
let height;

window.onload = function () {
    let fileInput = document.getElementById('fileInput');
    let fileInput2 = document.getElementById('fileInput2');

    fileInput.addEventListener('change', function (event) {
        let file = event.target.files[0];
        let reader = new FileReader();

        reader.onload = function (e) {
            let img = new Image();
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;

                canvasResult.width = img.width;
                canvasResult.height = img.height;
            
                ctx.drawImage(img, 0, 0);
                ctxResult.drawImage(img, 0, 0);
            };

            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });

    fileInput2.addEventListener('change', function (event) {
        let file = event.target.files[0];
        let reader = new FileReader();

        reader.onload = function (e) {
            let img = new Image();
            img.onload = function () {
                canvas2.width = img.width;
                canvas2.height = img.height;
                ctx2.drawImage(img, 0, 0);
            };

            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
};

function salvarImagem() {
    let arquivoParaSalvar = document.getElementById("arquivo");
    arquivoParaSalvar.download = "Nova_Imagem.png";
    let dataUrl = canvasResult.toDataURL("image/png");
    arquivoParaSalvar.href = dataUrl;
    const salvaImgDiv = document.getElementById("salvaImg");
    if (salvaImgDiv.classList.contains("hide")) {
        salvaImgDiv.classList.remove("hide");
    }
}

function flipLeftRight() {
    var imageData = ctxResult.getImageData(0, 0, canvasResult.width, canvasResult.height);
    var data = imageData.data;
    width = canvasResult.width;
    height = canvasResult.height;

    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width / 2; x++) {
            var index = (y * width + x) * 4;
            var mirrorIndex = (y * width + (width - x - 1)) * 4;

            for (var i = 0; i < 4; i++) {
                var temp = data[index + i];
                data[index + i] = data[mirrorIndex + i];
                data[mirrorIndex + i] = temp;
            }
        }
    }

    ctxResult.putImageData(imageData, 0, 0);
}

function flipUpDown() {
    var imageData = ctxResult.getImageData(0, 0, canvasResult.width, canvasResult.height);
    var data = imageData.data;
    var width = canvasResult.width;
    var height = canvasResult.height;

    for (var y = 0; y < height / 2; y++) {
        for (var x = 0; x < width; x++) {
            var index = (y * width + x) * 4;
            var mirrorIndex = ((height - y - 1) * width + x) * 4;

            for (var i = 0; i < 4; i++) {
                var temp = data[index + i];
                data[index + i] = data[mirrorIndex + i];
                data[mirrorIndex + i] = temp;
            }
        }
    }

    ctxResult.putImageData(imageData, 0, 0);
}

function grayscale() {
    var imageData = ctxResult.getImageData(0, 0, canvasResult.width, canvasResult.height);
    var data = imageData.data;
    var width = canvasResult.width;
    var height = canvasResult.height;

    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var index = (y * width + x) * 4;
            var avg = (data[index] + data[index + 1] + data[index + 2]) / 3;
            data[index] = avg;
            data[index + 1] = avg;
            data[index + 2] = avg;
        }
    }

    ctxResult.putImageData(imageData, 0, 0);
}

function inversion() {
    var imageData = ctxResult.getImageData(0, 0, canvasResult.width, canvasResult.height);
    var data = imageData.data;
    var width = canvasResult.width;
    var height = canvasResult.height;

    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var index = (y * width + x) * 4;
            data[index] = 255 - data[index]; 
            data[index + 1] = 255 - data[index + 1];
            data[index + 2] = 255 - data[index + 2];
        }
    }

    ctxResult.putImageData(imageData, 0, 0);
}

function addNumberToPixels() {
    const numberToAdd = parseInt(prompt("Digite o número para somar aos pixels:"));

    if (isNaN(numberToAdd)) {
        alert("Por favor, insira um número válido.");
        return;
    }

    var imageData = ctxResult.getImageData(0, 0, canvasResult.width, canvasResult.height);
    var data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
        data[i] = Math.min(data[i] + numberToAdd, 255); // Red
        data[i + 1] = Math.min(data[i + 1] + numberToAdd, 255); // Green
        data[i + 2] = Math.min(data[i + 2] + numberToAdd, 255); // Blue
    }

    ctxResult.putImageData(imageData, 0, 0);
}

function subtractNumberFromPixels() {
    const numberToSubtract = parseInt(prompt("Digite o número para subtrair dos pixels:"));

    if (isNaN(numberToSubtract)) {
        alert("Por favor, insira um número válido.");
        return;
    }

    var imageData = ctxResult.getImageData(0, 0, canvasResult.width, canvasResult.height);
    var data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
        data[i] = Math.max(data[i] - numberToSubtract, 0); // Red
        data[i + 1] = Math.max(data[i + 1] - numberToSubtract, 0); // Green
        data[i + 2] = Math.max(data[i + 2] - numberToSubtract, 0); // Blue
    }

    ctxResult.putImageData(imageData, 0, 0);
}

function histogram() {
    // Obter a imagem do canvasResult
    var imageData = ctxResult.getImageData(0, 0, canvasResult.width, canvasResult.height);
    var data = imageData.data;
    var width = canvasResult.width;
    var height = canvasResult.height;

    // Calcular o histograma para a imagem em escala de cinza
    var histogram = new Array(256).fill(0); // Histograma para valores 0 a 255
    for (var i = 0; i < data.length; i += 4) {
        var intensity = data[i]; // Pegando um dos canais (escala de cinza)
        histogram[intensity]++; // Incrementar o histograma
    }

    // Criar um canvas separado para desenhar o histograma com as escalas corretas
    var histogramCanvas = document.createElement("canvas");
    histogramCanvas.width = 296; // Largura do canvas
    histogramCanvas.height = 400; // Altura aumentada para espaço extra
    var ctxHistogram = histogramCanvas.getContext("2d");

    // Desenhar o fundo branco
    ctxHistogram.fillStyle = "white";
    ctxHistogram.fillRect(0, 0, histogramCanvas.width, histogramCanvas.height);

    // Configurar o eixo x (0 a 255)
    ctxHistogram.strokeStyle = "black";
    ctxHistogram.lineWidth = 1;
    ctxHistogram.beginPath();
    ctxHistogram.moveTo(40, 350); // Começo do eixo x (com margem para rótulos)
    ctxHistogram.lineTo(296, 350); // Fim do eixo x
    ctxHistogram.stroke();

    // Configurar o eixo y (0 a 1600)
    ctxHistogram.beginPath();
    ctxHistogram.moveTo(40, 350); // Começo do eixo y
    ctxHistogram.lineTo(40, 0); // Fim do eixo y
    ctxHistogram.stroke();

    // Adicionar rótulos nos eixos
    ctxHistogram.fillStyle = "black";
    ctxHistogram.font = "10px Arial";

    // Rótulos para o eixo x (valores de cinza)
    for (var i = 0; i <= 250; i += 50) {
        ctxHistogram.fillText(i.toString(), 40 + i * (canvas.width / 250), 375); // Rótulos ao longo do eixo x
    }

    // Rótulos para o eixo y (contagem de pixels)
    for (var i = 0; i <= 1600; i += 200) {
        ctxHistogram.fillText(i.toString(), 10, 350 - (i / 1600) * canvas.height); // Rótulos ao longo do eixo y
    }     

    // Desenhar o histograma
    var maxFreq = Math.max(...histogram); // Frequência máxima para escala
    var scaleFactor = 300 / maxFreq; // Escala para o gráfico
    for (var i = 0; i < 256; i++) {
        var barHeight = histogram[i] * scaleFactor; // Altura das barras
        ctxHistogram.fillRect(40 + i, 350 - barHeight, 1, barHeight); // Desenhar cada barra
    }

    // Adicionar o canvas do histograma ao documento (para visualização)
    document.body.appendChild(histogramCanvas);

    // Equalização de histograma (como antes)
    var cdf = new Array(256).fill(0); // CDF para distribuição cumulativa
    cdf[0] = histogram[0];
    for (var i = 1; i < 256; i++) {
        cdf[i] = cdf[i - 1] + histogram[i];
    }

    var cdfMin = cdf.find(value => value > 0); // Primeiro valor do CDF maior que zero
    var numPixels = width * height; // Número total de pixels
    var L = 256; // Número máximo de valores para escala de cinza
    
    // Recalcular valores dos pixels para equalização
    for (var i = 0; i < data.length; i += 4) {
        var intensity = data[i]; // Valor original do pixel
        
        var newIntensity = Math.floor(
            ((cdf[intensity] - cdfMin) / (numPixels - cdfMin)) * (L - 1)
        );

        // Atualizar os valores dos pixels para escala de cinza equalizada
        data[i] = newIntensity;
        data[i + 1] = newIntensity;
        data[i + 2] = newIntensity;
    }

    // Atualizar a imagem no canvasResult
    ctxResult.putImageData(imageData, 0, 0);
}


/// novo
function filtroMedia() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const width = canvas.width;
    const height = canvas.height;
    const newImageData = ctx.createImageData(width, height);
    const newData = newImageData.data;

    const N = 3; // Vizinhança 3x3
    const M = 3;
    const Wk = 1 / (N * M);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let red = 0;
            let green = 0;
            let blue = 0;

            for (let ky = -Math.floor(N / 2); ky <= Math.floor(N / 2); ky++) {
                for (let kx = -Math.floor(M / 2); kx <= Math.floor(M / 2); kx++) {
                    const iy = y + ky;
                    const ix = x + kx;

                    if (ix >= 0 && ix < width && iy >= 0 && iy < height) {
                        const index = (iy * width + ix) * 4;
                        red += data[index] * Wk;
                        green += data[index + 1] * Wk;
                        blue += data[index + 2] * Wk;
                    }
                }
            }

            const index = (y * width + x) * 4;
            newData[index] = red;
            newData[index + 1] = green;
            newData[index + 2] = blue;
            newData[index + 3] = data[index + 3];
        }
    }

    ctxResult.putImageData(newImageData, 0, 0);
}

function filtroMediana() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const width = canvas.width;
    const height = canvas.height;
    const newImageData = ctx.createImageData(width, height);
    const newData = newImageData.data;

    const N = 3; // Vizinhança 3x3
    const M = 3;

    // Função para calcular a mediana de um array
    function calcularMediana(arr) {
        const sorted = arr.slice().sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);
        if (sorted.length % 2 === 0) {
            return (sorted[middle - 1] + sorted[middle]) / 2;
        } else {
            return sorted[middle];
        }
    }

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let redArray = [];
            let greenArray = [];
            let blueArray = [];

            for (let ky = -Math.floor(N / 2); ky <= Math.floor(N / 2); ky++) {
                for (let kx = -Math.floor(M / 2); kx <= Math.floor(M / 2); kx++) {
                    const iy = y + ky;
                    const ix = x + kx;

                    if (ix >= 0 && ix < width && iy >= 0 && iy < height) {
                        const index = (iy * width + ix) * 4;
                        redArray.push(data[index]);
                        greenArray.push(data[index + 1]);
                        blueArray.push(data[index + 2]);
                    }
                }
            }

            const index = (y * width + x) * 4;
            newData[index] = calcularMediana(redArray);
            newData[index + 1] = calcularMediana(greenArray);
            newData[index + 2] = calcularMediana(blueArray);
            newData[index + 3] = data[index + 3];
        }
    }

    ctxResult.putImageData(newImageData, 0, 0);
}

function restaurarImagemOriginal() {
    ctxResult.drawImage(canvas, 0, 0);
}