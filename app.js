const uploadFile = document.getElementById("upload-file");

const imgWidth = document.getElementById("img-width")
const imgHeight = document.getElementById("img-height")

const percent30 = document.getElementById("30p")

const downloadButton = document.getElementById('download')
const imageEditingSection = document.getElementById('imaging-editing-section')

// (B1) NEW IMAGE OBJECT & HTML CANVAS
let img = new Image(),
    canvas = document.getElementById("resized"),
    ctx = canvas.getContext("2d");

uploadFile.addEventListener("change", () => {
    // Get File
    const file = document.getElementById("upload-file").files[0];
    // Init FileReader API
    const reader = new FileReader();

    // Check for file
    if (file) {
        // Read data as URL
        reader.readAsDataURL(file);
    }

    // Add image to canvas
    reader.addEventListener(
        "load",
        () => {
            // Create image
            img = new Image();
            // Set image src
            img.src = reader.result;
            // On image load add to canvas
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                imgWidth.innerHTML = `Width: ${img.width}`
                imgHeight.innerHTML = `Height: ${img.height}`
                ctx.drawImage(img, 0, 0, img.width, img.height);
            };
        },
        false
    );
    imageEditingSection.hidden = false
});

var radios = document.getElementsByName("percent")
console.log(radios)
for (radio of radios) {
  radio.addEventListener("click", (e) => {
    console.log(e.target.value)
    resizeImg(e.target.value)
    updateImageDimensions()
  })
}

// resize image on radio click
const resizeImg = (percent) => {
  let width = Math.floor(img.naturalWidth * percent),
      height = Math.floor(img.naturalHeight * percent);
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);
};

downloadButton.addEventListener('click', function(e) {
  let canvasUrl = canvas.toDataURL("image/png", 0.5);
  console.log(canvasUrl);
  const createEl = document.createElement('a');
  createEl.href = canvasUrl;
  createEl.download = "image-export";
  createEl.click();
  createEl.remove();
});

const updateImageDimensions = () => {
  imgWidth.innerHTML = `Width: ${canvas.width}`
  imgHeight.innerHTML = `Height: ${canvas.height}`
}
