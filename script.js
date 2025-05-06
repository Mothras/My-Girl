// Ambil elemen halaman
let beranda = document.getElementById("beranda");
let halamanUtama = document.getElementById("halamanUtama");
let mulaiButton = document.getElementById("mulaiButton");
let yesButton = document.getElementById("yesButton");
let noButton = document.getElementById("noButton");
let popupModal = document.getElementById("popupModal");
let popupText = document.getElementById("popupText");
let closePopup = document.getElementById("closePopup");
let flowerContainer; // Deklarasi flowerContainer di sini
let music = document.getElementById("backgroundMusic"); // Ambil elemen audio

// Elemen untuk efek mengetik
const textToType = "Is It Okay If I Call You Mine? 💕";
const typingTextElement = document.getElementById("typingText");
let charIndex = 0;
let typingInterval; // Untuk menyimpan interval typing
let typingFinished = false; // Flag untuk menandakan apakah mengetik sudah selesai

// Sembunyikan modal dan halaman utama di awal
popupModal.classList.add("hidden");
halamanUtama.classList.add("hidden");

let flowerInterval; // Untuk menyimpan interval pembuatan bunga

// Fungsi untuk menampilkan popup
function showPopup(message) {
    popupText.innerText = message; // Set teks dalam modal
    popupModal.classList.remove("hidden"); // Tampilkan modal
}

// Fungsi untuk membuat bunga jatuh
function createFlower() {
    const flower = document.createElement('div');
    flower.classList.add('flower');
    flower.style.left = Math.random() * 100 + 'vw'; // Posisi horizontal acak
    flower.style.animationDuration = Math.random() * 5 + 5 + 's'; // Durasi jatuh acak
    flower.style.transform = `scale(${Math.random() * 0.5 + 0.5}) rotate(${Math.random() * 360}deg)`; // Skala dan rotasi acak
    flower.style.opacity = Math.random(); // Opasitas acak
    flower.style.zIndex = -1; // Di belakang konten utama
    flowerContainer.appendChild(flower);

    // Hapus bunga setelah selesai animasi
    flower.addEventListener('animationend', () => {
        flower.remove();
    });
}

// Fungsi untuk memulai efek bunga
function startFlowerRain() {
    flowerContainer.innerHTML = ''; // Bersihkan kontainer jika ada bunga sebelumnya
    flowerInterval = setInterval(createFlower, 200); // Membuat bunga setiap 200ms (bisa disesuaikan)
}

// Fungsi untuk menghentikan efek bunga
function stopFlowerRain() {
    clearInterval(flowerInterval);
}

function fireConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function typeWriter() {
    if (charIndex < textToType.length) {
        typingTextElement.textContent += textToType.charAt(charIndex);
        charIndex++;
        typingInterval = setTimeout(typeWriter, 30); // Atur kecepatan mengetik di sini (ms) - nilai lebih kecil untuk lebih smooth
    } else {
        typingFinished = true; // Tandai bahwa efek mengetik sudah selesai
        // Tambahkan animasi atau efek lain setelah mengetik selesai di sini jika mau
    }
}

// Saat tombol "Mulai" ditekan
mulaiButton.addEventListener("click", function() {
    beranda.classList.add("hidden"); // Sembunyikan halaman beranda
    halamanUtama.classList.remove("hidden"); // Tampilkan halaman utama
    setTimeout(() => {
        halamanUtama.classList.add("muncul"); // Tambahkan kelas untuk fade-in
        typingTextElement.textContent = ''; // Kosongkan teks sebelum memulai
        charIndex = 0;
        typingFinished = false; // Reset flag saat halaman utama ditampilkan ulang (misalnya setelah "No")
        typeWriter(); // Mulai efek mengetik JavaScript
    }, 50);
    startFlowerRain(); // Mulai hujan bunga saat halaman utama muncul
});

// Saat tombol "Yes Babe" ditekan
yesButton.addEventListener("click", function() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${month}/${day}/${year}`;

    showPopup(`Sayang, kalau begitu, mulai hari ini,\n${formattedDate},\nkamu jadi pacarku ya. ❤️`);
    clearInterval(flowerInterval); // Hentikan interval reguler
    clearInterval(typingInterval); // Hentikan efek mengetik
    flowerInterval = setInterval(createFlower, 100); // Percepat hujan bunga!
    fireConfetti(); // Tembakkan confetti!
    // Tambahkan efek "perayaan" lain di sini jika mau
});

// Saat tombol "No I Cant" ditekan (berpindah setiap kali diklik)
noButton.addEventListener("click", function() {
    showPopup("Really babee? So sadd 😢 ");
    let x = Math.random() * (window.innerWidth - this.offsetWidth);
    let y = Math.random() * (window.innerHeight - this.offsetHeight);

    this.style.position = "absolute"; // Pastikan tombol bisa bergerak
    this.style.left = x + "px";
    this.style.top = y + "px";
    clearInterval(typingInterval); // Hentikan efek mengetik
});

// Saat tombol "OK" di modal ditekan, sembunyikan modal dan kembalikan intensitas bunga
closePopup.addEventListener("click", function() {
    popupModal.classList.add("hidden");
    clearInterval(flowerInterval); // Hentikan efek cepat
    flowerInterval = setInterval(createFlower, 200); // Kembalikan interval normal (jika halaman utama masih terlihat)
    if (!typingFinished && !halamanUtama.classList.contains("hidden")) {
        typingTextElement.textContent = ''; // Kosongkan teks hanya jika belum selesai
        charIndex = 0;
        typeWriter(); // Mulai lagi efek mengetik hanya jika belum selesai
    } else if (typingFinished && !halamanUtama.classList.contains("hidden")) {
        // Jika sudah selesai mengetik, pastikan teks tetap ada
        typingTextElement.textContent = textToType;
    }
});

// Buat kontainer bunga di awal setelah DOM dimuat DAN putar musik
document.addEventListener('DOMContentLoaded', function() {
    flowerContainer = document.createElement('div');
    flowerContainer.id = 'flowerContainer';
    document.body.appendChild(flowerContainer);
    music.play(); // Putar musik saat halaman selesai dimuat
});
