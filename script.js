let music = document.getElementById("backgroundMusic");

// Ambil elemen halaman
let beranda = document.getElementById("beranda");
let halamanUtama = document.getElementById("halamanUtama");
let mulaiButton = document.getElementById("mulaiButton");
let yesButton = document.getElementById("yesButton");
let noButton = document.getElementById("noButton");
let popupModal = document.getElementById("popupModal");
let popupText = document.getElementById("popupText");
let closePopup = document.getElementById("closePopup");

// Sembunyikan modal di awal
popupModal.classList.add("hidden");

let clickedOnce = false; // Status tombol "Nggak"

// Fungsi untuk menampilkan popup
function showPopup(message) {
    popupText.innerText = message; // Set teks dalam modal
    popupModal.classList.remove("hidden"); // Tampilkan modal
}

// Saat tombol "Mulai" ditekan
mulaiButton.addEventListener("click", function() {
    beranda.classList.add("hidden"); // Sembunyikan halaman beranda
    halamanUtama.classList.remove("hidden"); // Tampilkan halaman utama
    music.play(); // Mulai musik
});

// Saat tombol "Mauuu!" ditekan
yesButton.addEventListener("click", function() {
    showPopup("Yeayy, So 2/25/25 is our anniversary ❤️");
});

// Saat tombol "Nggak 😢" ditekan pertama kali
noButton.addEventListener("click", function() {
    showPopup("Really babee? So sadd 😢 ");
    clickedOnce = true; // Aktifkan mode kabur setelah ditekan sekali
});

// Jika tombol "Nggak 😢" sudah ditekan sekali, mulai kabur saat disentuh
noButton.addEventListener("mouseover", function() {
    if (clickedOnce) {
        let x = Math.random() * (window.innerWidth - this.offsetWidth);
        let y = Math.random() * (window.innerHeight - this.offsetHeight);

        this.style.position = "absolute"; // Pastikan tombol bisa bergerak
        this.style.left = x + "px";
        this.style.top = y + "px";
    }
});

// Saat tombol "OK" di modal ditekan, sembunyikan modal
closePopup.addEventListener("click", function() {
    popupModal.classList.add("hidden");
});
