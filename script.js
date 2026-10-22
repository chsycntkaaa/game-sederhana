// State/Status Awal Game
let budget = 5000000;
let reputation = 50;
let stress = 20;
let currentDay = 0;

// Daftar Skenario / Kejadian
const scenarios = [
    {
        story: "Hari ke-1: Kamu butuh sponsor awal. Ada tawaran dari bimbingan belajar lokal, tapi mereka minta pasang logo besar di panggung.",
        option1: {
            text: "Terima tawaran (+Rp 2 Juta, Reputasi -10)",
            budgetDelta: 2000000,
            reputationDelta: -10,
            stressDelta: 5
        },
        option2: {
            text: "Tolak dan jualan danus makanan (+Rp 500rb, Stres +15)",
            budgetDelta: 500000,
            reputationDelta: 5,
            stressDelta: 15
        }
    },
    {
        story: "Hari ke-2: Panitia divisi acara dan konsumsi berantem karena pembagian anggaran tidak adil.",
        option1: {
            text: "Numpuk anggaran ke divisi Acara (Reputasi +10, Stres +10)",
            budgetDelta: -500000,
            reputationDelta: 10,
            stressDelta: 10
        },
        option2: {
            text: "Ajak rapat santai sambil traktir boba (-Rp 200rb, Stres -10)",
            budgetDelta: -200000,
            reputationDelta: 5,
            stressDelta: -10
        }
    },
    {
        story: "Hari ke-3: Pembina OSIS minta proposal diselesaikan malam ini juga, padahal kamu ada PR Matematika.",
        option1: {
            text: "Begadang ngerjain proposal sampai subuh (Reputasi +15, Stres +25)",
            budgetDelta: 0,
            reputationDelta: 15,
            stressDelta: 25
        },
        option2: {
            text: "Minta tolong wakil ketua kerjakan (Reputasi -10, Stres -10)",
            budgetDelta: 0,
            reputationDelta: -10,
            stressDelta: -10
        }
    },
    {
        story: "Hari ke-4: Bintang tamu utama mendadak minta tambahan uang DP ekstra.",
        option1: {
            text: "Bayar pakai dana darurat (-Rp 1.5 Juta, Reputasi +10)",
            budgetDelta: -1500000,
            reputationDelta: 10,
            stressDelta: 10
        },
        option2: {
            text: "Nego ulang dan ganti dengan band lokal (-Rp 500rb, Reputasi -15)",
            budgetDelta: -500000,
            reputationDelta: -15,
            stressDelta: 5
        }
    },
    {
        story: "Hari ke-5 (H-1 Pensi): Cuaca diperkirakan hujan deras saat acara besok.",
        option1: {
            text: "Sewa pawang hujan & tenda tambahan (-Rp 1 Juta, Stres -15)",
            budgetDelta: -1000000,
            reputationDelta: 5,
            stressDelta: -15
        },
        option2: {
            text: "Pasrah dan berdoa saja (Stres +20)",
            budgetDelta: 0,
            reputationDelta: 0,
            stressDelta: 20
        }
    }
];

// Mengambil Elemen HTML
const dayCounterEl = document.getElementById('day-counter');
const budgetValEl = document.getElementById('budget-value');
const reputationBarEl = document.getElementById('reputation-bar');
const stressBarEl = document.getElementById('stress-bar');
const storyTextEl = document.getElementById('story-text');
const btnOption1 = document.getElementById('btn-option1');
const btnOption2 = document.getElementById('btn-option2');
const actionButtonsEl = document.getElementById('action-buttons');
const restartContainerEl = document.getElementById('restart-container');
const btnRestart = document.getElementById('btn-restart');

// Fungsi Format Rupiah
function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
}

// Fungsi Update Tampilan UI
function updateUI() {
    budgetValEl.innerText = formatRupiah(budget);
    
    // Mencegah indikator kurang dari 0 atau lebih dari 100
    reputation = Math.max(0, Math.min(100, reputation));
    stress = Math.max(0, Math.min(100, stress));

    reputationBarEl.style.width = reputation + '%';
    stressBarEl.style.width = stress + '%';

    if (currentDay < scenarios.length) {
        dayCounterEl.innerText = `Hari ke-${currentDay + 1} dari ${scenarios.length}`;
        const currentScenario = scenarios[currentDay];
        storyTextEl.innerText = currentScenario.story;
        btnOption1.innerText = currentScenario.option1.text;
        btnOption2.innerText = currentScenario.option2.text;
    }
}

// Fungsi Memilih Jawaban
function makeChoice(optionNumber) {
    const currentScenario = scenarios[currentDay];
    const selectedOption = optionNumber === 1 ? currentScenario.option1 : currentScenario.option2;

    // Terapkan Efek Perubahan
    budget += selectedOption.budgetDelta;
    reputation += selectedOption.reputationDelta;
    stress += selectedOption.stressDelta;

    currentDay++;

    // Cek Kondisi Kalah atau Menang
    if (budget < 0) {
        endGame("GAME OVER: Uang pensi habis/minus! Kamu dipanggil kepala sekolah karena utang.");
    } else if (stress >= 100) {
        endGame("GAME OVER: Kamu mengalami burnout parah dan dilarikan ke UKS. Pensi terbengkalai.");
    } else if (reputation <= 0) {
        endGame("GAME OVER: Reputasi panitia hancur. Teman-teman dan guru tidak percaya lagi padamu.");
    } else if (currentDay >= scenarios.length) {
        endGame(`SELAMAT! Pensi Sekolah Sukses Diposisikan! Sisa Anggaran: ${formatRupiah(budget)}, Reputasi: ${reputation}%, Stres: ${stress}%.`);
    } else {
        updateUI();
    }
}

// Fungsi Akhir Permainan
function endGame(message) {
    storyTextEl.innerText = message;
    actionButtonsEl.classList.add('hidden');
    restartContainerEl.classList.remove('hidden');
}

// Fungsi Reset Game
function restartGame() {
    budget = 5000000;
    reputation = 50;
    stress = 20;
    currentDay = 0;

    actionButtonsEl.classList.remove('hidden');
    restartContainerEl.classList.add('hidden');
    updateUI();
}

// Event Listeners (Menghubungkan Klik Tombol ke Logika JavaScript)
btnOption1.addEventListener('click', () => makeChoice(1));
btnOption2.addEventListener('click', () => makeChoice(2));
btnRestart.addEventListener('click', restartGame);

// Jalankan UI Pertama Kali
updateUI();
