let topTextInput,
    bottomTextInput,
    topTextSizeInput,
    bottomSizeTextInput,
    imageInput,
    generateBtn,
    canvas,
    ctx;

function generateMeme(img, topText, bottomText, topTextSize, bottomTextSize, topTextStyle, bottomTextStyle, fontStyle) {
    let fontSize;
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    // ctx.fillStyle = '#0b03fc';
    ctx.fillStyle = topTextStyle;
    ctx.strokeStyle = 'black';
    ctx.textAlign = 'center';
    
    // Top text font size
    fontSize = canvas.width * topTextSize;
    ctx.font = fontSize + 'px ' + fontStyle;
    ctx.lineWidth = fontSize / 20;   

    // Draw topText
    ctx.textBaseline = 'top';
    topText.split('\n').forEach(function(t, i) {
        ctx.fillText(t, canvas.width / 2, i * fontSize, canvas.width);
        ctx.strokeText(t, canvas.width / 2, i * fontSize, canvas.width);

    });

    ctx.fillStyle = bottomTextStyle;

    // Bottom text font size
    fontSize = canvas.width * bottomTextSize;
    ctx.font = fontSize + 'px ' + fontStyle;
    ctx.lineWidth = fontSize / 20;

    // Draw bottomText
    ctx.textBaseline = 'bottom';
    bottomText.split('\n').reverse().forEach(function (t, i) {
        ctx.fillText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
        ctx.strokeText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);

    });
}

function init() {
    topTextInput = document.getElementById('top-text');
    bottomTextInput = document.getElementById('bottom-text');
    topTextSizeInput = document.getElementById('top-text-size-input');
    bottomTextSizeInput = document.getElementById('bottom-text-size-input');
    topColor = document.getElementById('color-top');
    bottomColor = document.getElementById('color-bottom');
    imageInput = document.getElementById('image-input');
    fontStyle = document.getElementById('font-style');
    generateBtn = document.getElementById('generate-btn');
    // downloadBtn = document.getElementById('download-btn');
    canvas = document.getElementById('meme-canvas');
    
    ctx = canvas.getContext('2d');
    
    canvas.width = canvas.height = 0;
    
    generateBtn.addEventListener("click", function() { 
        console.log(document.getElementById('font-style').value);
        let reader = new FileReader();
        reader.onload = function() {
            let img = new Image;
            img.src = reader.result;
            generateMeme(img, topTextInput.value, bottomTextInput.value, topTextSizeInput.value, bottomTextSizeInput.value, topColor.value, bottomColor.value, fontStyle.value);
        }
        reader.readAsDataURL(imageInput.files[0]);    
    });

    download_img = function (el) {
        // get image URI from canvas object
        var imageURI = canvas.toDataURL("image/jpg");
        el.href = imageURI;
    };

    // downloadBtn.addEventListener("click", function() {
    //     console.log("ok");
    //     var imgToDownload = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
    //     var link = document.createElement('a');
    //     link.download = "my-image.png";
    //     link.href = image;
    //     link.click();
    // });
}

init();