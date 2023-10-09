const imageInput = document.getElementById('SelectImg_btn');
const canvas = document.getElementById('outputCanvas');
const ctx = canvas.getContext('2d');



function Confirm() {
    const text = document.getElementById('floatingTextarea').value; 
    const color = document.getElementById('exampleColorInput').value;
    let fontSize = parseInt(document.getElementById('customRange1').value);
    let Position_Y = parseInt(document.getElementById('Position_Y').value);
    const fontName = document.getElementById('fontSelect').value;
    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            document.getElementById('Position_Y').max = canvas.height - 10;
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            ctx.font = fontSize + "30px Arial";
            ctx.fillStyle = color;
            ctx.textAlign = "center";

            let textWidth = ctx.measureText(text).width;
            
            // ปรับขนาดตัวอักษรถ้าข้อความกว้างเกินรูปภาพ
            while (textWidth > img.width && fontSize > 1) {
                fontSize -= 1; // ลดขนาดตัวอักษรลง
                ctx.font = fontSize + "px " + fontName;
                textWidth = ctx.measureText(text).width;
            }

            const textX = canvas.width / 2;
            const textY = canvas.height - Position_Y;
           
            ctx.fillText(text, textX, textY);

        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);
    
    return text;
}

function Fun_saveimage() {
    const downloadLink = document.createElement('a'); 
    downloadLink.href = canvas.toDataURL('image/png'); 
    downloadLink.download = 'my_image.png'; 
    document.body.appendChild(downloadLink); 
    downloadLink.click(); 
    document.body.removeChild(downloadLink); 
}
