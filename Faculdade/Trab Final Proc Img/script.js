let canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");
var width;
var height;



window.onload = function () {
    var fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', function (event) {
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
            var img = new Image();
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);

                var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                var pixels = imageData.data;

                var matrix_inv = [];
                for (var y = 0; y < canvas.height; y++) {
                    var row = [];
                    for (var x = 0; x < canvas.width; x++) {
                        var index = (y * canvas.width + x) * 4;
                        var r = pixels[index];
                        var g = pixels[index + 1];
                        var b = pixels[index + 2];
                        row.push([r, g, b]);
                    }
                    matrix_inv.push(row);
                }
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
};

function salvarImagem() {
    let arquivoParaSalvar = document.getElementById("arquivo");
    arquivoParaSalvar.download = 'nova_imagem.png';
    arquivoParaSalvar.href = canvas.toDataURL();
}

var img = new Image();
img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
};

function flipLeftRight() {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    width = canvas.width;
    height = canvas.height;

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

    ctx.putImageData(imageData, 0, 0);
}

function flipUpDown() {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    width = canvas.width;
    height = canvas.height;

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

    ctx.putImageData(imageData, 0, 0);
}

function grayscale() {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    var width = canvas.width;
    var height = canvas.height;

    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var index = (y * width + x) * 4;
            var avg = (data[index] + data[index + 1] + data[index + 2]) / 3;
            data[index] = avg;
            data[index + 1] = avg;
            data[index + 2] = avg;
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

function inversion() {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    var width = canvas.width;
    var height = canvas.height;

    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var index = (y * width + x) * 4;
            var avg = (data[index] + data[index + 1] + data[index + 2]) / 3;
            data[index] = 255 - data[index]; 
            data[index + 1] = 255 - data[index + 1];
            data[index + 2] = 255 - data[index + 2];
        }
    }

    ctx.putImageData(imageData, 0, 0);
}