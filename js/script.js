// ==========================
// DATE INVITATION
// ==========================

// Menyimpan pilihan aktivitas
let pilihan = [];

// ==========================
// LOAD PAGE
// ==========================

async function loadPage(page) {

    const response = await fetch(page);
    const html = await response.text();

    const app = document.getElementById("app");

    app.classList.remove("fade-in");

    app.innerHTML = html;

    setTimeout(() => {
        app.classList.add("fade-in");
    }, 50);

    // ==========================
// INVITATION
// ==========================

if(page==="page/invitation.html"){

    const envelope=document.getElementById("btnEnvelope");

    envelope.addEventListener("click",()=>{

        envelope.style.transform="scale(1.15)";

        envelope.style.opacity="0";

        setTimeout(()=>{

            loadPage("page/welcome.html");

        },800);

    });

}

    // ==========================
    // WELCOME
    // ==========================

    if (page === "page/welcome.html") {

        const btnStart = document.getElementById("btnStart");
        typeText(
    "typingText",
    "Mau Engga Pergi Denganku? ",
    70
);

setTimeout(() => {

    typeText(
        "typingSub",
        "Aku sudah menyiapkan beberapa aktivitas seru untuk kita 🌸",
        35
    );

}, 1800);

        if (btnStart) {

            btnStart.addEventListener("click", () => {

                // Efek hati
                for (let i = 0; i < 15; i++) {

                    const heart = document.createElement("div");

                    heart.className = "pop-heart";

                    heart.innerHTML = "❤️";

                    heart.style.left =
                        (window.innerWidth / 2 + (Math.random() * 220 - 110)) + "px";

                    heart.style.top =
                        (window.innerHeight / 2) + "px";

                    document.body.appendChild(heart);

                    setTimeout(() => {
                        heart.remove();
                    }, 800);

                }


// Pindah halaman
                setTimeout(() => {
                    goToYeay();
                }, 500);

            });

        }

    }
// ==========================
// CALENDAR
// ==========================

if (page === "page/calendar.html") {

    const btnConfirm = document.getElementById("btnConfirm");

    if (btnConfirm) {

        btnConfirm.addEventListener("click", () => {

            const date = document.getElementById("datePick").value;
            const time = document.getElementById("timePick").value;
            const result = document.getElementById("resultDate");

            // Kosongkan pesan sebelumnya
            result.innerHTML = "";

            // Jika belum memilih tanggal atau jam
            if (date === "" || time === "") {

                result.innerHTML = `
                    <div class="warning-text">
                        Silakan pilih tanggal dan jam terlebih dahulu 😊.
                    </div>
                `;

                return;
            }

            // Simpan ke Local Storage
            localStorage.setItem("tanggal", date);
            localStorage.setItem("jam", time);

            // Tampilkan pesan berhasil
            result.innerHTML = `
                <div class="success-text">
                    ✅ Jadwal berhasil disimpan.
                </div>
            `;

            // Pindah ke Activity setelah 1 detik
            setTimeout(() => {
                loadPage("page/activity.html");
            }, 1000);

        });

    }

}

    // ==========================
    // ACTIVITY
    // ==========================

    if (page === "page/activity.html") {

        pilihan = [];

        const items = document.querySelectorAll(".activity-item");

        const nextBtn = document.getElementById("btnNext");

        nextBtn.disabled = true;

        items.forEach(item => {

            item.addEventListener("click", () => {

                item.classList.toggle("active");

                const value = item.dataset.value;

                if (item.classList.contains("active")) {

                    if (!pilihan.includes(value)) {

                        pilihan.push(value);

                    }

                } else {

                    pilihan = pilihan.filter(data => data !== value);

                }

                nextBtn.disabled = pilihan.length === 0;

            });

        });

        nextBtn.addEventListener("click", () => {

            loadPage("page/finish.html");

        });

    }

    // ==========================
    // FINISH
    // ==========================
    const btnFinish = document.getElementById("btnFinish");

if(btnFinish){

    btnFinish.addEventListener("click",()=>{
        
        const tanggal = localStorage.getItem("tanggal");
        const tanggalFormat = new Date(tanggal).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
});
        const jam = localStorage.getItem("jam");

        // Format tanggal Indonesia
        const tgl = new Date(tanggal);

        const hari = [
            "Minggu",
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu"
        ];

        const bulan = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember"
        ];

         const tanggalIndonesia =
            hari[tgl.getDay()] + ", " +
            tgl.getDate() + " " +
            bulan[tgl.getMonth()] + " " +
            tgl.getFullYear();

            // Format aktivitas menjadi list
            const aktivitas = pilihan
        .map((item, index) => `${index + 1}. ${item}`)
        .join("\n");

        const nomor = "6288229171323"; // Ganti nomor WA kamu
        
        // Isi pesan WhatsApp
        const pesan = `Halo!

        Aku sudah mengisi undangannya.

        Tanggal :
        ${tanggalIndonesia}

        Jam :
        ${jam} WIB

        Aktivitas :
        ${aktivitas}

    Sampai ketemu yaa`;
        const url =
`https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;

        window.open(url,"_blank");

    });

}

    if (page === "page/finish.html") {

        const hasil = document.getElementById("hasilActivity");

        hasil.innerHTML = "";

        pilihan.forEach(data => {

            hasil.innerHTML += `
                <div class="hasil-item">
                     ${data}
                </div>
            `;

        });

        // ==========================
        // CONFETTI
        // ==========================

        if (typeof confetti === "function") {

            setTimeout(() => {

                confetti({
                    particleCount: 120,
                    spread: 100,
                    origin: {
                        x: 0.2,
                        y: 0.7
                    }
                });

                confetti({
                    particleCount: 120,
                    spread: 100,
                    origin: {
                        x: 0.8,
                        y: 0.7
                    }
                });

                confetti({
                    particleCount: 180,
                    spread: 180,
                    origin: {
                        x: 0.5,
                        y: 0.5
                    }
                });

            }, 300);

        }

    }
}
// ==========================
// TYPING EFFECT
// ==========================

function typeText(id, text, speed = 50) {

    const element = document.getElementById(id);

    if (!element) return;

    element.innerHTML = "";

    let i = 0;

    const typing = setInterval(() => {

        element.innerHTML += text.charAt(i);

        i++;

        if (i >= text.length) {

            clearInterval(typing);

        }

    }, speed);

}
// ==========================
// WEBSITE START
// ==========================

window.onload = function () {

    loadPage("page/invitation.html");

    const music = document.getElementById("bgMusic");

    if (music) {

        music.volume = 0.3;

        document.body.addEventListener("click", function () {

            music.play().catch(() => {});

        }, {
            once: true
        });

    }

};

function goToFinish(){

    document.querySelector(".welcome-card").style.display = "none";

    const activity = document.querySelector(".activity-card");
    if(activity) activity.style.display = "none";

    document.getElementById("finishPage").style.display = "block";

}
function popHeart(){

    const heart = document.createElement("div");
    heart.className = "pop-heart";
    heart.innerHTML = "💖";

    heart.style.left = Math.random()*window.innerWidth + "px";
    heart.style.top = window.innerHeight - 50 + "px";

    document.body.appendChild(heart);

    setTimeout(()=>heart.remove(),800);
}

function goToYeay(){

    loadPage("page/yeay.html");

    // pindah ke kalender setelah 2 detik
    setTimeout(() => {
        loadPage("page/calendar.html");
    }, 5000);

}
function saveDate() {
    const btnConfirm = document.getElementById("btnConfirm");

if (btnConfirm) {

    btnConfirm.addEventListener("click", () => {

        const date = document.getElementById("datePick").value;
        const time = document.getElementById("timePick").value;
        const result = document.getElementById("resultDate");

        if (date === "" || time === "") {

            result.innerHTML = `
                <div class="warning-text">
                    Pilih tanggal dan jam dulu 😊
                </div>
            `;
            return;
        }

        // Simpan ke Local Storage
        localStorage.setItem("tanggal", date);
        localStorage.setItem("jam", time);

        result.innerHTML = `
            <div class="success-text">
                ✅ Jadwal berhasil disimpan
            </div>
        `;

        setTimeout(() => {
            loadPage("page/activity.html");
        },1000);

    });

}

    const date = document.getElementById("datePick");
    const time = document.getElementById("timePick");

    if (!date.value || !time.value) {
         const result = document.getElementById("resultDate");

    result.innerHTML = `
        <div class="warning-text">
            ⚠️ Pilih tanggal dan jam terlebih dahulu
        </div>
    `;

    return;

}
    
    // Simpan data
    localStorage.setItem("tanggal", date.value);
    localStorage.setItem("jam", time.value);

    // Pindah ke halaman Activity
    loadPage("page/activity.html");

}




  