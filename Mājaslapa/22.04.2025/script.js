const mansZimejums = document.getElementById("mansZimejums");
const ctx = mansZimejums.getContext("2d"); //izveidots zimesanas laukums, kura ir objekti

let zirgs_x = 0;
let zirgs_y = 0;
const zirgsWidth = 150;
const zirgsHeight = 150;

let siens_x = 0;
let siens_y = 0;
const siensWidth = 70;
const siensHeight = 70;

let punktuSkaits = 0;
// izveido mainīgo, laika skaitīšanai
let taimeris = 30;
let apturSpeli;

const zirgaAtt = new Image();
zirgaAtt.src = "attēli/zirgs.png";

const sienaAtt = new Image();
sienaAtt.src = "attēli/siens.png";     //zimets jauns attels, pec iepriekseja notirisanas

// izveido funkciju divu zīmējumu saskarei, divi attēlu mainīgie ar x un y
function atteluSaskare(x1, y1, zirgsWidth, zirgsHeight, x2, y2, siensWidth, siensHeight) {
    // pārāk tālu uz sāniem viens objekts no otra
    if (x1 >= x2 + siensWidth || x1 + zirgsWidth <= x2) return false;
    // pārāk zemu vai augstu viens objekts no otra, nesaskaras 
    if (y1 >= y2 + siensHeight || y1 + zirgsHeight <= y2) return false;
    //   ja neizpildās iepriekšminētie nosacījumi nav patiesi,tad
    return true;
}

function MyKeyDownHandler(MyEvent) { //tiek izpildits nosacijums, ar klaviaturas taustiniem var parvietor objektu
    if (MyEvent.keyCode == 37 && zirgs_x > 0) {
        zirgs_x = zirgs_x - 10;
    }
    if (MyEvent.keyCode == 39 && zirgs_x + zirgsWidth < mansZimejums.width) { //lai neizietu ara no zimesanas laukuma
        zirgs_x = zirgs_x + 10;
    }
}

addEventListener("keydown", MyKeyDownHandler); //notikuma klausitajs, norada ka tad kad spiez taustinu, izpildās nosacījums

function Laukums() {
    // notīra zīmēšanas laukumu
    ctx.clearRect(0, 0, mansZimejums.width, mansZimejums.height);
    // tūlīt pēc canvas notīrīšanas ievieto score uzrakstu ar stilu
    ctx.fillStyle = "white";
    ctx.font = " 20px Arial";
    ctx.fillText("Punktu skaits: " + punktuSkaits, 5, 25);
    // ievieto taimera uzrakstu ar tādu pašu stilu kā punktu skaita uzrakstu tikai citām y koordinātām, izmantojot metodi, kas palīdzēs mainīt laiku.

    ctx.fillText("Laiks: " + Math.round(taimeris), 5, 45);
    // uzraksts, kas parādīsies, kad laiks būs beidzies
    if (taimeris <= 0) {
        ctx.fillStyle = "white";
        ctx.font = "bold 50px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Spēles beigas", mansZimejums.width / 2, mansZimejums.height / 2);
        ctx.textAlign = "left";
        // aptur spēli
        clearInterval(apturSpeli);
        return;
    }

    taimeris -= 1 / 40; // pa cik laiks iet uz prieksu (pa 3 sekundem uc)

    zirgs_y = mansZimejums.height - zirgsHeight;

    ctx.drawImage(zirgaAtt, zirgs_x, zirgs_y, zirgsWidth, zirgsHeight);

    siens_y = siens_y + 6;
    if (siens_y > mansZimejums.height) {
        siens_y = 0;

        siens_x = Math.random() * (mansZimejums.width - siensWidth); //random vieta izvelas, kur krit objekts
    }
    ctx.drawImage(sienaAtt, siens_x, siens_y, siensWidth, siensHeight); //zime objekt

    // attēlu sadursmes pārbaude
    if (atteluSaskare(zirgs_x, zirgs_y, zirgsWidth, zirgsHeight, siens_x, siens_y, siensWidth, siensHeight)) { //parbauda objektu sadursmi
        punktuSkaits++;
        siens_x = -siensWidth;
        siens_y = 0;
    }
}
apturSpeli = setInterval(Laukums, 25); //laiks beidzas, uzraksts game over, punkti ir saskaititi
