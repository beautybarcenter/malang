
      // Fungsi Toast Modern dengan dukungan ikon & warna otomatis (Sukses / Error / Peringatan)
      function showToast(message, type = "success") {
        let container = document.getElementById("toastContainer");
        if (!container) return;

        // Menyesuaikan ikon & tipe berdasarkan parameter 'type'
        let iconHtml = '<i class="fa-solid fa-circle-check toast-icon"></i>';
        if (type === "error") {
          iconHtml = '<i class="fa-solid fa-circle-xmark toast-icon"></i>'; // Ikon Silang/X untuk Error
        } else if (type === "warning") {
          iconHtml =
            '<i class="fa-solid fa-triangle-exclamation toast-icon"></i>';
        }

        let toast = document.createElement("div");
        toast.className = `toast-notification ${type}`;
        toast.innerHTML = `
                ${iconHtml}
                <div class="toast-content">${message}</div>
            `;
        container.appendChild(toast);

        setTimeout(() => {
          toast.style.animation = "toastOut 0.3s ease forwards";
          setTimeout(() => toast.remove(), 300);
        }, 3500);
      }

      // Fungsi pengganti confirm() klasik menjadi Modal Dialog Modern
      function showConfirmModal(title, message, onOk) {
        let modal = document.getElementById("customDialogModal");
        let titleEl = document.getElementById("dialogTitle");
        let msgEl = document.getElementById("dialogMessage");
        let inputContainer = document.getElementById("dialogInputContainer");
        let okBtn = document.getElementById("dialogOkBtn");
        let cancelBtn = document.getElementById("dialogCancelBtn");

        titleEl.innerText = title;
        msgEl.innerText = message;
        inputContainer.style.display = "none";
        modal.style.display = "flex";

        let cleanup = () => {
          modal.style.display = "none";
          okBtn.onclick = null;
          cancelBtn.onclick = null;
        };

        okBtn.onclick = function () {
          cleanup();
          if (onOk) onOk(true);
        };
        cancelBtn.onclick = function () {
          cleanup();
        };
      }

      // Fungsi pengganti prompt() klasik menjadi Modal Input Modern
      function showPromptModal(title, message, placeholder, onOk) {
        let modal = document.getElementById("customDialogModal");
        let titleEl = document.getElementById("dialogTitle");
        let msgEl = document.getElementById("dialogMessage");
        let inputContainer = document.getElementById("dialogInputContainer");
        let inputField = document.getElementById("dialogInputField");
        let okBtn = document.getElementById("dialogOkBtn");
        let cancelBtn = document.getElementById("dialogCancelBtn");

        titleEl.innerText = title;
        msgEl.innerText = message;
        inputField.value = "";
        inputField.placeholder = placeholder || "";
        inputContainer.style.display = "block";
        modal.style.display = "flex";
        setTimeout(() => inputField.focus(), 100);

        let cleanup = () => {
          modal.style.display = "none";
          inputContainer.style.display = "none";
          okBtn.onclick = null;
          cancelBtn.onclick = null;
        };

        okBtn.onclick = function () {
          let val = inputField.value.trim();
          if (!val) {
            showToast("Keterangan wajib diisi!", "warning");
            return;
          }
          cleanup();
          if (onOk) onOk(val);
        };
        cancelBtn.onclick = function () {
          cleanup();
        };
      }

      const SUPABASE_API_URL = "https://oopkenabzffdokbxdqpw.supabase.co/functions/v1/beauty-bar-api";
      const SUPABASE_ANON_KEY = "sb_publishable_Fk9D05UwSM-BMcR1Zwg1Hw_bkNpKbWz";
      const SCRIPT_URL = SUPABASE_API_URL;
      const nativeFetch = window.fetch.bind(window);
      async function supabaseFetch(url, options = {}) {
        const headers = new Headers(options.headers || {});
        headers.set("apikey", SUPABASE_ANON_KEY);
        const token = sessionStorage.getItem("beautybar_access_token");
        if (token) headers.set("Authorization", "Bearer " + token);
        else headers.delete("Authorization");
        const opts = { ...options, headers };
        if (opts.mode === "no-cors") delete opts.mode;
        const response = await nativeFetch(url, opts);
        if (!response.ok) {
          let detail = {};
          try { detail = await response.clone().json(); } catch (_) {}
          const requestError = new Error(detail.message || "Supabase request failed: " + response.status);
          requestError.status = response.status;
          requestError.detail = detail;
          throw requestError;
        }
        return response;
      }
      let compressedBase64 = "";

      let siteSettings = {
        holidayMode: false,
        holidayMessage:
          "Mohon maaf, Beauty Bar Malang sedang tutup / libur sementara.",
        bgImage:
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1920&q=80",
        heroImage: "https://oopkenabzffdokbxdqpw.supabase.co/storage/v1/object/public/site-assets/home/hero.webp",
        qrisImage: "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg",
        themePreset: "minimal_white",
        scriptFont: "'Great Vibes', cursive",
        openDays: {
          0: true,
          1: true,
          2: true,
          3: true,
          4: true,
          5: true,
          6: true,
        },
        hourOpen: "10:00",
        hourClose: "21:00",
        blockedDateHours: {},
        sessionCombinations: [],
      };

      const themePresets = {
        minimal_white: {
          cardBg: "rgba(255, 255, 255, 0.98)",
          navBg: "#ffffff",
          footerBg: "#ffffff",
          accent: "#775563",
          gradient: "linear-gradient(135deg, #f4f4f5 0%, #dfe2e6 100%)",
          textMain: "#242124",
          textMuted: "#625d63",
          border: "rgba(35, 30, 32, 0.18)",
          ink: "#242124",
        },
      };
      function updateFontPreview(fontValue) {
        let previewEl = document.getElementById("previewLashText");
        if (previewEl) {
          previewEl.style.fontFamily = fontValue;
        }
      }

      const defaultServices = [
        // ===== LASH TREATMENT (7) =====
        {
          name: "Lashlift",
          price: 50000,
          duration: 60,
          image: "https://lh3.googleusercontent.com/d/1kUK6Yv-T4Nv65_18UjRr6vZmK8JWlC-v",
          durability: "Ketahanan ± 2 Bulan",
          category: "Lash Treatment",
          active: true,
        },
        {
          name: "Lashlift Tint",
          price: 60000,
          duration: 60,
          image: "https://lh3.googleusercontent.com/d/1kUK6Yv-T4Nv65_18UjRr6vZmK8JWlC-v",
          durability: "Ketahanan ± 2 Bulan",
          category: "Lash Treatment",
          active: true,
        },
        {
          name: "Lashlift Keratin Tint",
          price: 75000,
          duration: 60,
          image: "https://lh3.googleusercontent.com/d/1kUK6Yv-T4Nv65_18UjRr6vZmK8JWlC-v",
          durability: "Ketahanan ± 2 Bulan",
          category: "Lash Treatment",
          active: true,
        },
        {
          name: "Korean Lashlift",
          price: 130000,
          duration: 60,
          image: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=600&q=80",
          durability: "Ketahanan ± 2 Bulan",
          category: "Lash Treatment",
          active: true,
        },
        {
          name: "Korean Lashlift Tint",
          price: 150000,
          duration: 60,
          image: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=600&q=80",
          durability: "Ketahanan ± 2-3 Bulan",
          category: "Lash Treatment",
          active: true,
        },
        {
          name: "Extra Keratin",
          price: 15000,
          duration: 15,
          image: "https://lh3.googleusercontent.com/d/1kUK6Yv-T4Nv65_18UjRr6vZmK8JWlC-v",
          durability: "Perawatan Ekstra Lembut",
          category: "Lash Treatment",
          active: true,
        },
        {
          name: "Remove Lashlift",
          price: 40000,
          duration: 40,
          image: "https://lh3.googleusercontent.com/d/1kUK6Yv-T4Nv65_18UjRr6vZmK8JWlC-v",
          durability: "Pembersihan Lembut",
          category: "Lash Treatment",
          active: true,
        },
        // ===== ALL TREATMENT (7) =====
        {
          name: "Threading",
          price: 40000,
          duration: 20,
          image: "https://lh3.googleusercontent.com/d/1DpZrR23BNyG6e3RNXKloiC-MyZi_l-iA",
          durability: "Ketahanan ± 3-4 Minggu",
          category: "All Treatment",
          active: true,
        },
        {
          name: "Threading Tint",
          price: 55000,
          duration: 20,
          image: "https://lh3.googleusercontent.com/d/1DpZrR23BNyG6e3RNXKloiC-MyZi_l-iA",
          durability: "Ketahanan ± 1 Bulan",
          category: "All Treatment",
          active: true,
        },
        {
          name: "Brow Bomber",
          price: 70000,
          duration: 60,
          image: "https://lh3.googleusercontent.com/d/1DpZrR23BNyG6e3RNXKloiC-MyZi_l-iA",
          durability: "Ketahanan ± 1 Bulan",
          category: "All Treatment",
          active: true,
        },
        {
          name: "Brow Bomber Inlei",
          price: 130000,
          duration: 60,
          image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
          durability: "Ketahanan ± 1.5 Bulan",
          category: "All Treatment",
          active: true,
        },
        {
          name: "Brow Bomber Inlei Tint",
          price: 150000,
          duration: 60,
          image: "https://lh3.googleusercontent.com/d/1DpZrR23BNyG6e3RNXKloiC-MyZi_l-iA",
          durability: "Ketahanan ± 1.5 Bulan",
          category: "All Treatment",
          active: true,
        },
        {
          name: "Brow Bomber + Threading",
          price: 110000,
          duration: 75,
          image: "https://lh3.googleusercontent.com/d/1DpZrR23BNyG6e3RNXKloiC-MyZi_l-iA",
          durability: "Ketahanan ± 1-1.5 Bulan",
          category: "All Treatment",
          active: true,
        },
        {
          name: "Lashlift, Brow Bomber, Threading",
          price: 180000,
          duration: 90,
          image: "https://lh3.googleusercontent.com/d/1kUK6Yv-T4Nv65_18UjRr6vZmK8JWlC-v",
          durability: "Paket Lengkap Mata Cantik",
          category: "All Treatment",
          active: true,
        },
        // ===== BROW TREATMENT (4) =====
        {
          name: "Retouch Tint/Hena",
          price: 20000,
          duration: 20,
          image: "https://lh3.googleusercontent.com/d/1DpZrR23BNyG6e3RNXKloiC-MyZi_l-iA",
          durability: "Penyegaran Warna Alis",
          category: "Brow Treatment",
          active: true,
        },
        {
          name: "Chin",
          price: 40000,
          duration: 15,
          image: "https://lh3.googleusercontent.com/d/1DpZrR23BNyG6e3RNXKloiC-MyZi_l-iA",
          durability: "Ketahanan ± 2-3 Minggu",
          category: "Brow Treatment",
          active: true,
        },
        {
          name: "Cheek",
          price: 40000,
          duration: 15,
          image: "https://lh3.googleusercontent.com/d/1DpZrR23BNyG6e3RNXKloiC-MyZi_l-iA",
          durability: "Ketahanan ± 2-3 Minggu",
          category: "Brow Treatment",
          active: true,
        },
        {
          name: "Forehead",
          price: 40000,
          duration: 15,
          image: "https://lh3.googleusercontent.com/d/1DpZrR23BNyG6e3RNXKloiC-MyZi_l-iA",
          durability: "Ketahanan ± 2-3 Minggu",
          category: "Brow Treatment",
          active: true,
        },
      ];

      let servicesList = defaultServices;

      // ===== KATEGORI LAYANAN (bisa diatur dari admin) =====
      // Kategori/grup layanan dimuat dari settings database.
      // Daftar kosong dipakai sampai konfigurasi database selesai dimuat.
      let categoryList = [];
      let categoryServicesNeedSave = false;

      function getCategoryNames() {
        // Ambil nama kategori dari categoryList, plus kategori unik dari servicesList yg belum terdaftar
        let listed = categoryList.map(c => c.name);
        let fromServices = [...new Set(servicesList.map(s => s.category || "").filter(Boolean))];
        fromServices.forEach(c => { if (!listed.includes(c)) listed.push(c); });
        return listed;
      }

      function getCategoryIcon(catName) {
        let found = categoryList.find(c => c.name === catName);
        return found ? found.icon : "fa-solid fa-tag";
      }

      async function persistCategoryList() {
        const categories = categoryList.map((cat, index) => ({
          name: String(cat.name || "").trim(),
          icon: String(cat.icon || "fa-solid fa-tag"),
          sortOrder: index,
        })).filter(cat => cat.name);
        const response = await supabaseFetch(SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "actionSettings",
            settings: { ...siteSettings, categories },
          }),
        });
        siteSettings.categories = categories;
        return response;
      }

      async function persistServicesList() {
        return supabaseFetch(SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "updateServices", services: servicesList }),
        });
      }

      // ===== DATA INFO KATALOG =====
      let infoKatalogData = {
        penjelasan: [
          {
            kategori: "Brow Treatment",
            icon: "fa-solid fa-eye",
            items: [
              {
                nama: "Threading",
                deskripsi: "Treatment mencabut bulu menggunakan benang khusus yang dipilin. Sehingga tumbuh bulu lebih lama dibandingkan cukur, dan hasilnya pun lebih clean.",
                poin: []
              },
              {
                nama: "Brow Lamination",
                deskripsi: "Mengatur helaian alis menggunakan cream khusus yang membuat alis tampak rapi, berserat dan bervolume. Tanpa menggunakan warna tambahan.",
                poin: []
              },
              {
                nama: "Brow Bomber",
                deskripsi: "Mengatur helaian alis yang menggunakan cream khusus dan menggunakan warna tambahan seperti Tint atau Hena.",
                poin: []
              }
            ]
          },
          {
            kategori: "Lash Treatment",
            icon: "fa-solid fa-star",
            items: [
              {
                nama: "Lashlift",
                deskripsi: "Hanya melentikan bulu mata.",
                poin: []
              },
              {
                nama: "Lashlift Tint",
                deskripsi: "Dilentikan dan diberi tint atau warna sehingga lebih tegas seperti memakai maskara (tetapi tidak menambah ketebalan, hanya saja lebih hitam natural).",
                poin: []
              },
              {
                nama: "Lash Clasic",
                deskripsi: "",
                poin: ["Menggunakan lem","Kelentikan lebih melengkung","Efek seperti memakai penjepit bulu mata","Efek lebih natural","Cocok untuk look glam elegant"]
              },
              {
                nama: "Korean Lashlift",
                deskripsi: "",
                poin: ["Tidak menggunakan lem","Bahan yang digunakan lebih gentle","Cocok untuk bulu mata dan kulit sensitif","Lift lebih tegak dari akar","Lebih dramatis","Cocok untuk bulu mata pendek","Cocok untuk look Korean","Cocok untuk make up natural","Minim terjadi keriting","Lebih tahan lama"]
              }
            ]
          }
        ],
        ketahanan: [
          { label: "Lashlift", nilai: "± 2 Bulan", icon: "⏳" },
          { label: "Threading", nilai: "± 1–2 Bulan", icon: "⏳" },
          { label: "Brow Bomber", nilai: "± 4–5 Minggu", icon: "⏳" }
        ],
        durasi: [
          { nama: "Brow Threading", waktu: "10–15 Menit" },
          { nama: "Korean Lashlift", waktu: "± 40 Menit" },
          { nama: "Lashlift Clasic", waktu: "± 50 Menit" },
          { nama: "Brow Bomber", waktu: "± 50 Menit" }
        ],
        policy: [
          { teks: "<strong>Booking minimal H-1,</strong> karena slot terbatas. Tetapi bisa booking hari H jika slot masih tersedia." },
          { teks: "<strong>No DP = No Slot.</strong> Jadwal yang diinginkan akan diamankan setelah DP masuk." },
          { teks: "<strong>Jam booking adalah jam dimulainya pengerjaan atau tindakan.</strong> Jadi, dimohon datang tepat waktu." },
          { teks: "<strong>Minimal keterlambatan 15 menit,</strong> agar tidak mengganggu jadwal customer berikutnya." },
          { teks: "<strong>Jika reschedule,</strong> konfirmasi H-1 dari tanggal yang di-booking. Jika hari H tidak bisa maka <strong>DP hangus.</strong> Atau keterlambatan melebihi toleran 15 menit, <strong>DP hangus.</strong>" }
        ]
      };

      function cleanTimeString(timeVal, defaultVal) {
        if (!timeVal) return defaultVal || "10:00";
        let s = String(timeVal).trim();
        let m = s.match(/(\d{1,2}):(\d{2})/);
        if (m) {
          let h = m[1].padStart(2, "0");
          let min = m[2];
          return `${h}:${min}`;
        }
        return defaultVal || "10:00";
      }

      function cleanFontString(fontVal, defaultVal) {
        let def = defaultVal || "'Great Vibes', cursive";
        if (!fontVal) return def;
        let s = String(fontVal).trim();
        let known = [
          "Great Vibes",
          "Pacifico",
          "Sacramento",
          "Dancing Script",
          "Caveat",
          "Parisienne"
        ];
        for (let i = 0; i < known.length; i++) {
          if (s.toLowerCase().includes(known[i].toLowerCase())) {
            return `'${known[i]}', cursive`;
          }
        }
        return s || def;
      }

      function parseSafeDateTime(input) {
        if (!input) return null;
        if (input instanceof Date) return isNaN(input.getTime()) ? null : input;

        let str = input.toString().trim().replace(/^'/, "");
        if (!str) return null;

        // ISO timestamps with an explicit timezone (Z, +00:00, +07:00, etc.)
        // must be parsed as instants. Do not strip the offset: doing so turns
        // 07:00Z into 07:00 local instead of the correct 14:00 WIB.
        if (/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:?\d{2})$/i.test(str)) {
          let zoned = new Date(str.replace(" ", "T"));
          return isNaN(zoned.getTime()) ? null : zoned;
        }

        // Legacy values without timezone are treated as local salon time.
        let clean = str.replace("T", " ").trim();
        let parts = clean.split(" ");
        let datePart = parts[0];
        let timePart = parts[1] || "00:00:00";
        let year, month, day;

        if (datePart.includes("-")) {
          let dParts = datePart.split("-");
          if (dParts[0].length === 4) {
            year = parseInt(dParts[0], 10);
            month = parseInt(dParts[1], 10) - 1;
            day = parseInt(dParts[2], 10);
          } else {
            day = parseInt(dParts[0], 10);
            month = parseInt(dParts[1], 10) - 1;
            year = parseInt(dParts[2], 10);
          }
        } else if (datePart.includes("/")) {
          let dParts = datePart.split("/");
          if (dParts[0].length === 4) {
            year = parseInt(dParts[0], 10);
            month = parseInt(dParts[1], 10) - 1;
            day = parseInt(dParts[2], 10);
          } else {
            // Format Indonesia: DD/MM/YYYY.
            day = parseInt(dParts[0], 10);
            month = parseInt(dParts[1], 10) - 1;
            year = parseInt(dParts[2], 10);
          }
        } else {
          let fallback = new Date(str);
          return isNaN(fallback.getTime()) ? null : fallback;
        }

        let [h, m, sec] = timePart.split(":").map((val) => parseInt(val, 10) || 0);
        return new Date(year, month, day, h, m, sec);
      }

      function getStandardDateKey(dateInput) {
        let d = parseSafeDateTime(dateInput);
        if (!d) return "";
        let y = d.getFullYear();
        let m = String(d.getMonth() + 1).padStart(2, "0");
        let day = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
      }

      function getLocalTodayStr() {
        // Menggunakan waktu lokal perangkat (Indonesia GMT+7), bukan UTC
        let now = new Date();
        let y = now.getFullYear();
        let m = String(now.getMonth() + 1).padStart(2, "0");
        let d = String(now.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
      }

      function formatIndonesianDateTitle(dateInput) {
        let d = parseSafeDateTime(dateInput);
        if (!d) return dateInput || "-";
        let days = [
          "Minggu",
          "Senin",
          "Selasa",
          "Rabu",
          "Kamis",
          "Jumat",
          "Sabtu",
        ];
        let months = [
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
          "Desember",
        ];
        let dayName = days[d.getDay()];
        let dayNum = String(d.getDate()).padStart(2, "0");
        let monthName = months[d.getMonth()];
        let year = d.getFullYear();
        return `${dayName}, ${dayNum} ${monthName} ${year}`;
      }

      function onBookingDateSelected() {
        let dateInput = document.getElementById("cDate");
        let dateVal = dateInput.value;
        let displayEl = document.getElementById("cDateDisplay");
        if (dateVal) {
          let d = parseSafeDateTime(dateVal);
          if (d) {
            let days = [
              "Minggu",
              "Senin",
              "Selasa",
              "Rabu",
              "Kamis",
              "Jumat",
              "Sabtu",
            ];
            let months = [
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
              "Desember",
            ];
            let dayName = days[d.getDay()];
            let dayNum = String(d.getDate()).padStart(2, "0");
            let monthNum = String(d.getMonth() + 1).padStart(2, "0");
            let monthName = months[d.getMonth()];
            let year = d.getFullYear();
            let ddMmYyyy = `${dayNum}/${monthNum}/${year}`;

            if (displayEl) {
              displayEl.style.display = "block";
              displayEl.innerHTML = `
                            <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.08); padding: 5px 10px; border-radius: 8px; border: 1px solid var(--accent); margin-top: 4px;">
                                <span style="background: var(--accent); color: #000; padding: 2px 7px; border-radius: 5px; font-weight: bold; font-size: 0.78rem;">${ddMmYyyy}</span>
                                <span style="font-size: 0.8rem; color: var(--text-main); font-weight: 500;">${dayName}, ${dayNum} ${monthName} ${year}</span>
                            </div>
                        `;
            }
          }
        } else if (displayEl) {
          displayEl.style.display = "none";
          displayEl.innerHTML = "";
        }
        generateAvailableSlots();
      }

      window.onload = function () {
        let _opOpen = document.getElementById("opHourOpen");
        let _opClose = document.getElementById("opHourClose");
        if (_opOpen)
          _opOpen.value = cleanTimeString(siteSettings.hourOpen, "10:00");
        if (_opClose)
          _opClose.value = cleanTimeString(siteSettings.hourClose, "21:00");

        applySiteCustomization();
        applyHolidayModeUI();
        renderCatalogUI();
        initCatalogViewPreference();
        renderCustomerServices();
        renderOperationalDaysConfig();
        fetchSiteConfig();
        resetBookingForm();
        setMinDate();

        // Enter Key Navigation untuk form booking
        let bookingForm = document.getElementById("clientBookingForm");
        if (bookingForm) {
          bookingForm.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
              // Jika target adalah textarea atau tombol, biarkan perilaku default
              if (e.target.tagName === "TEXTAREA" || e.target.tagName === "BUTTON") return;
              e.preventDefault();

              let panel = e.target.closest(".step-panel");
              if (!panel) return;
              let currentStep = parseInt(panel.dataset.panel);

              let inputs = Array.from(
                panel.querySelectorAll("input:not([type='hidden']):not([type='file']), select")
              ).filter((el) => !el.disabled && el.offsetParent !== null);

              let idx = inputs.indexOf(e.target);
              if (idx > -1 && idx < inputs.length - 1) {
                // Pindah ke input/select berikutnya di panel yang sama
                inputs[idx + 1].focus();
              } else {
                // Jika input terakhir di step tersebut
                if (currentStep < 4) {
                  goToStep(currentStep + 1);
                } else if (currentStep === 4) {
                  // Step terakhir: trigger pengiriman form jika valid
                  let submitBtn = document.getElementById("submitBtn");
                  if (submitBtn && !submitBtn.disabled) {
                    submitBtn.click();
                  } else {
                    let fileInput = document.getElementById("cPaymentProof");
                    if (fileInput && !fileInput.files.length) {
                      fileInput.click();
                    }
                  }
                }
              }
            }
          });
        }

        // Enter key shortcut pada form login admin
        let adminPassInput = document.getElementById("adminPass");
        if (adminPassInput) {
          adminPassInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
              e.preventDefault();
              loginAdmin();
            }
          });
        }

        // Enter key shortcut pada form cek status booking
        let checkPhoneInput = document.getElementById("checkPhoneInput");
        if (checkPhoneInput) {
          checkPhoneInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
              e.preventDefault();
              checkBookingStatus();
            }
          });
        }

        document.addEventListener("click", function (event) {
          let navLinks = document.getElementById("navLinks");
          let menuToggle = document.querySelector(".menu-toggle");
          if (navLinks && navLinks.classList.contains("active")) {
            if (
              !navLinks.contains(event.target) &&
              !menuToggle.contains(event.target)
            ) {
              navLinks.classList.remove("active");
            }
          }
        });
      };

      async function fetchSiteConfig() {
        try {
          let response = await supabaseFetch(SCRIPT_URL);
          let resData = await response.json();
          const hasServerServices = Array.isArray(resData.services) && resData.services.length > 0;
          if (hasServerServices) {
            servicesList = resData.services;
          }
          if (resData.settings) {
            siteSettings = { ...siteSettings, ...resData.settings };
            if (!siteSettings.openDays)
              siteSettings.openDays = {
                0: true,
                1: true,
                2: true,
                3: true,
                4: true,
                5: true,
                6: true,
              };
            if (!siteSettings.blockedDateHours)
              siteSettings.blockedDateHours = {};
            if (!Array.isArray(siteSettings.sessionCombinations))
              siteSettings.sessionCombinations = [];
            siteSettings.hourOpen = cleanTimeString(
              siteSettings.hourOpen,
              "10:00",
            );
            siteSettings.hourClose = cleanTimeString(
              siteSettings.hourClose,
              "21:00",
            );
            delete siteSettings.adminPasswordBase64;
            siteSettings.scriptFont = cleanFontString(
              siteSettings.scriptFont,
              "'Great Vibes', cursive",
            );

            // Muat infoKatalogData dari settings jika ada
            if (siteSettings.infoKatalog) {
              infoKatalogData = { ...infoKatalogData, ...siteSettings.infoKatalog };
            }

            if (Array.isArray(siteSettings.categories)) {
              categoryList = siteSettings.categories
                .filter(cat => cat && String(cat.name || "").trim())
                .map(cat => ({
                  name: String(cat.name).trim(),
                  icon: String(cat.icon || "fa-solid fa-tag"),
                }));
            } else {
              // Migrasi satu kali: bentuk kategori dari data layanan yang sudah tersimpan.
              const names = hasServerServices
                ? [...new Set(servicesList.map(service => String(service.category || "").trim()).filter(Boolean))]
                : [];
              categoryList = names.map(name => ({ name, icon: "fa-solid fa-tag" }));
              if (categoryList.length) {
                try {
                  await persistCategoryList();
                  console.info("Kategori layanan awal berhasil dimigrasikan ke database.");
                } catch (migrationError) {
                  console.warn("Migrasi kategori belum tersimpan; kategori tetap tersedia sementara.", migrationError);
                }
              }
            }

            let _opOpen = document.getElementById("opHourOpen");
            let _opClose = document.getElementById("opHourClose");
            if (_opOpen) _opOpen.value = siteSettings.hourOpen;
            if (_opClose) _opClose.value = siteSettings.hourClose;
          }
        } catch (e) {
          console.log("Menggunakan default config");
        }
        applySiteCustomization();
        applyHolidayModeUI();
        renderCatalogUI();
        initCatalogViewPreference();
        renderCustomerServices();
        renderOperationalDaysConfig();
        renderBlockedHistoryList();
        if (document.getElementById("blockTargetDate").value) {
          renderBlockedHoursEditor();
        }
      }

      function applySiteCustomization() {
        if (siteSettings.bgImage) {
          document.documentElement.style.setProperty(
            "--bg-image",
            `url('${siteSettings.bgImage}')`,
          );
        }

        if (siteSettings.scriptFont) {
          siteSettings.scriptFont = cleanFontString(
            siteSettings.scriptFont,
            "'Great Vibes', cursive",
          );
          document.documentElement.style.setProperty(
            "--custom-script-font",
            siteSettings.scriptFont,
          );
          let scriptFontInput = document.getElementById("custScriptFontInput");
          if (scriptFontInput) {
            scriptFontInput.value = siteSettings.scriptFont;
            updateFontPreview(siteSettings.scriptFont);
          }
        }

        // Tema permanen: putih bersih, tidak bergantung pada konfigurasi database.
        const tPreset = "minimal_white";
        const theme = themePresets.minimal_white;
        siteSettings.themePreset = tPreset;
        // Tandai tema aktif agar stylesheet dapat menyesuaikan elemen yang
        // sebelumnya memakai warna gelap secara langsung.
        document.documentElement.setAttribute("data-theme-preset", tPreset);

        document.documentElement.style.setProperty("--card-bg", theme.cardBg);
        document.documentElement.style.setProperty("--nav-bg", theme.navBg);
        document.documentElement.style.setProperty(
          "--footer-bg",
          theme.footerBg,
        );
        document.documentElement.style.setProperty("--accent", theme.accent);
        document.documentElement.style.setProperty(
          "--accent-gradient",
          theme.gradient,
        );
        document.documentElement.style.setProperty(
          "--text-main",
          theme.textMain,
        );
        document.documentElement.style.setProperty(
          "--text-muted",
          theme.textMuted,
        );
        document.documentElement.style.setProperty("--border", theme.border);
        document.documentElement.style.setProperty("--ink", theme.ink || "#2a1220");


        {
          // Foto Beranda dikelola melalui Supabase Storage: ganti file home/hero.webp
          // tanpa perlu mengubah pengaturan atau kode website.
          const heroStorageUrl = "https://oopkenabzffdokbxdqpw.supabase.co/storage/v1/object/public/site-assets/home/hero.webp";
          let heroImgEl = document.getElementById("heroHomeImage");
          if (heroImgEl) heroImgEl.src = heroStorageUrl;
          let prevHero = document.getElementById("previewHero");
          if (prevHero) {
            prevHero.src = heroStorageUrl;
            prevHero.style.display = "block";
          }
          let heroInput = document.getElementById("custHeroInput");
          if (heroInput) heroInput.value = heroStorageUrl;
        }

        if (siteSettings.qrisImage) {
          let qrisImgEl = document.getElementById("qrisImageElement");
          if (qrisImgEl) qrisImgEl.src = siteSettings.qrisImage;
          let prevQris = document.getElementById("previewQris");
          if (prevQris) {
            prevQris.src = siteSettings.qrisImage;
            prevQris.style.display = "block";
          }
          let qrisInput = document.getElementById("custQrisInput");
          if (qrisInput) qrisInput.value = siteSettings.qrisImage;
        }
      }

      function applyHolidayModeUI() {
        let bannerContainer = document.getElementById("holidayBannerContainer");
        let messageText = document.getElementById("holidayMessageText");
        let actionContainer = document.getElementById("heroActionContainer");

        if (siteSettings.holidayMode) {
          if (bannerContainer) bannerContainer.style.display = "block";
          if (messageText)
            messageText.innerText =
              siteSettings.holidayMessage ||
              "Mohon maaf, Beauty Bar Malang sedang libur sementara.";
          if (actionContainer)
            actionContainer.innerHTML = `<div style="background: #3b0d0d; border: 1px solid #ff8787; color: #ff8787; padding: 10px 20px; border-radius: 20px; font-weight: bold; display: inline-block; font-size: 0.85rem;">🔒 Pendaftaran Booking Ditutup (Libur)</div>`;
        } else {
          if (bannerContainer) bannerContainer.style.display = "none";
          if (actionContainer) {
            actionContainer.innerHTML = `
                        <button type="button" onclick="switchPage('booking')" class="btn-gold" id="bookingTriggerBtn">Booking Sekarang <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
                        <p style="color: var(--text-muted); font-size: 0.85rem;">
                            Sudah booking? Cek status nya <a onclick="switchPage('check')" style="color: var(--accent); text-decoration: underline; cursor: pointer; font-weight: 600;">disini</a>
                        </p>
                    `;
          }
        }

        let holidayCheckbox = document.getElementById("holidayModeCheckbox");
        let holidayMsgInput = document.getElementById("holidayMessageInput");
        if (holidayCheckbox) holidayCheckbox.checked = siteSettings.holidayMode;
        if (holidayMsgInput)
          holidayMsgInput.value = siteSettings.holidayMessage || "";

        let _hOpen = document.getElementById("opHourOpen");
        let _hClose = document.getElementById("opHourClose");
        if (_hOpen)
          _hOpen.value = cleanTimeString(siteSettings.hourOpen, "10:00");
        if (_hClose)
          _hClose.value = cleanTimeString(siteSettings.hourClose, "21:00");
      }

      function renderOperationalDaysConfig() {
        let container = document.getElementById("operationalDaysContainer");
        if (!container) return;
        container.innerHTML = "";

        let daysMap = [
          { id: 1, name: "Senin" },
          { id: 2, name: "Selasa" },
          { id: 3, name: "Rabu" },
          { id: 4, name: "Kamis" },
          { id: 5, name: "Jumat" },
          { id: 6, name: "Sabtu" },
          { id: 0, name: "Minggu" },
        ];

        if (!siteSettings.openDays)
          siteSettings.openDays = {
            0: true,
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
            6: true,
          };

        daysMap.forEach((d) => {
          let isOpen = siteSettings.openDays[d.id] !== false;
          let div = document.createElement("div");
          div.style.cssText =
            "background: rgba(0,0,0,0.25); border: 1px solid var(--border); padding: 8px; border-radius: 8px; display: flex; align-items: center; gap: 6px;";
          div.innerHTML = `
                    <input type="checkbox" id="dayCheck_${d.id}" ${isOpen ? "checked" : ""} style="width: 16px; height: 16px; accent-color: var(--accent); cursor: pointer;">
                    <label for="dayCheck_${d.id}" style="font-size: 0.75rem; color: var(--text-main); font-weight: bold; margin-bottom: 0; cursor: pointer;">${d.name}</label>
                `;
          container.appendChild(div);
        });
      }

      function toggleFullDayBlock() {
        let dateVal = document.getElementById("blockTargetDate").value;
        if (!dateVal) return;
        let isFullDay = document.getElementById("blockFullDayCheckbox").checked;

        if (
          !siteSettings.blockedDateHours ||
          typeof siteSettings.blockedDateHours !== "object"
        ) {
          siteSettings.blockedDateHours = {};
        }

        if (isFullDay) {
          siteSettings.blockedDateHours[dateVal] = ["FULL_DAY"];
        } else {
          if (Array.isArray(siteSettings.blockedDateHours[dateVal])) {
            let idx =
              siteSettings.blockedDateHours[dateVal].indexOf("FULL_DAY");
            if (idx > -1) siteSettings.blockedDateHours[dateVal].splice(idx, 1);
            if (siteSettings.blockedDateHours[dateVal].length === 0)
              delete siteSettings.blockedDateHours[dateVal];
          } else {
            delete siteSettings.blockedDateHours[dateVal];
          }
        }
        renderBlockedHoursEditor();
        renderBlockedHistoryList();
      }

      function renderBlockedHoursEditor() {
        let dateVal = document.getElementById("blockTargetDate").value;
        let container = document.getElementById("blockHoursGridContainer");
        let fullDayChk = document.getElementById("blockFullDayCheckbox");
        let fullDayLbl = document.getElementById("fullDayLabel");
        if (!container) return;

        let blockDisplayEl = document.getElementById("blockTargetDateDisplay");
        if (!dateVal) {
          if (blockDisplayEl) blockDisplayEl.style.display = "none";
          if (fullDayChk) {
            fullDayChk.disabled = true;
            fullDayChk.checked = false;
          }
          if (fullDayLbl) {
            fullDayLbl.style.color = "var(--text-muted)";
            fullDayLbl.style.cursor = "not-allowed";
          }
          container.innerHTML = `<span style="color: var(--text-muted); font-size: 0.75rem; grid-column: 1 / -1;">Pilih tanggal di atas terlebih dahulu.</span>`;
          return;
        } else {
          if (blockDisplayEl) {
            blockDisplayEl.style.display = "block";
            blockDisplayEl.innerHTML = `📅 <b>${formatIndonesianDateTitle(dateVal)}</b>`;
          }
          if (fullDayChk) fullDayChk.disabled = false;
          if (fullDayLbl) {
            fullDayLbl.style.color = "var(--text-main)";
            fullDayLbl.style.cursor = "pointer";
          }
        }

        if (
          !siteSettings.blockedDateHours ||
          typeof siteSettings.blockedDateHours !== "object"
        ) {
          siteSettings.blockedDateHours = {};
        }
        let currentBlocked = siteSettings.blockedDateHours[dateVal];
        if (!Array.isArray(currentBlocked)) currentBlocked = [];

        let isFullDayActive = currentBlocked.includes("FULL_DAY");
        if (fullDayChk) fullDayChk.checked = isFullDayActive;

        container.innerHTML = "";
        let openTimeStr = cleanTimeString(
          document.getElementById("opHourOpen") &&
            document.getElementById("opHourOpen").value
            ? document.getElementById("opHourOpen").value
            : siteSettings.hourOpen,
          "10:00",
        );
        let closeTimeStr = cleanTimeString(
          document.getElementById("opHourClose") &&
            document.getElementById("opHourClose").value
            ? document.getElementById("opHourClose").value
            : siteSettings.hourClose,
          "21:00",
        );
        let [openH, openM] = openTimeStr.split(":").map(Number);
        let [closeH, closeM] = closeTimeStr.split(":").map(Number);
        let openMin = openH * 60 + openM;
        let closeMin = closeH * 60 + closeM;
        if (isNaN(openMin)) openMin = 600;
        if (isNaN(closeMin)) closeMin = 1260;

        for (let m = openMin; m < closeMin; m += 15) {
          let h = Math.floor(m / 60),
            min = m % 60;
          let hourStr =
            (h < 10 ? "0" + h : h) + ":" + (min < 10 ? "0" + min : min);
          let isHourBlocked = currentBlocked.includes(hourStr);

          let btn = document.createElement("button");
          btn.type = "button";
          btn.className = "slot-btn";
          btn.innerText = hourStr;

          if (isFullDayActive) {
            btn.disabled = true;
            btn.style.background = "#141414";
            btn.style.color = "#777777";
            btn.style.borderColor = "var(--border)";
          } else if (isHourBlocked) {
            btn.style.background = "#3b0d0d";
            btn.style.color = "#ff8787";
            btn.style.borderColor = "#ff8787";
            btn.style.textDecoration = "line-through";
          }

          btn.onclick = function () {
            if (isFullDayActive) return;
            if (
              !siteSettings.blockedDateHours[dateVal] ||
              !Array.isArray(siteSettings.blockedDateHours[dateVal])
            ) {
              siteSettings.blockedDateHours[dateVal] = [];
            }
            let arr = siteSettings.blockedDateHours[dateVal];
            let idx = arr.indexOf(hourStr);
            if (idx > -1) {
              arr.splice(idx, 1);
            } else {
              arr.push(hourStr);
            }
            arr.sort((a, b) => a.localeCompare(b));
            if (arr.length === 0) delete siteSettings.blockedDateHours[dateVal];
            renderBlockedHoursEditor();
            renderBlockedHistoryList();
          };
          container.appendChild(btn);
        }
        renderBlockedHistoryList();
      }

      function renderBlockedHistoryList() {
        let container = document.getElementById("blockedHistoryListContainer");
        if (!container) return;
        container.innerHTML = "";

        let bData = siteSettings.blockedDateHours;
        if (!bData || typeof bData !== "object") bData = {};

        let dates = Object.keys(bData).filter((d) => {
          let val = bData[d];
          return Array.isArray(val) && val.length > 0;
        });

        if (dates.length === 0) {
          container.innerHTML = `<span style="color: var(--text-muted); font-size: 0.75rem;">Belum ada jadwal yang diblokir.</span>`;
          return;
        }

        dates.sort().reverse();

        dates.forEach((dKey) => {
          let valArr = bData[dKey];
          if (!Array.isArray(valArr)) return;

          let descText = "";
          if (valArr.includes("FULL_DAY")) {
            descText = `<span style="color: #ff8787; font-weight: bold;">Blokir Satu Hari Penuh</span>`;
          } else {
            let sortedHours = [...valArr].sort((a, b) => a.localeCompare(b));
            descText = `<span style="color: #ff8787;">${sortedHours.join(", ")}</span>`;
          }

          let dTitle = formatIndonesianDateTitle(dKey);
          let div = document.createElement("div");
          div.style.cssText =
            "display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); border: 1px solid var(--border); padding: 6px 8px; border-radius: 6px; margin-bottom: 4px; font-size: 0.75rem;";
          div.innerHTML = `
                    <div>
                        <b style="color: var(--accent);">${dTitle}</b> <span style="font-size:0.7rem; color:var(--text-muted);">(${dKey})</span>: ${descText}
                    </div>
                    <button type="button" onclick="unblockAllForDate('${dKey}')" style="background: #3b0d0d; color: #ff8787; border: 1px solid #661a1a; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-size: 0.65rem; font-weight: bold;">Buka Semua</button>
                `;
          container.appendChild(div);
        });
      }

      function unblockAllForDate(dKey) {
        if (confirm(`Buka kembali semua pemblokiran pada tanggal ${dKey}?`)) {
          if (siteSettings.blockedDateHours) {
            delete siteSettings.blockedDateHours[dKey];
          }
          let targetDateInput =
            document.getElementById("blockTargetDate").value;
          if (targetDateInput === dKey) {
            let fullDayChk = document.getElementById("blockFullDayCheckbox");
            if (fullDayChk) fullDayChk.checked = false;
            renderBlockedHoursEditor();
          }
          renderBlockedHistoryList();
        }
      }

      function handleAdminHeroUpload(input) {
        if (input.files && input.files[0]) {
          let reader = new FileReader();
          reader.onload = function (e) {
            let img = new Image();
            img.src = e.target.result;
            img.onload = function () {
              let canvas = document.createElement("canvas");
              let ctx = canvas.getContext("2d");
              let maxWidth = 800;
              let scaleSize = maxWidth / img.width;
              canvas.width = maxWidth;
              canvas.height = img.height * scaleSize;
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              let base64Img = canvas.toDataURL("image/jpeg", 0.8);

              let heroInput = document.getElementById("custHeroInput");
              if (heroInput) heroInput.value = base64Img;
              let prev = document.getElementById("previewHero");
              if (prev) {
                prev.src = base64Img;
                prev.style.display = "block";
              }
            };
          };
          reader.readAsDataURL(input.files[0]);
        }
      }

      function handleAdminQrisUpload(input) {
        if (input.files && input.files[0]) {
          let reader = new FileReader();
          reader.onload = function (e) {
            let img = new Image();
            img.src = e.target.result;
            img.onload = function () {
              let canvas = document.createElement("canvas");
              let ctx = canvas.getContext("2d");
              let maxWidth = 600;
              let scaleSize = maxWidth / img.width;
              canvas.width = maxWidth;
              canvas.height = img.height * scaleSize;
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              let base64Img = canvas.toDataURL("image/jpeg", 0.85);

              let qrisInput = document.getElementById("custQrisInput");
              if (qrisInput) qrisInput.value = base64Img;
              let prev = document.getElementById("previewQris");
              if (prev) {
                prev.src = base64Img;
                prev.style.display = "block";
              }
              let modalQris = document.getElementById("qrisImageElement");
              if (modalQris) modalQris.src = base64Img;
            };
          };
          reader.readAsDataURL(input.files[0]);
        }
      }

      function resetBookingForm() {
        let form = document.getElementById("clientBookingForm");
        if (form) form.reset();
        let countSelect = document.getElementById("cCount");
        if (countSelect) countSelect.value = "1";
        renderCustomerServices();
        compressedBase64 = "";
        setFormDisabled(false);

        let submitBtn = document.getElementById("submitBtn");
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerText = "✨ Kirim Booking";
          submitBtn.style.opacity = "0.5";
          submitBtn.style.cursor = "not-allowed";
        }
        let proofStatus = document.getElementById("proofStatus");
        if (proofStatus) {
          proofStatus.style.color = "var(--accent)";
          proofStatus.innerText = "Pilih bukti transfer agar tombol aktif.";
        }
        let warningEl = document.getElementById("slotWarning");
        if (warningEl) warningEl.innerText = "";
        let dateWarning = document.getElementById("dateWarning");
        if (dateWarning) dateWarning.innerText = "";
        let dateDisplay = document.getElementById("cDateDisplay");
        if (dateDisplay) {
          dateDisplay.style.display = "none";
          dateDisplay.innerHTML = "";
        }

        document.getElementById("cHour").value = "";
        document.getElementById("slotsContainer").innerHTML =
          `<span style="color: var(--text-muted); font-size: 0.8rem; grid-column: 1 / -1;">Pilih tanggal terlebih dahulu.</span>`;
        setMinDate();
        currentBookingStep = 1;
        showBookingStep(1);
      }

      let currentBookingStep = 1;
      const STEP_TITLES = {
        1: "Data Diri",
        2: "Pilih Layanan",
        3: "Pilih Jadwal",
        4: "Pembayaran",
      };

      function validateBookingStep(step) {
        if (step === 1) {
          let name = document.getElementById("cName").value.trim();
          let phone = document.getElementById("cPhone").value.trim();
          if (!name) return "Nama lengkap wajib diisi.";
          if (!phone) return "Nomor WhatsApp wajib diisi.";
          if (!phone.startsWith("08") || phone.length < 10)
            return "Nomor WhatsApp harus diawali 08 dan minimal 10 digit.";
        }
        if (step === 2) {
          let count = parseInt(document.getElementById("cCount").value) || 0;
          if (count < 1) return "Pilih jumlah customer.";
          for (let i = 1; i <= count; i++) {
            let svcs = getSelectedServicesForCust(i);
            if (svcs.length === 0) return `Pilih minimal satu layanan untuk Customer ${i}.`;
          }
        }
        if (step === 3) {
          if (!document.getElementById("cDate").value)
            return "Pilih tanggal kunjungan.";
          if (bookingSlotsLoading)
            return "Mohon tunggu, jadwal kunjungan masih dimuat dari database.";
          if (!document.getElementById("cHour").value)
            return "Pilih jam kunjungan.";
        }
        return "";
      }

      function showBookingStep(step) {
        document
          .querySelectorAll("#clientBookingForm .step-panel")
          .forEach((p) =>
            p.classList.toggle("active", parseInt(p.dataset.panel) === step),
          );
        document.querySelectorAll(".steps .step").forEach((s) => {
          let n = parseInt(s.dataset.step);
          s.classList.toggle("active", n === step);
          s.classList.toggle("done", n < step);
          if (n === step) s.setAttribute("aria-current", "step");
          else s.removeAttribute("aria-current");
        });
        for (let i = 1; i <= 3; i++) {
          let err = document.getElementById("stepError" + i);
          if (err) err.innerText = "";
        }
        let title = document.getElementById("stepTitle");
        if (title) title.innerText = STEP_TITLES[step];
      }

      function goToStep(target) {
        if (target > currentBookingStep) {
          for (let s = currentBookingStep; s < target; s++) {
            let msg = validateBookingStep(s);
            if (msg) {
              if (s !== currentBookingStep) {
                currentBookingStep = s;
                showBookingStep(s);
              }
              let err = document.getElementById("stepError" + s);
              if (err) err.innerText = "⚠️ " + msg;
              return;
            }
          }
        }
        currentBookingStep = target;
        showBookingStep(target);
        if (target === 4) validateSubmitButton();

        // Otomatis fokus ke input pertama di step yang baru dibuka
        setTimeout(() => {
          let panel = document.querySelector(`.step-panel[data-panel="${target}"]`);
          if (panel) {
            let firstInput = panel.querySelector("input:not([type='hidden']):not([type='file']), select");
            if (firstInput) firstInput.focus();
          }
        }, 80);
      }

      function setMinDate() {
        let today = getLocalTodayStr();
        let dateInput = document.getElementById("cDate");
        if (dateInput) dateInput.min = today;
        let blockDate = document.getElementById("blockTargetDate");
        if (blockDate) blockDate.min = today;
      }

      function toggleMenu() {
        document.getElementById("navLinks").classList.toggle("active");
      }

      function togglePasswordVisibility(inputId, iconId) {
        let passInput = document.getElementById(inputId);
        let eyeIcon = document.getElementById(iconId);
        if (passInput.type === "password") {
          passInput.type = "text";
          eyeIcon.className = "fa-solid fa-eye-slash";
        } else {
          passInput.type = "password";
          eyeIcon.className = "fa-solid fa-eye";
        }
      }

      function switchPage(pageId) {
        if (pageId === "booking" && siteSettings.holidayMode) {
          alert("Mohon maaf, saat ini salon sedang libur/maintenance.");
          return;
        }

        document.getElementById("navLinks").classList.remove("active");
        let currentActive = document.querySelector(".page-section.active-page");
        let targetPage = document.getElementById("page-" + pageId);

        if (currentActive && currentActive !== targetPage) {
          currentActive.style.opacity = "0";
          setTimeout(() => {
            currentActive.classList.remove("active-page");
            targetPage.classList.add("active-page");
            targetPage.style.opacity = "1";
          }, 300);
        } else if (!currentActive) {
          targetPage.classList.add("active-page");
          targetPage.style.opacity = "1";
        }

        document
          .querySelectorAll(".nav-links a")
          .forEach((el) =>
            el.classList.toggle("active", el.dataset.page === pageId),
          );

        let headerTitle = document.getElementById("headerNavTitle");
        if (pageId === "home") {
          headerTitle.classList.remove("show-header-title");
        } else {
          headerTitle.classList.add("show-header-title");
        }

        let mainFooter = document.getElementById("mainFooter");
        if (pageId === "admin") {
          mainFooter.style.display = "none";
        } else {
          mainFooter.style.display = "block";
        }

        if (pageId === "booking") {
          resetBookingForm();
        }
        if (pageId === "catalog") {
          setTimeout(initCatalogViewPreference, 50);
          setTimeout(() => {
            renderCatalogInfoSections();
            renderKetahananSection();
            renderDurasiSection();
            renderPolicySection();
          }, 100);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      function formatPhoneNumber(input) {
        let val = input.value.replace(/\D/g, "");
        if (val.startsWith("62")) {
          val = val.substring(2);
        }
        if (!val.startsWith("08") && val.length > 0 && val.startsWith("8")) {
          val = "0" + val;
        }
        input.value = val;
      }

      function cleanPhone(phoneStr) {
        if (!phoneStr) return "-";
        let clean = phoneStr.toString().replace(/\D/g, "");
        if (clean.startsWith("62")) {
          clean = "0" + clean.substring(2);
        } else if (!clean.startsWith("08") && clean.startsWith("8")) {
          clean = "0" + clean;
        }
        return clean;
      }

      function renderCustomerServices() {
        let countElem = document.getElementById("cCount");
        if (!countElem) return;
        let count = parseInt(countElem.value);
        let container = document.getElementById("customerServicesContainer");
        container.innerHTML = "";
        let activeServices = servicesList.filter((s) => s.active !== false);

        if (activeServices.length === 0) {
          container.innerHTML = `<p style="color: #ff8787; font-size: 0.8rem;">Maaf, semua layanan sedang tidak aktif.</p>`;
          return;
        }

        // Group services by category, ordered by categoryList
        let categories = {};
        activeServices.forEach((s) => {
          let cat = s.category || "Lainnya";
          if (!categories[cat]) categories[cat] = [];
          categories[cat].push(s);
        });
        // Urutkan sesuai categoryList
        let orderedCats = getCategoryNames().filter(c => categories[c]);
        Object.keys(categories).forEach(c => { if (!orderedCats.includes(c)) orderedCats.push(c); });

        for (let i = 1; i <= count; i++) {
          let div = document.createElement("div");
          div.className = "form-group multi-service-group";
          div.dataset.custIndex = i;

          let catHtml = "";
          orderedCats.forEach((cat) => {
            let catIcon = getCategoryIcon(cat);
            let itemsHtml = categories[cat].map((s) => {
              let safeId = `chk_c${i}_${s.name.replace(/[^a-zA-Z0-9]/g, "_")}`;
              return `<label class="service-checkbox-label" title="${s.name} - ${formatRupiah(s.price)} (${s.duration} mnt)">
                <input type="checkbox" id="${safeId}" class="service-chk" data-cust="${i}" data-name="${s.name}" data-price="${s.price}" data-duration="${s.duration}" onchange="calculateTotal(); generateAvailableSlots();">
                <span class="service-chk-info">
                  <span class="service-chk-name">${s.name}</span>
                  <span class="service-chk-meta">${formatRupiah(s.price)} &bull; ${s.duration} mnt</span>
                </span>
              </label>`;
            }).join("");
            catHtml += `<details class="service-chk-category">
              <summary class="service-chk-cat-title"><span><i class="${catIcon}" style="margin-right:5px; opacity:0.8;"></i>${cat}</span><i class="fa-solid fa-chevron-down service-category-chevron" aria-hidden="true"></i></summary>
              <div class="service-chk-items">${itemsHtml}</div>
            </details>`;
          });

          div.innerHTML = `
            <label>💇‍♀️ Customer ${i}: <span class="multi-hint">(boleh pilih lebih dari satu layanan)</span></label>
            <div class="service-checklist" id="serviceChecklist${i}">
              ${catHtml}
            </div>
            <div class="selected-services-summary" id="serviceSummary${i}">
              <span style="color: var(--text-muted); font-size: 0.8rem;">Belum ada layanan dipilih.</span>
            </div>
          `;
          container.appendChild(div);
        }
        calculateTotal();
        generateAvailableSlots();
      }

      function getSelectedServicesForCust(custIndex) {
        let checkboxes = document.querySelectorAll(`.service-chk[data-cust="${custIndex}"]:checked`);
        let result = [];
        checkboxes.forEach((chk) => {
          result.push({
            name: chk.dataset.name,
            price: parseInt(chk.dataset.price) || 0,
            duration: parseInt(chk.dataset.duration) || 0,
          });
        });
        return result;
      }

      function getEffectiveCustomerSelection(custIndex) {
        const services = getSelectedServicesForCust(custIndex);
        const basePrice = services.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
        const baseDuration = services.reduce((sum, item) => sum + (Number(item.duration) || 0), 0);
        let totalPrice = 0;
        let totalDuration = 0;
        let remainingIndexes = services.map((_, index) => index);
        const matchedCombinations = [];

        const rules = (Array.isArray(siteSettings.sessionCombinations) ? siteSettings.sessionCombinations : [])
          .map((rule, index) => ({ rule, index }))
          .filter(({ rule }) => rule && rule.active !== false && Array.isArray(rule.serviceNames) && rule.serviceNames.length >= 2)
          .sort((a, b) => b.rule.serviceNames.length - a.rule.serviceNames.length || a.index - b.index);

        rules.forEach(({ rule }) => {
          const requiredNames = [...new Set(rule.serviceNames.map(name => String(name || '').trim()).filter(Boolean))];
          if (requiredNames.length < 2) return;
          const pickedIndexes = [];
          for (const requiredName of requiredNames) {
            const foundIndex = remainingIndexes.find(index => services[index].name === requiredName);
            if (foundIndex === undefined) {
              pickedIndexes.length = 0;
              break;
            }
            pickedIndexes.push(foundIndex);
          }
          if (pickedIndexes.length !== requiredNames.length) return;

          const comboPrice = Math.max(0, Number(rule.price) || 0);
          const comboDuration = Math.max(0, Number(rule.duration) || 0);
          totalPrice += comboPrice;
          totalDuration += comboDuration;
          matchedCombinations.push({
            id: rule.id || '',
            name: String(rule.name || 'Sesi Gabungan'),
            serviceNames: requiredNames,
            price: comboPrice,
            duration: comboDuration
          });
          const used = new Set(pickedIndexes);
          remainingIndexes = remainingIndexes.filter(index => !used.has(index));
        });

        remainingIndexes.forEach(index => {
          totalPrice += Number(services[index].price) || 0;
          totalDuration += Number(services[index].duration) || 0;
        });

        return { services, basePrice, baseDuration, totalPrice, totalDuration, matchedCombinations };
      }

      function updateServiceSummary(custIndex) {
        const effective = getEffectiveCustomerSelection(custIndex);
        const summaryEl = document.getElementById(`serviceSummary${custIndex}`);
        if (!summaryEl) return;
        if (effective.services.length === 0) {
          summaryEl.innerHTML = `<span style="color:var(--text-muted);font-size:0.8rem">Belum ada layanan dipilih.</span>`;
          return;
        }
        const tags = effective.services.map(service => `<span class="svc-tag">${service.name}</span>`).join('');
        const comboInfo = effective.matchedCombinations.map(combo =>
          `<div class="combo-customer-note"><i class="fa-solid fa-wand-magic-sparkles"></i> Sesi Gabungan aktif: <b>${combo.name}</b> — ${formatRupiah(combo.price)} / ${combo.duration} mnt</div>`
        ).join('');
        summaryEl.innerHTML = `
          <div class="svc-tags-row">${tags}</div>
          ${comboInfo}
          <div class="svc-subtotal">Total Customer ${custIndex}: ${formatRupiah(effective.totalPrice)} &bull; ${effective.totalDuration} mnt</div>`;
      }

      function getEffectiveBookingTotals() {
        const count = parseInt(document.getElementById("cCount")?.value, 10) || 1;
        let totalPrice = 0;
        let totalDuration = 0;
        const customers = [];
        for (let i = 1; i <= count; i++) {
          const effective = getEffectiveCustomerSelection(i);
          totalPrice += effective.totalPrice;
          totalDuration += effective.totalDuration;
          customers.push({ customerIndex: i, ...effective });
        }
        return { totalPrice, totalDuration, customers };
      }

      function calculateTotal() {
        const countElem = document.getElementById("cCount");
        if (!countElem) return 0;
        const totals = getEffectiveBookingTotals();
        totals.customers.forEach(customer => updateServiceSummary(customer.customerIndex));
        const displayDuration = totals.totalDuration || 60;
        const totalEl = document.getElementById("displayTotal");
        const durationEl = document.getElementById("displayDuration");
        const modalTotalEl = document.getElementById("modalTotal");
        if (totalEl) totalEl.innerText = formatRupiah(totals.totalPrice);
        if (durationEl) durationEl.innerText = `${displayDuration} Menit`;
        if (modalTotalEl) modalTotalEl.innerText = "Total: " + formatRupiah(totals.totalPrice);

        // Rincian pembayaran selalu mengikuti jumlah customer dan pilihan layanan di langkah sebelumnya.
        const paymentCustomerSummary = document.getElementById("paymentCustomerSummary");
        if (paymentCustomerSummary) {
          paymentCustomerSummary.innerHTML = totals.customers.map(customer => {
            const comboServiceNames = new Set(customer.matchedCombinations.flatMap(combo => combo.serviceNames || []));
            const individualServices = customer.services.filter(service => !comboServiceNames.has(service.name));
            const detailParts = [];
            customer.matchedCombinations.forEach(combo => {
              detailParts.push(`<div class="payment-customer-combo"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i> <b>${escapeComboHtml(combo.name)}</b><span>${combo.duration} menit · ${formatRupiah(combo.price)}</span></div>`);
            });
            if (individualServices.length) {
              detailParts.push(`<div class="payment-customer-services">Layanan: ${individualServices.map(service => escapeComboHtml(service.name)).join(', ')}</div>`);
            }
            if (!detailParts.length) {
              detailParts.push(`<div class="payment-customer-services">${customer.services.map(service => escapeComboHtml(service.name)).join(', ')}</div>`);
            }
            return `<div class="payment-customer-row"><div class="payment-customer-heading"><b>Customer ${customer.customerIndex}</b><span>${formatRupiah(customer.totalPrice)} · ${customer.totalDuration} menit</span></div>${detailParts.join('')}</div>`;
          }).join('');
        }
        return displayDuration;
      }

      function formatRupiah(angka) {
        return "Rp " + angka.toLocaleString("id-ID");
      }
      function openQrisModal() {
        document.getElementById("qrisModal").style.display = "flex";
      }
      function closeQrisModal() {
        document.getElementById("qrisModal").style.display = "none";
      }
      function getProofDisplayUrl(rawUrl) {
        const value = String(rawUrl || "").trim();
        if (!value) return "";
        if (/^https?:\/\/(drive\.google\.com|docs\.google\.com)\//i.test(value)) {
          const idMatch = value.match(/[?&]id=([^&]+)/i) || value.match(/\/d\/([^/?]+)/i);
          if (idMatch && idMatch[1]) {
            return "https://drive.google.com/thumbnail?id=" + encodeURIComponent(decodeURIComponent(idMatch[1])) + "&sz=w1600";
          }
        }
        return value;
      }
      function openImageModal(imgSrc) {
        document.getElementById("previewImageElement").src = getProofDisplayUrl(imgSrc);
        document.getElementById("imgPreviewModal").style.display = "flex";
      }
      function closeImageModal() {
        document.getElementById("imgPreviewModal").style.display = "none";
        document.getElementById("previewImageElement").src = "";
      }

      function compressAndHandleImage(input) {
        let submitBtn = document.getElementById("submitBtn");
        let proofStatus = document.getElementById("proofStatus");

        if (input.files && input.files[0]) {
          let reader = new FileReader();
          reader.onload = function (e) {
            let img = new Image();
            img.src = e.target.result;
            img.onload = function () {
              let canvas = document.createElement("canvas");
              let ctx = canvas.getContext("2d");
              let maxWidth = 400;
              let scaleSize = maxWidth / img.width;
              canvas.width = maxWidth;
              canvas.height = img.height * scaleSize;
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              compressedBase64 = canvas.toDataURL("image/jpeg", 0.6);
              proofStatus.style.color = "#51cf66";
              proofStatus.innerText = "✓ Bukti dimuat!";
              validateSubmitButton();
            };
          };
          reader.readAsDataURL(input.files[0]);
        } else {
          compressedBase64 = "";
          proofStatus.style.color = "var(--accent)";
          proofStatus.innerText = "Pilih bukti transfer agar tombol aktif.";
          submitBtn.disabled = true;
          submitBtn.style.opacity = "0.5";
          submitBtn.style.cursor = "not-allowed";
        }
      }

      // Kunci pemilihan jam selama data booking dari database sedang dimuat.
      let bookingSlotsLoading = false;
      let bookingSlotsRequestId = 0;

      async function generateAvailableSlots() {
        let requestId = ++bookingSlotsRequestId;
        let dateVal = document.getElementById("cDate").value;
        let container = document.getElementById("slotsContainer");
        let warningEl = document.getElementById("slotWarning");
        let dateWarning = document.getElementById("dateWarning");

        // Kosongkan pilihan sebelumnya dan kunci slot sebelum mulai mengambil data.
        bookingSlotsLoading = true;
        document.getElementById("cHour").value = "";
        validateSubmitButton();
        container.innerHTML = `<span style="color: var(--accent); font-size: 0.8rem; grid-column: 1 / -1;">⏳ Memuat jadwal dari database. Mohon tunggu...</span>`;
        warningEl.innerText = "";

        if (!dateVal) {
          bookingSlotsLoading = false;
          container.innerHTML = `<span style="color: var(--text-muted); font-size: 0.8rem; grid-column: 1 / -1;">Pilih tanggal terlebih dahulu.</span>`;
          return;
        }

        let selectedDateObj = new Date(dateVal + "T00:00:00");
        let dayOfWeek = !isNaN(selectedDateObj.getTime())
          ? selectedDateObj.getDay()
          : new Date().getDay();
        if (
          siteSettings.openDays &&
          siteSettings.openDays[dayOfWeek] === false
        ) {
          dateWarning.innerText =
            "❌ Salon libur di hari ini. Silakan pilih tanggal lain.";
          container.innerHTML = `<span style="color: #ff8787; font-size: 0.8rem; grid-column: 1 / -1;">Salon tutup pada hari ini.</span>`;
          bookingSlotsLoading = false;
          return;
        } else {
          dateWarning.innerText = "";
        }

        let disabledArrForDate = [];
        if (
          siteSettings.blockedDateHours &&
          Array.isArray(siteSettings.blockedDateHours[dateVal])
        ) {
          disabledArrForDate = siteSettings.blockedDateHours[dateVal];
        }

        if (disabledArrForDate.includes("FULL_DAY")) {
          dateWarning.innerText = "❌ Tanggal ini penuh / ditutup oleh admin.";
          container.innerHTML = `<span style="color: #ff8787; font-size: 0.8rem; grid-column: 1 / -1;">Tanggal ini ditutup.</span>`;
          bookingSlotsLoading = false;
          return;
        }

        let totalDurationMinutes = calculateTotal() || 60;

        let renderSlots = (bookings = []) => {
          let openTimeStr = cleanTimeString(
            document.getElementById("opHourOpen") &&
              document.getElementById("opHourOpen").value
              ? document.getElementById("opHourOpen").value
              : siteSettings.hourOpen,
            "10:00",
          );
          let closeTimeStr = cleanTimeString(
            document.getElementById("opHourClose") &&
              document.getElementById("opHourClose").value
              ? document.getElementById("opHourClose").value
              : siteSettings.hourClose,
            "21:00",
          );

          let [openH, openM] = openTimeStr.split(":").map(Number);
          let [closeH, closeM] = closeTimeStr.split(":").map(Number);
          let openMin = openH * 60 + openM;
          let closeMin = closeH * 60 + closeM;

          if (isNaN(openMin)) openMin = 600; // 10:00
          if (isNaN(closeMin)) closeMin = 1260; // 21:00

          let bookedIntervals = [];
          bookings.forEach((b) => {
            let status = b.status || "";
            if (status === "Diterima" || status === "Pending") {
              let timeVal = b.waktu || b.datetime;
              if (timeVal) {
                let bDateKey = getStandardDateKey(timeVal);
                if (bDateKey === dateVal) {
                  let dObj = parseSafeDateTime(timeVal);
                  if (dObj) {
                    let start = dObj.getTime();
                    let dur = calculateStoredDuration(b.layanan || b.service);
                    bookedIntervals.push({
                      start: start,
                      end: start + dur * 60000,
                    });
                  }
                }
              }
            }
          });

          container.innerHTML = "";
          let availableCount = 0;

          for (let m = openMin; m < closeMin; m += 15) {
            let h = Math.floor(m / 60),
              min = m % 60;
            let hourStr =
              (h < 10 ? "0" + h : h) + ":" + (min < 10 ? "0" + min : min);

            let isManuallyDisabled = disabledArrForDate.includes(hourStr);

            let slotStart = new Date(dateVal + "T" + hourStr + ":00").getTime();
            let slotEnd = slotStart + totalDurationMinutes * 60000;
            let closingLimit = new Date(
              dateVal + "T" + closeTimeStr + ":00",
            ).getTime();

            let isConflict = bookedIntervals.some(
              (i) => slotStart < i.end && slotEnd > i.start,
            );
            let btn = document.createElement("button");
            btn.type = "button";
            btn.className = "slot-btn";
            btn.innerText = hourStr;

            let isPastSlot = slotStart < Date.now();
            if (
              isManuallyDisabled ||
              isConflict ||
              isPastSlot ||
              (closingLimit && slotEnd > closingLimit)
            ) {
              btn.disabled = true;
            } else {
              availableCount++;
              if (document.getElementById("cHour").value === hourStr)
                btn.classList.add("selected");
              btn.onclick = function () {
                if (bookingSlotsLoading || requestId !== bookingSlotsRequestId) return;
                document
                  .querySelectorAll(".slot-btn")
                  .forEach((b) => b.classList.remove("selected"));
                btn.classList.add("selected");
                document.getElementById("cHour").value = hourStr;
                validateSubmitButton();
              };
            }
            container.appendChild(btn);
          }
          if (availableCount === 0)
            warningEl.innerText = "⚠️ Semua slot penuh atau ditutup.";
        };

        try {
          let response = await supabaseFetch(SCRIPT_URL);
          let resData = await response.json();

          // Abaikan hasil request lama jika pelanggan sudah memilih tanggal lain.
          if (requestId !== bookingSlotsRequestId) return;
          if (resData.settings) {
            siteSettings = { ...siteSettings, ...resData.settings };
            siteSettings.hourOpen = cleanTimeString(
              siteSettings.hourOpen,
              "10:00",
            );
            siteSettings.hourClose = cleanTimeString(
              siteSettings.hourClose,
              "21:00",
            );
            if (!siteSettings.blockedDateHours)
              siteSettings.blockedDateHours = {};
            let _slotOpen = document.getElementById("opHourOpen");
            if (_slotOpen) _slotOpen.value = siteSettings.hourOpen;
            let _slotClose = document.getElementById("opHourClose");
            if (_slotClose) _slotClose.value = siteSettings.hourClose;
          }
          let bookings = resData.bookings || [];

          let refreshedDisabledArr = [];
          if (
            siteSettings.blockedDateHours &&
            Array.isArray(siteSettings.blockedDateHours[dateVal])
          ) {
            refreshedDisabledArr = siteSettings.blockedDateHours[dateVal];
          }

          disabledArrForDate = refreshedDisabledArr;
          if (refreshedDisabledArr.includes("FULL_DAY")) {
            dateWarning.innerText = "❌ Tanggal ini penuh / ditutup oleh admin.";
            container.innerHTML = `<span style="color: #ff8787; font-size: 0.8rem; grid-column: 1 / -1;">Tanggal ini ditutup.</span>`;
            bookingSlotsLoading = false;
            return;
          }

          // Slot baru dibuat setelah data booking dan pengaturan berhasil diterima.
          bookingSlotsLoading = false;
          renderSlots(bookings);
        } catch (e) {
          if (requestId !== bookingSlotsRequestId) return;
          console.error("Gagal memuat data jadwal booking:", e);
          bookingSlotsLoading = false;
          document.getElementById("cHour").value = "";
          container.innerHTML = `<span style="color: #ff8787; font-size: 0.8rem; grid-column: 1 / -1;">⚠️ Gagal memuat jadwal dari database. Jam dikunci demi keamanan data. Silakan pilih ulang tanggal untuk mencoba lagi.</span>`;
          warningEl.innerText = "Jam kunjungan belum dapat dipilih karena data belum berhasil dimuat.";
          validateSubmitButton();
        }
      }

      function validateSubmitButton() {
        let hourVal = document.getElementById("cHour").value;
        let submitBtn = document.getElementById("submitBtn");
        if (hourVal && compressedBase64 !== "") {
          submitBtn.disabled = false;
          submitBtn.style.opacity = "1";
          submitBtn.style.cursor = "pointer";
        } else {
          submitBtn.disabled = true;
          submitBtn.style.opacity = "0.5";
          submitBtn.style.cursor = "not-allowed";
        }
      }

      function calculateStoredDuration(serviceText) {
        if (!serviceText) return 60;
        const parts = serviceText.split(" | ");
        let totalMin = 0;
        parts.forEach((part) => {
          const effectiveMatch = part.match(/\[DURASI EFEKTIF:\s*(\d+)\s*mnt\]/i);
          if (effectiveMatch) {
            totalMin += parseInt(effectiveMatch[1], 10) || 0;
            return;
          }
          const matches = [...part.matchAll(/\((\d+)\s*mnt(?:\s*[-)])/gi)];
          if (matches.length) totalMin += matches.reduce((sum, match) => sum + (parseInt(match[1], 10) || 0), 0);
          else totalMin += 60;
        });
        return totalMin > 0 ? totalMin : 60;
      }

      function formatDateTimeRange(dateTimeStr, serviceText) {
        if (!dateTimeStr) return "-";
        try {
          let dStart = parseSafeDateTime(dateTimeStr);
          if (!dStart) return dateTimeStr;
          let totalMin = calculateStoredDuration(serviceText);
          let dEnd = new Date(dStart.getTime() + totalMin * 60000);

          let dayNum = String(dStart.getDate()).padStart(2, "0");
          let monthNum = String(dStart.getMonth() + 1).padStart(2, "0");
          let year = dStart.getFullYear();
          let dateFormatted = `${dayNum}/${monthNum}/${year}`;

          let pad2 = (n) => String(n).padStart(2, "0");
          let startH =
            pad2(dStart.getHours()) + ":" + pad2(dStart.getMinutes());
          let endH = pad2(dEnd.getHours()) + ":" + pad2(dEnd.getMinutes());

          // Format tanggal dan rentang jam lokal Indonesia Barat (24 jam).
          return `${dateFormatted} (${startH} - ${endH})`;
        } catch (e) {
          return dateTimeStr;
        }
      }

      function setFormDisabled(isDisabled) {
        let fields = ["cName", "cPhone", "cCount", "cDate", "cPaymentProof"];
        fields.forEach((id) => {
          let el = document.getElementById(id);
          if (el) el.disabled = isDisabled;
        });
        let countInput = document.getElementById("cCount");
        if (countInput) {
          let count = parseInt(countInput.value) || 1;
          for (let i = 1; i <= count; i++) {
            let checkboxes = document.querySelectorAll(`.service-chk[data-cust="${i}"]`);
            checkboxes.forEach((chk) => chk.disabled = isDisabled);
          }
        }
        document
          .querySelectorAll(".slot-btn")
          .forEach((btn) => (btn.disabled = isDisabled));
      }

      async function r9yMnTm4NSzvG9rrwjM2ec8xZgh1cafXH8() {
        // Ambil ulang harga layanan dan aturan sesi gabungan tanpa menghapus data pelanggan.
        const count = parseInt(document.getElementById("cCount")?.value, 10) || 1;
        const previousSelections = {};
        for (let i = 1; i <= count; i++) {
          previousSelections[i] = getSelectedServicesForCust(i).map(service => service.name);
        }
        const response = await supabaseFetch(SCRIPT_URL);
        const data = await response.json();
        if (Array.isArray(data.services) && data.services.length) servicesList = data.services;
        if (data.settings && Array.isArray(data.settings.sessionCombinations)) {
          siteSettings.sessionCombinations = data.settings.sessionCombinations;
        }
        renderCustomerServices();
        document.querySelectorAll(".service-chk").forEach(chk => {
          const customerIndex = Number(chk.dataset.cust);
          chk.checked = (previousSelections[customerIndex] || []).includes(chk.dataset.name);
        });
        calculateTotal();
        await generateAvailableSlots();
      }

      async function submitBooking(e) {
        e.preventDefault();
        if (bookingSlotsLoading) {
          showToast("Mohon tunggu, jadwal masih dimuat dari database.", "warning");
          return;
        }
        let phoneInput = document.getElementById("cPhone").value.trim();
        let hourVal = document.getElementById("cHour").value;
        if (!phoneInput.startsWith("08")) {
          alert("Nomor WhatsApp harus diawali 08.");
          return;
        }
        if (!hourVal) {
          alert("Pilih jam kunjungan.");
          return;
        }

        let count = parseInt(document.getElementById("cCount").value);
        let allServices = [];
        let customerSelections = [];
        for (let i = 1; i <= count; i++) {
          const effective = getEffectiveCustomerSelection(i);
          const serviceDetails = effective.services.map(service => `${service.name} (${service.duration} mnt - ${formatRupiah(service.price)})`).join(", ");
          const comboNotes = effective.matchedCombinations.map(combo => ` [Sesi Gabungan: ${combo.name} - ${combo.duration} mnt - ${formatRupiah(combo.price)}]`).join("");
          const durationMarker = effective.services.length ? ` [DURASI EFEKTIF: ${effective.totalDuration} mnt]` : "";
          allServices.push(`C${i}: ${serviceDetails}${comboNotes}${durationMarker}`);
          customerSelections.push({ serviceNames: effective.services.map(service => service.name) });
        }
        const emptyCustomer = customerSelections.findIndex(customer => !customer.serviceNames.length);
        if (emptyCustomer !== -1) {
          showToast(`Customer ${emptyCustomer + 1}: pilih minimal satu layanan.`, "warning");
          return;
        }

        let btn = document.getElementById("submitBtn");
        setFormDisabled(true);
        btn.disabled = true;
        btn.innerText = "⏳ Mengirim...";

        let dateVal = document.getElementById("cDate").value;
        let dtValue =
          dateVal && hourVal ? dateVal + " " + hourVal + ":00+07:00" : "";

        const bookingTotals = getEffectiveBookingTotals();
        let newBooking = {
          action: "addBooking",
          id: Date.now().toString(),
          name: document.getElementById("cName").value,
          phone: phoneInput,
          service: allServices.join(" | "),
          datetime: dtValue,
          status: "Pending",
          totalPrice: bookingTotals.totalPrice,
          durationMinutes: bookingTotals.totalDuration,
          customerSelections,
          paymentProof: compressedBase64,
        };

        try {
          const bookingResponse = await supabaseFetch(SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newBooking),
          });
          const bookingResult = await bookingResponse.json();
          if (!bookingResponse.ok || bookingResult.status !== "success") {
            const bookingError = new Error(bookingResult.message || "Booking tidak berhasil diproses.");
            bookingError.status = bookingResponse.status;
            throw bookingError;
          }
          showToast("Berhasil! Permintaan booking terkirim.");
          resetBookingForm();
          switchPage("home");
        } catch (error) {
          if (error.status === 409) {
            // Muat ulang harga/aturan terbaru tanpa menghapus pilihan layanan pelanggan.
            try { await r9yMnTm4NSzvG9rrwjM2ec8xZgh1cafXH8(); } catch (refreshError) { console.warn("Gagal memuat harga terbaru", refreshError); }
          }
          showToast(error.message || "Gagal mengirim booking. Periksa kembali total pembayaran.", "warning");
          setFormDisabled(false);
          btn.disabled = false;
          btn.innerText = "✨ Kirim Booking";
        }
      }

      async function checkBookingStatus() {
        let searchPhone = document
          .getElementById("checkPhoneInput")
          .value.trim();
        let container = document.getElementById("checkResultContainer");
        container.innerHTML = `<p style="text-align:center; color:var(--text-muted); margin-top:10px; font-size:0.85rem;">Mencari...</p>`;

        if (!searchPhone) {
          alert("Masukkan nomor WhatsApp.");
          container.innerHTML = "";
          return;
        }

        try {
          let response = await supabaseFetch(SCRIPT_URL, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "lookupBooking", phone: searchPhone })
          });
          let resData = await response.json();
          let bookings = resData.bookings || [];
          container.innerHTML = "";
          let found = bookings.filter(
            (b) =>
              cleanPhone(b.whatsapp || b.phone) === cleanPhone(searchPhone),
          );

          if (found.length === 0) {
            container.innerHTML = `<div class="status-result-card" style="text-align: center; color: var(--text-muted); font-size: 0.85rem;">Tidak ditemukan data.</div>`;
            return;
          }

          found.sort((a, b) => {
            let timeA = parseSafeDateTime(a.waktu || a.datetime);
            let timeB = parseSafeDateTime(b.waktu || b.datetime);
            return (
              (timeA ? timeA.getTime() : 0) - (timeB ? timeB.getTime() : 0)
            );
          });

          let html = `<h4 style="margin-top: 10px; margin-bottom: 8px; color: var(--accent); font-size: 0.95rem;">Hasil Pencarian:</h4>`;
          found.forEach((item) => {
            let st = item.status || "Pending";
            let badge =
              st === "Selesai"
                ? `<span class="badge-done">Selesai ✨</span>`
                : st === "Diterima"
                  ? `<span class="badge-approved">Diterima</span>`
                  : st === "Ditolak"
                    ? `<span class="badge-rejected">Ditolak</span>`
                    : `<span class="badge-pending">Pending</span>`;
            let reason =
              st === "Ditolak" && item.alasan
                ? `<div style="color: #ff8787; font-size:0.75rem; margin-top:3px;">Ket: ${item.alasan}</div>`
                : "";
            let proofImgUrl = item.paymentProof || item.payment_proof || item.buktibayar || "";
            let proofDisplayUrl = getProofDisplayUrl(proofImgUrl);
            let proof = proofImgUrl
              ? `<img src="${proofDisplayUrl}" class="proof-thumb" alt="Bukti transfer" loading="lazy" onclick="openImageModal('${proofImgUrl}')" onerror="this.style.display='none'" style="display:block; width:54px; height:54px; object-fit:cover; object-position:center; border-radius:8px; border:1px solid rgba(255,255,255,0.18); cursor:zoom-in;">`
              : `<span style="font-size:0.7rem; color:var(--text-muted);">Belum ada</span>`;

            let rawTotal = item.total || item.totalPrice || "0";
            let numericTotal = rawTotal.toString().replace(/\D/g, "");
            let itemTotal = numericTotal
              ? formatRupiah(parseInt(numericTotal))
              : "Rp 0";

            let itemName = item.nama || item.name || "-";
            let rawService = item.layanan || item.service || "";
            let dateTimeFormatted = formatDateTimeRange(
              item.waktu || item.datetime,
              rawService,
            );

            html += `
                        <div class="card" style="padding: 9px 11px; margin-bottom: 8px; background: rgba(0,0,0,0.35);">
                            <!-- Baris identitas: nama pemesan sejajar dengan total harga. -->
                            <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; padding-bottom:6px; margin-bottom:7px; border-bottom:1px solid rgba(255,255,255,0.12);">
                                <div style="min-width:0; flex:1; font-size:0.84rem; font-weight:700; color:var(--text-main); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                                    👤 ${itemName}
                                </div>
                                <div style="flex-shrink:0; text-align:right; font-size:0.82rem; font-weight:700; color:var(--accent);">
                                    ${itemTotal}
                                </div>
                            </div>

                            <!-- Detail di kiri; status dan thumbnail kecil di kanan. -->
                            <div style="display:grid; grid-template-columns:minmax(0,1fr) 62px; column-gap:8px; align-items:start;">
                                <div style="min-width:0;">
                                    <div style="font-size:0.76rem; color:var(--accent); font-weight:700; margin-bottom:3px;">
                                        📅 ${dateTimeFormatted}
                                    </div>
                                    <div style="font-size:0.74rem; color:var(--text-muted); line-height:1.35;">
                                        ${formatServiceDisplay(rawService)}
                                    </div>
                                    ${reason}
                                </div>
                                <div style="width:62px; display:flex; flex-direction:column; align-items:center; gap:6px; text-align:center;">
                                    <div>${badge}</div>
                                    ${proof}
                                </div>
                            </div>
                        </div>`;
          });
          container.innerHTML = html;
        } catch (e) {
          container.innerHTML = `<div class="status-result-card" style="text-align: center; color: #ff8787; font-size: 0.85rem;">Gagal memuat.</div>`;
        }
      }

      function formatServiceDisplay(serviceText) {
        if (!serviceText) return "-";
        return serviceText
          .split(" | ")
          .map((p, idx) => {
            let clean = p.replace(/^C\d+:\s*/, "");
            // Di tampilan riwayat pelanggan, tampilkan harga tetapi sembunyikan durasi.
            clean = clean.replace(/\((\d+)\s*mnt\s*-\s*(Rp\s*[\d.]+)\)/gi, "($2)");
            clean = clean.replace(/\s*\(\d+\s*mnt\)/gi, "");
            clean = clean.replace(/\s*\[DURASI EFEKTIF:\s*\d+\s*mnt\]/i, "");
            clean = clean.replace(/\s*\[Sesi Gabungan:\s*([^\]]+)\]/i, " <b>[Sesi Gabungan: $1]</b>");
            return `<div style="font-size: 0.72rem;"><b>C${idx + 1}:</b> ${clean}</div>`;
          })
          .join("");
      }

      async function loginAdmin() {
        const email = (document.getElementById("adminEmail")?.value || "").trim();
        const password = document.getElementById("adminPass").value;
        if (!email || !password) {
          showToast("Masukkan email admin dan kata sandi.", "warning");
          return;
        }
        const loginBtn = document.querySelector("#adminLoginBox button");
        loginBtn.disabled = true;
        loginBtn.innerText = "⏳ Memeriksa akun...";
        try {
          const response = await nativeFetch(
            SUPABASE_API_URL.split("/functions/v1/")[0] + "/auth/v1/token?grant_type=password",
            { method: "POST", headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY },
              body: JSON.stringify({ email, password }) }
          );
          const result = await response.json();
          if (!response.ok || !result.access_token) throw new Error(result.msg || result.message || "Email atau password salah.");
          sessionStorage.setItem("beautybar_access_token", result.access_token);
          document.getElementById("adminLoginBox").style.display = "none";
          document.getElementById("adminPanel").style.display = "block";
          document.getElementById("mainFooter").style.display = "none";
          document.getElementById("adminPass").value = "";
          loadAdminTable();
        } catch (e) {
          showToast(e.message || "Login Supabase gagal.", "warning");
        } finally {
          loginBtn.disabled = false;
          loginBtn.innerText = "🔓 Masuk";
        }
      }

      async function changeAdminPassword() {
        const oldInput = document.getElementById("oldPass").value;
        const newInput = document.getElementById("newPass").value;
        const confirmInput = document.getElementById("confirmPass").value;
        if (!oldInput || !newInput || !confirmInput) {
          return showToast("Lengkapi semua kolom sandi.", "warning");
        }
        if (newInput !== confirmInput) {
          return showToast("Konfirmasi sandi tidak cocok.", "warning");
        }
        if (newInput.length < 6) {
          return showToast("Sandi baru minimal 6 karakter.", "warning");
        }
        if (oldInput === newInput) {
          return showToast("Kata sandi baru harus berbeda dari kata sandi lama.", "warning");
        }

        const currentToken = sessionStorage.getItem("beautybar_access_token");
        if (!currentToken) {
          return showToast("Sesi admin tidak ditemukan. Silakan login kembali.", "warning");
        }

        const btn = document.getElementById("changePassBtn");
        const authBaseUrl = SUPABASE_API_URL.split("/functions/v1/")[0];
        const authHeaders = {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY
        };

        try {
          btn.disabled = true;
          btn.innerText = "⏳ Memverifikasi kata sandi lama...";

          // Ambil identitas akun dari sesi yang sedang aktif.
          const userResponse = await nativeFetch(authBaseUrl + "/auth/v1/user", {
            method: "GET",
            headers: {
              apikey: SUPABASE_ANON_KEY,
              Authorization: "Bearer " + currentToken
            }
          });
          let currentUser = {};
          try { currentUser = await userResponse.json(); } catch (_) {}
          if (!userResponse.ok || !currentUser.id || !currentUser.email) {
            throw new Error("Sesi admin sudah kedaluwarsa. Silakan login kembali.");
          }

          // Verifikasi kata sandi lama dengan login ulang ke Supabase Auth.
          const verifyResponse = await nativeFetch(
            authBaseUrl + "/auth/v1/token?grant_type=password",
            {
              method: "POST",
              headers: authHeaders,
              body: JSON.stringify({ email: currentUser.email, password: oldInput })
            }
          );
          let verifiedSession = {};
          try { verifiedSession = await verifyResponse.json(); } catch (_) {}
          if (
            !verifyResponse.ok ||
            !verifiedSession.access_token ||
            !verifiedSession.user ||
            verifiedSession.user.id !== currentUser.id
          ) {
            const authError = String(
              verifiedSession.msg || verifiedSession.message || verifiedSession.error_description || ""
            ).toLowerCase();
            if (
              verifyResponse.status === 400 ||
              verifyResponse.status === 401 ||
              authError.includes("invalid login") ||
              authError.includes("invalid credentials")
            ) {
              throw new Error("Kata sandi lama tidak benar. Periksa kembali kata sandi lama Anda.");
            }
            throw new Error(verifiedSession.msg || verifiedSession.message || "Gagal memverifikasi kata sandi lama.");
          }

          btn.innerText = "⏳ Menyimpan kata sandi baru...";

          // Perbarui kata sandi hanya dengan token dari sesi yang berhasil diverifikasi.
          const updateResponse = await nativeFetch(authBaseUrl + "/auth/v1/user", {
            method: "PUT",
            headers: {
              ...authHeaders,
              Authorization: "Bearer " + verifiedSession.access_token
            },
            body: JSON.stringify({ password: newInput })
          });
          let updateResult = {};
          try { updateResult = await updateResponse.json(); } catch (_) {}
          if (!updateResponse.ok) {
            throw new Error(updateResult.message || updateResult.msg || "Gagal mengubah kata sandi di Supabase Auth.");
          }

          // Gunakan token dari autentikasi ulang agar sesi admin tetap aktif.
          sessionStorage.setItem("beautybar_access_token", verifiedSession.access_token);
          document.getElementById("oldPass").value = "";
          document.getElementById("newPass").value = "";
          document.getElementById("confirmPass").value = "";
          showToast("Kata sandi admin berhasil diperbarui. Verifikasi kata sandi lama berhasil.", "success");
        } catch (e) {
          showToast(e.message || "Gagal mengubah kata sandi.", "warning");
        } finally {
          btn.disabled = false;
          btn.innerText = "🔒 Ubah Kata Sandi";
        }
      }

      function logoutAdmin() {
        sessionStorage.removeItem("beautybar_access_token");
        document.getElementById("adminLoginBox").style.display = "block";
        document.getElementById("adminPanel").style.display = "none";
        document.getElementById("adminPass").value = "";
        document.getElementById("mainFooter").style.display = "block";
      }

      function switchAdminTab(tabName, btn) {
        document
          .querySelectorAll(".admin-tab-content")
          .forEach((el) => el.classList.remove("active-content"));
        document
          .querySelectorAll(".admin-tabs .tab-btn")
          .forEach((el) => el.classList.remove("active-tab"));
        document
          .getElementById("admin-tab-" + tabName)
          .classList.add("active-content");
        btn.classList.add("active-tab");
        if (tabName === "services") { renderServicesEditor(); renderCategoryEditor(); r9yMnTm4NSzvG9rrwjM2ec8xZgh1cafXH8(); }
        if (tabName === "customize") {
          renderOperationalDaysConfig();
          renderBlockedHistoryList();
          if (document.getElementById("blockTargetDate").value) {
            renderBlockedHoursEditor();
          }
        }
        if (tabName === "history") {
          let today = getLocalTodayStr();
          let dateInput = document.getElementById("historyDateInput");
          if (dateInput && !dateInput.value) dateInput.value = today;
          renderHistoryReport();
        }
        if (tabName === "info-katalog") {
          switchInfoSubTab("penjelasan");
        }
      }

      function formatInputRibuan(input) {
        let value = input.value.replace(/\D/g, "");
        if (value === "") {
          input.value = "";
          return;
        }
        input.value = parseInt(value, 10).toLocaleString("id-ID");
      }

      let isMovingService = false;

      function escapeComboHtml(value) {
        return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
      }

      // Menyimpan aturan yang sedang dibuka agar tetap terbuka saat pilihan layanan berubah.
      const expandedSessionCombinationRules = new Set();

      function toggleSessionCombinationRule(index) {
        if (expandedSessionCombinationRules.has(index)) expandedSessionCombinationRules.delete(index);
        else expandedSessionCombinationRules.add(index);
        r9yMnTm4NSzvG9rrwjM2ec8xZgh1cafXH8();
      }

      function r9yMnTm4NSzvG9rrwjM2ec8xZgh1cafXH8() {
        const container = document.getElementById('sessionCombinationEditorContainer');
        if (!container) return;
        if (!Array.isArray(siteSettings.sessionCombinations)) siteSettings.sessionCombinations = [];
        const rules = siteSettings.sessionCombinations;
        if (!rules.length) {
          container.innerHTML = '<div style="padding:12px;text-align:center;color:var(--text-muted);font-size:.8rem;border:1px dashed var(--border);border-radius:10px">Belum ada aturan sesi gabungan. Tambahkan aturan saat data kombinasi sudah siap.</div>';
          return;
        }
        container.innerHTML = `<div style="font-size:.75rem;color:var(--text-muted);margin-bottom:10px">Total ${rules.length} aturan. Satu layanan boleh digunakan pada banyak aturan gabungan yang berbeda.</div>` + rules.map((rule, index) => {
          const selected = Array.isArray(rule.serviceNames) ? rule.serviceNames : [];
          const isExpanded = expandedSessionCombinationRules.has(index);
          const knownNames = new Set(servicesList.map(service => String(service.name || '')));
          const choices = servicesList.map(service => {
            const name = String(service.name || '');
            const checked = selected.includes(name) ? 'checked' : '';
            const inactiveLabel = service.active === false ? ' (nonaktif — aktifkan layanan untuk memakai aturan ini)' : '';
            return `<label class="session-combo-service-choice"><input type="checkbox" class="combo-service-choice" data-rule-index="${index}" data-service-name="${escapeComboHtml(name)}" ${checked} onchange="updateSessionCombinationServices(${index})"><span>${escapeComboHtml(name)}${inactiveLabel}</span></label>`;
          }).join('') + selected.filter(name => !knownNames.has(name)).map(name =>
            `<label class="session-combo-service-choice" style="border-color:#d66;color:#d66"><input type="checkbox" class="combo-service-choice" data-rule-index="${index}" data-service-name="${escapeComboHtml(name)}" checked onchange="updateSessionCombinationServices(${index})"><span>${escapeComboHtml(name)} (layanan sudah dihapus — hapus centang)</span></label>`
          ).join('');
          const priceLabel = Number(rule.price) > 0 ? 'Rp ' + Number(rule.price).toLocaleString('id-ID') : 'Harga belum diisi';
          const durationLabel = Number(rule.duration) > 0 ? Number(rule.duration) + ' menit' : 'Durasi belum diisi';
          const statusLabel = rule.active === false ? 'Nonaktif' : 'Aktif';
          return `<div class="session-combo-rule-card ${isExpanded ? 'is-expanded' : ''}" data-combo-card="${index}">
            <button type="button" class="session-combo-summary" onclick="toggleSessionCombinationRule(${index})" aria-expanded="${isExpanded ? 'true' : 'false'}" aria-controls="sessionComboDetails${index}">
              <span class="session-combo-summary-main"><strong>${escapeComboHtml(rule.name || 'Aturan tanpa nama')}</strong><small>${selected.length} layanan · ${escapeComboHtml(priceLabel)} · ${escapeComboHtml(durationLabel)}</small></span>
              <span class="session-combo-summary-side"><span class="session-combo-status ${rule.active === false ? 'is-inactive' : ''}">${statusLabel}</span><i class="fa-solid fa-chevron-${isExpanded ? 'up' : 'down'}"></i></span>
            </button>
            <div id="sessionComboDetails${index}" class="session-combo-details" ${isExpanded ? '' : 'hidden'}>
              <div class="session-combo-rule-grid">
                <div class="session-combo-field"><label>Nama aturan (khusus admin)</label><input type="text" value="${escapeComboHtml(rule.name || '')}" placeholder="Contoh: Lash + Brow" oninput="updateSessionCombinationField(${index},'name',this.value); const card=this.closest('.session-combo-rule-card'); const title=card?.querySelector('.session-combo-summary strong'); if(title) title.textContent=this.value || 'Aturan tanpa nama'"></div>
                <div class="session-combo-field"><label>Harga gabungan (Rp)</label><input type="number" min="0" step="1000" value="${Number(rule.price)||0}" placeholder="0" oninput="updateSessionCombinationField(${index},'price',this.value)"></div>
                <div class="session-combo-field"><label>Durasi gabungan (menit)</label><input type="number" min="1" step="1" value="${Number(rule.duration)||0}" placeholder="Menit" oninput="updateSessionCombinationField(${index},'duration',this.value)"></div>
                <button type="button" class="session-combo-delete" onclick="deleteSessionCombinationRule(${index})">Hapus aturan</button>
              </div>
              <div style="font-size:.74rem;font-weight:700;color:var(--text-main);margin-top:11px">Pilih layanan yang membentuk kombinasi (minimal 2):</div>
              <div class="session-combo-service-list">${choices}</div>
              <div class="session-combo-rule-footer"><label><input type="checkbox" ${rule.active === false ? '' : 'checked'} onchange="updateSessionCombinationField(${index},'active',this.checked); const badge=this.closest('.session-combo-rule-card')?.querySelector('.session-combo-status'); if(badge){badge.textContent=this.checked?'Aktif':'Nonaktif';badge.classList.toggle('is-inactive',!this.checked)}"> Aturan aktif</label><span style="font-size:.68rem;color:var(--text-muted)">${selected.length} layanan dipilih</span></div>
            </div>
          </div>`;
        }).join('');
      }

      function addSessionCombinationRule() {
        if (!Array.isArray(siteSettings.sessionCombinations)) siteSettings.sessionCombinations = [];
        siteSettings.sessionCombinations.push({
          id: 'combo_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
          name: 'Sesi Gabungan Baru', serviceNames: [], price: 0, duration: 0, active: true
        });
        expandedSessionCombinationRules.clear();
        expandedSessionCombinationRules.add(siteSettings.sessionCombinations.length - 1);
        r9yMnTm4NSzvG9rrwjM2ec8xZgh1cafXH8();
      }

      function updateSessionCombinationField(index, field, value) {
        const rule = siteSettings.sessionCombinations?.[index];
        if (!rule) return;
        if (field === 'price' || field === 'duration') rule[field] = Math.max(0, Number(value) || 0);
        else if (field === 'active') rule.active = !!value;
        else if (field === 'name') rule.name = String(value || '');
        const card = document.querySelector(`[data-combo-card="${index}"]`);
        if (card) {
          const summary = card.querySelector('.session-combo-summary-main small');
          if (summary) {
            const price = Number(rule.price) > 0 ? 'Rp ' + Number(rule.price).toLocaleString('id-ID') : 'Harga belum diisi';
            const duration = Number(rule.duration) > 0 ? Number(rule.duration) + ' menit' : 'Durasi belum diisi';
            summary.textContent = `${(rule.serviceNames || []).length} layanan · ${price} · ${duration}`;
          }
          const status = card.querySelector('.session-combo-status');
          if (status && field === 'active') {
            status.textContent = rule.active ? 'Aktif' : 'Nonaktif';
            status.classList.toggle('is-inactive', !rule.active);
          }
        }
      }

      function updateSessionCombinationServices(index) {
        const rule = siteSettings.sessionCombinations?.[index];
        if (!rule) return;
        rule.serviceNames = [...document.querySelectorAll(`.combo-service-choice[data-rule-index="${index}"]:checked`)]
          .map(input => input.dataset.serviceName).filter(Boolean);
        r9yMnTm4NSzvG9rrwjM2ec8xZgh1cafXH8();
      }

      function deleteSessionCombinationRule(index) {
        if (!Array.isArray(siteSettings.sessionCombinations) || !siteSettings.sessionCombinations[index]) return;
        if (!confirm('Hapus aturan sesi gabungan ini?')) return;
        siteSettings.sessionCombinations.splice(index, 1);
        expandedSessionCombinationRules.clear();
        r9yMnTm4NSzvG9rrwjM2ec8xZgh1cafXH8();
      }

      async function saveSessionCombinationRules() {
        const btn = document.getElementById('saveSessionCombinationsBtn');
        const rules = Array.isArray(siteSettings.sessionCombinations) ? siteSettings.sessionCombinations : [];
        const activeNames = new Set(servicesList.filter(service => service.active !== false).map(service => service.name));
        const signatures = new Set();
        for (let i = 0; i < rules.length; i++) {
          const rule = rules[i];
          rule.name = String(rule.name || '').trim();
          rule.serviceNames = [...new Set((rule.serviceNames || []).map(name => String(name || '').trim()).filter(Boolean))];
          rule.price = Math.round(Number(rule.price) || 0);
          rule.duration = Math.round(Number(rule.duration) || 0);
          rule.active = rule.active !== false;
          if (!rule.active) continue; // Aturan nonaktif boleh disimpan sebagai draft.
          if (!rule.name) return showToast(`Aturan nomor ${i + 1}: nama aturan wajib diisi.`, 'warning');
          if (rule.serviceNames.length < 2) return showToast(`Aturan "${rule.name}": pilih minimal 2 layanan.`, 'warning');
          if (rule.serviceNames.some(name => !activeNames.has(name))) return showToast(`Aturan "${rule.name}": ada layanan yang tidak aktif atau sudah dihapus. Periksa pilihannya.`, 'warning');
          if (rule.price <= 0 || rule.duration <= 0) return showToast(`Aturan "${rule.name}": harga dan durasi gabungan harus lebih dari 0.`, 'warning');
          const signature = [...rule.serviceNames].sort().join('||');
          if (signatures.has(signature)) return showToast(`Kombinasi layanan pada "${rule.name}" sudah dibuat pada aturan lain.`, 'warning');
          signatures.add(signature);
        }
        if (!sessionStorage.getItem('beautybar_access_token')) return showToast('Silakan login admin kembali.', 'warning');
        btn.disabled = true;
        const oldText = btn.innerText;
        btn.innerText = '⏳ Menyimpan aturan...';
        try {
          const cleanRules = rules.map(rule => ({
            id: rule.id || ('combo_' + Date.now()), name: rule.name,
            serviceNames: [...rule.serviceNames], price: rule.price,
            duration: rule.duration, active: rule.active !== false
          }));
          await supabaseFetch(SCRIPT_URL, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'actionSettings', settings: { ...siteSettings, sessionCombinations: cleanRules } })
          });
          siteSettings.sessionCombinations = cleanRules;
          r9yMnTm4NSzvG9rrwjM2ec8xZgh1cafXH8();
          calculateTotal();
          showToast('Aturan Sesi Gabungan berhasil disimpan ke database.', 'success');
        } catch (error) {
          showToast(error.message || 'Gagal menyimpan aturan Sesi Gabungan.', 'warning');
        } finally {
          btn.disabled = false;
          btn.innerText = oldText;
        }
      }

      function renderServicesEditor() {
        let container = document.getElementById("servicesEditorContainer");
        if (!container) return;
        container.innerHTML = "";
        servicesList.forEach((s, index) => {
          let isChecked = s.active !== false ? "checked" : "";
          let formattedPrice = s.price
            ? Number(s.price).toLocaleString("id-ID")
            : "";
          let hasImage = s.image && s.image.trim() !== "";
          let div = document.createElement("div");
          div.className = "service-edit-card";
          div.id = `serviceCard_${index}`;
          div.style.position = "relative";
          div.style.transition =
            "transform 0.4s cubic-bezier(0.2, 0.9, 0.3, 1.25), box-shadow 0.4s ease, border-color 0.4s ease";
          div.innerHTML = `
                    <div style="display: flex; gap: 12px; align-items: flex-start;">
                        <!-- Upload Foto dari Galeri (Teks Base64) -->
                        <div style="flex-shrink: 0; display: flex; flex-direction: column; align-items: center; gap: 4px;">
                            <div style="position: relative; width: 66px; height: 66px;">
                                <img src="${s.image || "images/hero-eye.png"}" id="editServiceThumb${index}" style="width: 66px; height: 66px; object-fit: cover; border-radius: 10px; border: 2px solid var(--border); background: #000; display: block;" onerror="this.src='images/hero-eye.png'">
                                ${hasImage ? `<button type="button" onclick="removeServiceImage(${index})" title="Hapus Foto" style="position: absolute; top: -6px; right: -6px; background: #ff4d4d; color: #fff; border: none; width: 20px; height: 20px; border-radius: 50%; font-size: 0.65rem; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.5); z-index: 2;">✕</button>` : ""}
                            </div>
                            <label style="display: inline-flex; align-items: center; justify-content: center; gap: 4px; background: rgba(247,182,207,0.15); border: 1px solid var(--accent); color: var(--accent); padding: 4px 8px; border-radius: 6px; font-size: 0.68rem; font-weight: 600; cursor: pointer; text-align: center; white-space: nowrap;">
                                <i class="fa-solid fa-camera"></i> Galeri
                                <input type="file" accept="image/*" onchange="handleServiceImageFile(this, ${index})" style="display: none;">
                            </label>
                            <input type="hidden" id="editImage${index}" value="${s.image || ""}">
                            <small id="serviceImgStatus${index}" style="font-size: 0.62rem; color: #51cf66; font-weight: bold; min-height: 12px; text-align: center;"></small>
                        </div>

                        <!-- Detail Pengaturan Layanan & Katalog -->
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 5px; min-width: 0;">
                            <!-- Nama Layanan + Status Aktif + Hapus -->
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <input type="text" class="service-input" id="editName${index}" value="${s.name || ""}" style="padding: 5px 8px; font-size: 0.85rem; font-weight: bold; flex: 1; min-width: 0;" placeholder="Nama Layanan">
                                <label style="display: flex; align-items: center; gap: 4px; font-size: 0.72rem; color: var(--accent); cursor: pointer; flex-shrink: 0;">
                                    <input type="checkbox" id="editActive${index}" ${isChecked} style="width: 15px; height: 15px; accent-color: var(--accent); cursor: pointer;"> Aktif
                                </label>
                                <button type="button" onclick="deleteServiceItem(${index})" style="background: #3b0d0d; color: #ff8787; border: 1px solid #661a1a; padding: 4px 8px; border-radius: 6px; cursor: pointer; font-weight: bold; height: 28px; flex-shrink: 0;" title="Hapus Layanan">🗑️</button>
                            </div>

                            <!-- Harga + Durasi Booking -->
                            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                                <div style="display: flex; align-items: center; gap: 3px;">
                                    <span style="font-size: 0.72rem; color: var(--text-muted);">Rp</span>
                                    <input type="text" class="service-input" id="editPrice${index}" value="${formattedPrice}" oninput="formatInputRibuan(this)" style="padding: 4px 6px; font-size: 0.75rem; width: 105px;" placeholder="Harga">
                                </div>
                                <div style="display: flex; align-items: center; gap: 3px;">
                                    <input type="number" class="service-input" id="editDuration${index}" value="${s.duration || 60}" style="padding: 4px 6px; font-size: 0.75rem; width: 55px;" placeholder="60">
                                    <span style="font-size: 0.72rem; color: var(--text-muted);">Mnt (Jadwal)</span>
                                </div>
                            </div>

                            <!-- Kategori Layanan -->
                            <div style="display: flex; width: 100%; min-width: 0;">
                                <input type="text" class="service-input" id="editCategory${index}" value="${s.category || "Lash Treatment"}" placeholder="Kategori (cth: Lash Treatment)" style="padding: 4px 6px; font-size: 0.75rem; width: 100%; min-width: 0;" list="categorySuggestions">
                            </div>

                            <!-- Ketahanan ditempatkan di bawah Kategori Layanan -->
                            <div style="display: flex; width: 100%; min-width: 0;">
                                <input type="text" class="service-input" id="editDurability${index}" value="${s.durability || ""}" placeholder="Ketahanan (misal: Ketahanan ± 2 Bulan)" style="padding: 4px 6px; font-size: 0.75rem; width: 100%; min-width: 0;">
                            </div>
                        </div>

                        <!-- Tombol Geser Posisi (Animasi Halus & Nyata) -->
                        <div style="display: flex; flex-direction: column; gap: 4px; justify-content: center; flex-shrink: 0;">
                            <button type="button" onclick="moveServiceItem(${index}, -1)" ${index === 0 ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : ""} style="background: rgba(255,255,255,0.1); color: var(--text-main); border: 1px solid var(--border); padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 0.75rem; transition: background 0.2s;" title="Geser ke Atas">⬆️</button>
                            <button type="button" onclick="moveServiceItem(${index}, 1)" ${index === servicesList.length - 1 ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : ""} style="background: rgba(255,255,255,0.1); color: var(--text-main); border: 1px solid var(--border); padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 0.75rem; transition: background 0.2s;" title="Geser ke Bawah">⬇️</button>
                        </div>
                    </div>`;
          container.appendChild(div);
        });
        container.innerHTML += `
          <datalist id="categorySuggestions">
            ${getCategoryNames().map(c => `<option value="${c}"></option>`).join("")}
          </datalist>
          <button type="button" id="addServiceBtn" onclick="addNewServiceItem()" style="background: #0a2611; color: #51cf66; border: 1px solid #144720; width: 100%; padding: 8px; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 8px; font-size: 0.8rem;">➕ Tambah Layanan Baru</button>
          <button type="button" id="saveServicesBtn" onclick="saveServicesConfig()" class="btn-gold" style="width: 100%; margin-top: 8px;">💾 Simpan Layanan &amp; Katalog ke Database</button>`;
      }

      function handleServiceImageFile(input, index) {
        if (input.files && input.files[0]) {
          let file = input.files[0];
          let statusEl = document.getElementById(`serviceImgStatus${index}`);
          if (statusEl) statusEl.innerText = "⏳ Memproses...";

          let reader = new FileReader();
          reader.onload = function (e) {
            let img = new Image();
            img.src = e.target.result;
            img.onload = function () {
              let canvas = document.createElement("canvas");
              let ctx = canvas.getContext("2d");
              let maxWidth = 360;
              let scaleSize = maxWidth / img.width;
              canvas.width = maxWidth;
              canvas.height = img.height * scaleSize;
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

              // Kompres gambar menjadi teks base64 JPEG kualitas 0.6 (ringan dan jernih)
              let base64Result = canvas.toDataURL("image/jpeg", 0.6);

              syncServicesFromInputs();
              servicesList[index].image = base64Result;
              let thumbEl = document.getElementById(`editServiceThumb${index}`);
              if (thumbEl) thumbEl.src = base64Result;
              let hiddenInput = document.getElementById(`editImage${index}`);
              if (hiddenInput) hiddenInput.value = base64Result;
              if (statusEl) statusEl.innerText = "✓ Foto dimuat!";

              showToast("✓ Foto berhasil dipilih dari galeri!", "success");
              renderCatalogUI();
              renderServicesEditor();
            };
          };
          reader.readAsDataURL(file);
        }
      }

      function removeServiceImage(index) {
        syncServicesFromInputs();
        servicesList[index].image = "";
        renderServicesEditor();
        renderCatalogUI();
        showToast("Foto dihapus", "info");
      }

      function syncServicesFromInputs() {
        for (let i = 0; i < servicesList.length; i++) {
          let nameEl = document.getElementById(`editName${i}`);
          let priceEl = document.getElementById(`editPrice${i}`);
          let durEl = document.getElementById(`editDuration${i}`);
          let activeEl = document.getElementById(`editActive${i}`);
          let durabilityEl = document.getElementById(`editDurability${i}`);
          let categoryEl = document.getElementById(`editCategory${i}`);
          let imageEl = document.getElementById(`editImage${i}`);

          if (nameEl) servicesList[i].name = nameEl.value.trim();
          if (priceEl) {
            let rawPriceVal = priceEl.value.replace(/\D/g, "");
            servicesList[i].price = parseInt(rawPriceVal) || 0;
          }
          if (durEl) servicesList[i].duration = parseInt(durEl.value) || 30;
          if (activeEl) servicesList[i].active = activeEl.checked;
          if (durabilityEl)
            servicesList[i].durability = durabilityEl.value.trim();
          if (categoryEl)
            servicesList[i].category = categoryEl.value.trim() || "Lash Treatment";
          if (imageEl && imageEl.value) servicesList[i].image = imageEl.value;
        }
      }

      function addNewServiceItem() {
        syncServicesFromInputs();
        servicesList.push({
          name: "Layanan Baru",
          price: 50000,
          duration: 60,
          image: "",
          durability: "Ketahanan ± 1 Bulan",
          category: "Lash Treatment",
          active: true,
        });
        renderServicesEditor();
        renderCatalogUI();
        renderCustomerServices();
        r9yMnTm4NSzvG9rrwjM2ec8xZgh1cafXH8();
      }

      function deleteServiceItem(i) {
        if (confirm("Hapus layanan ini dari sistem & katalog?")) {
          syncServicesFromInputs();
          servicesList.splice(i, 1);
          renderServicesEditor();
          renderCatalogUI();
          renderCustomerServices();
          r9yMnTm4NSzvG9rrwjM2ec8xZgh1cafXH8();
        }
      }

      // ===== KELOLA KATEGORI =====
      function renderCategoryEditor() {
        let container = document.getElementById("categoryEditorContainer");
        if (!container) return;
        container.innerHTML = "";
        categoryList.forEach((cat, idx) => {
          let iconOptions = [
            "fa-solid fa-eye","fa-solid fa-star","fa-solid fa-leaf","fa-solid fa-spa",
            "fa-solid fa-heart","fa-solid fa-gem","fa-solid fa-crown","fa-solid fa-wand-magic-sparkles",
            "fa-solid fa-tag","fa-solid fa-layer-group","fa-solid fa-scissors","fa-solid fa-brush",
          ];
          let iconSelectOptions = iconOptions.map(ic =>
            `<option value="${ic}" ${cat.icon === ic ? "selected" : ""}>${ic.replace("fa-solid fa-","")}</option>`
          ).join("");
          let card = document.createElement("div");
          card.className = "service-edit-card";
          card.id = `catCard_${idx}`;
          card.style.padding = "10px 12px";
          card.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <i class="${cat.icon}" style="color: var(--accent); font-size: 1rem; width: 18px; text-align: center;"></i>
              <input type="text" class="service-input" id="catName_${idx}" value="${cat.name}"
                style="flex: 1; padding: 5px 8px; font-size: 0.85rem; font-weight: bold; min-width: 120px;" placeholder="Nama Kategori">
              <select class="service-input" id="catIcon_${idx}" onchange="previewCatIcon(${idx})"
                style="padding: 5px 8px; font-size: 0.75rem; width: 130px;">
                ${iconSelectOptions}
              </select>
              <button type="button" onclick="moveCategoryItem(${idx}, -1)" ${idx === 0 ? 'disabled style="opacity:0.3;"' : ""}
                style="background: rgba(255,255,255,0.1); color: var(--text-main); border: 1px solid var(--border); padding: 5px 8px; border-radius: 6px; cursor: pointer;">⬆️</button>
              <button type="button" onclick="moveCategoryItem(${idx}, 1)" ${idx === categoryList.length - 1 ? 'disabled style="opacity:0.3;"' : ""}
                style="background: rgba(255,255,255,0.1); color: var(--text-main); border: 1px solid var(--border); padding: 5px 8px; border-radius: 6px; cursor: pointer;">⬇️</button>
              <button type="button" onclick="deleteCategoryItem(${idx})"
                style="background: #3b0d0d; color: #ff8787; border: 1px solid #661a1a; padding: 5px 9px; border-radius: 6px; cursor: pointer; font-weight: bold;">🗑️</button>
            </div>`;
          const nameInput = card.querySelector(`#catName_${idx}`);
          if (nameInput) nameInput.dataset.originalName = cat.name;
          container.appendChild(card);
        });
      }

      function previewCatIcon(idx) {
        let iconSel = document.getElementById(`catIcon_${idx}`);
        let card = document.getElementById(`catCard_${idx}`);
        if (iconSel && card) {
          let icon = card.querySelector("i");
          if (icon) icon.className = iconSel.value + " fa-solid";
          // actually the class is already full from the value
          if (icon) icon.className = iconSel.value;
        }
      }

      function syncCategoryFromInputs() {
        categoryList.forEach((cat, idx) => {
          const nameEl = document.getElementById(`catName_${idx}`);
          const iconEl = document.getElementById(`catIcon_${idx}`);
          const oldName = nameEl?.dataset.originalName || cat.name;
          const newName = nameEl ? (nameEl.value.trim() || cat.name) : cat.name;
          if (oldName !== newName) {
            servicesList.forEach(service => {
              if (String(service.category || "").trim() === oldName) service.category = newName;
            });
            categoryServicesNeedSave = true;
          }
          cat.name = newName;
          if (nameEl) nameEl.dataset.originalName = newName;
          if (iconEl) cat.icon = iconEl.value;
        });
      }

      function addCategoryItem() {
        syncCategoryFromInputs();
        categoryList.push({ name: "Kategori Baru", icon: "fa-solid fa-tag" });
        renderCategoryEditor();
      }

      function deleteCategoryItem(idx) {
        syncCategoryFromInputs();
        const category = categoryList[idx];
        if (!category) return;
        if (categoryList.length <= 1) return showToast("Minimal harus ada 1 grup layanan.", "warning");

        const target = categoryList.find((_, index) => index !== idx);
        const assigned = servicesList.filter(service => String(service.category || "").trim() === category.name);
        const message = assigned.length
          ? `Grup "${category.name}" berisi ${assigned.length} layanan. Layanan tersebut akan dipindahkan ke "${target.name}" sebelum grup dihapus. Lanjutkan?`
          : `Hapus grup "${category.name}"?`;

        showConfirmModal("Konfirmasi hapus grup", message, async () => {
          try {
            if (assigned.length) {
              assigned.forEach(service => { service.category = target.name; });
              await persistServicesList();
            }
            categoryList.splice(categoryList.findIndex(item => item.name === category.name), 1);
            await persistCategoryList();
            renderCategoryEditor();
            renderServicesEditor();
            renderCatalogUI();
            renderCustomerServices();
            showToast(`Grup "${category.name}" berhasil dihapus${assigned.length ? `; ${assigned.length} layanan dipindahkan ke "${target.name}"` : ""}.`);
          } catch (error) {
            console.error("Gagal menghapus grup layanan:", error);
            showToast("Gagal menyimpan perubahan grup ke database. Silakan coba lagi.", "error");
          }
        });
      }

      function moveCategoryItem(idx, dir) {
        let target = idx + dir;
        if (target < 0 || target >= categoryList.length) return;
        syncCategoryFromInputs();
        let temp = categoryList[idx];
        categoryList[idx] = categoryList[target];
        categoryList[target] = temp;
        renderCategoryEditor();
        renderCatalogUI();
        renderCustomerServices();
      }

      async function saveCategoryConfig() {
        syncCategoryFromInputs();
        const names = categoryList.map(cat => cat.name.trim().toLowerCase());
        if (names.some((name, index) => !name || names.indexOf(name) !== index)) {
          showToast("Nama grup wajib diisi dan tidak boleh duplikat.", "warning");
          return;
        }
        const saveButton = document.querySelector("#categoryEditorContainer")?.parentElement?.querySelector("button.btn-gold");
        if (saveButton) { saveButton.disabled = true; saveButton.textContent = "⏳ Menyimpan grup..."; }
        try {
          if (categoryServicesNeedSave) {
            await persistServicesList();
            categoryServicesNeedSave = false;
          }
          await persistCategoryList();
          let dl = document.getElementById("categorySuggestions");
          if (dl) dl.innerHTML = getCategoryNames().map(c => `<option value="${c}"></option>`).join("");
          renderCatalogUI();
          renderCustomerServices();
          renderServicesEditor();
          showToast("✅ Grup layanan berhasil disimpan ke database!", "success");
        } catch (error) {
          console.error("Gagal menyimpan kategori:", error);
          showToast("Gagal menyimpan grup layanan ke database.", "error");
        } finally {
          if (saveButton) { saveButton.disabled = false; saveButton.textContent = "💾 Simpan Kategori"; }
        }
      }
      // ===== AKHIR KELOLA KATEGORI =====

      function moveServiceItem(index, direction) {
        if (isMovingService) return;
        let targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= servicesList.length) return;

        let cardA = document.getElementById(`serviceCard_${index}`);
        let cardB = document.getElementById(`serviceCard_${targetIndex}`);

        syncServicesFromInputs();

        if (cardA && cardB) {
          isMovingService = true;
          let diffY = cardB.offsetTop - cardA.offsetTop;

          // Animasi pergerakan yang sangat terlihat jelas
          cardA.style.zIndex = "10";
          cardB.style.zIndex = "9";
          cardA.style.boxShadow =
            "0 0 25px rgba(247, 182, 207, 0.9), 0 8px 24px rgba(0,0,0,0.6)";
          cardB.style.boxShadow = "0 0 15px rgba(255, 255, 255, 0.4)";
          cardA.style.borderColor = "var(--accent)";
          cardA.style.transform = `translateY(${diffY}px) scale(1.02)`;
          cardB.style.transform = `translateY(${-diffY}px) scale(0.98)`;

          setTimeout(() => {
            let temp = servicesList[index];
            servicesList[index] = servicesList[targetIndex];
            servicesList[targetIndex] = temp;

            renderServicesEditor();
            renderCatalogUI();
            renderCustomerServices();

            // Efek flash highlight pada posisi baru agar terlihat perpindahannya
            let newCard = document.getElementById(`serviceCard_${targetIndex}`);
            if (newCard) {
              newCard.style.boxShadow = "0 0 22px rgba(247, 182, 207, 0.95)";
              newCard.style.borderColor = "var(--accent)";
              setTimeout(() => {
                if (newCard) {
                  newCard.style.transition =
                    "box-shadow 0.4s ease, border-color 0.4s ease";
                  newCard.style.boxShadow = "";
                  newCard.style.borderColor = "";
                }
                isMovingService = false;
              }, 350);
            } else {
              isMovingService = false;
            }
          }, 400);
        } else {
          let temp = servicesList[index];
          servicesList[index] = servicesList[targetIndex];
          servicesList[targetIndex] = temp;
          renderServicesEditor();
          renderCatalogUI();
          renderCustomerServices();
        }
      }

      async function saveServicesConfig() {
        let saveBtn = document.getElementById("saveServicesBtn");
        saveBtn.disabled = true;
        saveBtn.innerText = "⏳ Menyimpan ke Database...";
        syncServicesFromInputs();
        try {
          await supabaseFetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "updateServices",
              services: servicesList,
            }),
          });
          showToast("✓ Layanan & Katalog berhasil disimpan!");
          renderServicesEditor();
          renderCatalogUI();
          renderCustomerServices();
          r9yMnTm4NSzvG9rrwjM2ec8xZgh1cafXH8();
        } catch (e) {
          showToast("Gagal menyimpan ke server.", "warning");
        } finally {
          saveBtn.disabled = false;
          saveBtn.innerText = "💾 Simpan Layanan & Katalog ke Database";
        }
      }

      function renderCatalogUI() {
        let fullContainer = document.getElementById("fullCatalogContainer");
        if (!fullContainer) return;
        let activeServices = servicesList.filter((s) => s.active !== false);

        let currentView = window._catalogView || "large-icon";

        let createCard = (item) => `
                <div class="catalog-item">
                    <div class="catalog-img-container">
                        <img src="${item.image || "images/hero-eye.png"}" alt="${item.name}" class="catalog-img" onerror="this.onerror=null; this.src='images/hero-eye.png';">
                    </div>
                    <div class="catalog-body">
                        <h4>${item.name}</h4>
                        <p><i class="fa-regular fa-clock" style="font-size:0.75rem; color:var(--accent);"></i> ${item.durability || "Durasi: " + (item.duration ? item.duration + " mnt" : "-")}</p>
                        <span class="catalog-price">${formatRupiah(item.price || 0)}</span>
                        <button type="button" class="btn-gold" onclick="selectServiceForBooking('${item.name.replace(/'/g, "\\'")}')">Pesan</button>
                    </div>
                </div>
            `;

        // Icon helper untuk kategori — gunakan categoryList
        let getCatIcon = (catName) => {
          let found = categoryList.find(c => c.name === catName);
          if (found) return `<i class="${found.icon}" style="color:var(--accent);font-size:1.1em;"></i>`;
          // fallback emoji
          let lower = (catName || "").toLowerCase();
          if (lower.indexOf("lash") > -1) return "🌸";
          if (lower.indexOf("threading") > -1) return "💫";
          if (lower.indexOf("brow") > -1) return "✨";
          if (lower.indexOf("paket") > -1) return "🎁";
          return "✨";
        };

        // Kelompokkan layanan aktif berdasarkan kategori
        let grouped = {};
        activeServices.forEach((item) => {
          let cat = (item.category && item.category.trim()) || "Lash Treatment";
          if (!grouped[cat]) grouped[cat] = [];
          grouped[cat].push(item);
        });

        // Urutkan kategori sesuai urutan di categoryList, lalu sisanya di bawah
        let orderedCatNames = getCategoryNames().filter(c => grouped[c]);
        // Tambahkan kategori dari layanan yang tidak ada di categoryList
        Object.keys(grouped).forEach(c => { if (!orderedCatNames.includes(c)) orderedCatNames.push(c); });

        let catNames = orderedCatNames;
        if (catNames.length === 0) {
          fullContainer.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding:30px 0; font-size:0.85rem;">Belum ada layanan yang aktif.</p>`;
          fullContainer.className = "catalog-categories-wrapper";
        } else {
          fullContainer.className = "catalog-categories-wrapper";
          fullContainer.innerHTML = catNames.map((catName) => {
            let items = grouped[catName];
            return `
              <div class="catalog-category-group">
                <div class="catalog-category-header">
                  <span class="cat-icon">${getCatIcon(catName)}</span>
                  <span>${catName}</span>
                  <span class="cat-count">${items.length} Layanan</span>
                </div>
                <div class="catalog-grid view-${currentView}">
                  ${items.map(createCard).join("")}
                </div>
              </div>
            `;
          }).join("");
        }

        // Render semua section info katalog
        renderCatalogInfoSections();
        renderKetahananSection();
        renderDurasiSection();
        renderPolicySection();
      }

      // ===== RENDER: PENJELASAN LAYANAN =====
      function renderCatalogInfoSections() {
        let grid = document.getElementById("treatmentExplainGrid");
        if (!grid) return;
        let data = infoKatalogData.penjelasan || [];
        grid.innerHTML = data.map(kat => `
          <div class="treatment-card">
            <div class="treatment-card-header">
              <i class="${kat.icon || 'fa-solid fa-star'}"></i>
              ${kat.kategori}
            </div>
            <div class="treatment-card-body">
              ${(kat.items || []).map(item => `
                <div class="treatment-item">
                  <div class="treatment-item-name">🩷 ${item.nama}</div>
                  <div class="treatment-item-desc">
                    ${item.deskripsi ? `<p style="margin:2px 0">${item.deskripsi}</p>` : ""}
                    ${item.poin && item.poin.length > 0 ? `<ul>${item.poin.map(p => `<li>${p}</li>`).join("")}</ul>` : ""}
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `).join("");
      }

      // ===== RENDER: KETAHANAN =====
      function renderKetahananSection() {
        let grid = document.getElementById("ketahananGrid");
        if (!grid) return;
        let data = infoKatalogData.ketahanan || [];
        grid.innerHTML = data.map(item => `
          <div class="ketahanan-item">
            <div class="ketahanan-icon">${item.icon || "⏳"}</div>
            <div>
              <div class="ketahanan-label">${item.label}</div>
              <div class="ketahanan-value">${item.nilai}</div>
            </div>
          </div>
        `).join("");
      }

      // ===== RENDER: DURASI =====
      function renderDurasiSection() {
        let grid = document.getElementById("durasiGrid");
        if (!grid) return;
        let data = infoKatalogData.durasi || [];
        grid.innerHTML = data.map(item => `
          <div class="durasi-item">
            <div class="durasi-name">${item.nama}</div>
            <div class="durasi-time"><i class="fa-regular fa-clock" style="font-size:0.8rem"></i> ${item.waktu}</div>
          </div>
        `).join("");
      }

      // ===== RENDER: POLICY =====
      function renderPolicySection() {
        let list = document.getElementById("policyList");
        if (!list) return;
        let data = infoKatalogData.policy || [];
        list.innerHTML = data.map((item, i) => `
          <div class="policy-item">
            <div class="policy-num">${i + 1}</div>
            <div class="policy-text">${item.teks}</div>
          </div>
        `).join("");
      }

      // ===== ADMIN: SUB TAB INFO KATALOG =====
      function switchInfoSubTab(tab) {
        ["penjelasan","ketahanan","durasi","policy"].forEach(t => {
          let p = document.getElementById("infoPanel-" + t);
          let b = document.getElementById("infoSubTab-" + t);
          if (p) p.style.display = t === tab ? "block" : "none";
          if (b) b.classList.toggle("active-tab", t === tab);
        });
        if (tab === "penjelasan") renderPenjelasanEditor();
        if (tab === "ketahanan") renderKetahananEditor();
        if (tab === "durasi") renderDurasiEditor();
        if (tab === "policy") renderPolicyEditor();
      }

      // ===== EDITOR: PENJELASAN =====
      function renderPenjelasanEditor() {
        let c = document.getElementById("penjelasanEditorContainer");
        if (!c) return;
        let data = infoKatalogData.penjelasan || [];
        c.innerHTML = data.map((kat, ki) => `
          <div style="background:rgba(0,0,0,0.25);border:1px solid var(--border);border-radius:10px;padding:12px;margin-bottom:12px;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
              <input type="text" value="${kat.kategori}" onchange="infoKatalogData.penjelasan[${ki}].kategori=this.value"
                style="flex:1;background:rgba(0,0,0,0.3);border:1px solid var(--border);color:var(--text-main);border-radius:6px;padding:5px 8px;font-size:0.82rem;font-weight:700;" placeholder="Nama Kategori">
              <button onclick="infoKatalogData.penjelasan.splice(${ki},1);renderPenjelasanEditor()" style="background:#3b0d0d;color:#ff8787;border:1px solid #661a1a;padding:4px 8px;border-radius:6px;cursor:pointer;font-size:0.75rem;">🗑️</button>
            </div>
            ${(kat.items || []).map((item, ii) => `
              <div style="background:rgba(0,0,0,0.2);border:1px solid var(--border);border-radius:8px;padding:8px;margin-bottom:6px;">
                <div style="display:flex;gap:6px;align-items:center;margin-bottom:4px;">
                  <input type="text" value="${item.nama}" onchange="infoKatalogData.penjelasan[${ki}].items[${ii}].nama=this.value"
                    style="flex:1;background:rgba(0,0,0,0.3);border:1px solid var(--border);color:var(--text-main);border-radius:6px;padding:4px 7px;font-size:0.78rem;font-weight:600;" placeholder="Nama Treatment">
                  <button onclick="infoKatalogData.penjelasan[${ki}].items.splice(${ii},1);renderPenjelasanEditor()" style="background:#3b0d0d;color:#ff8787;border:1px solid #661a1a;padding:3px 7px;border-radius:5px;cursor:pointer;font-size:0.7rem;">✕</button>
                </div>
                <textarea rows="2" onchange="infoKatalogData.penjelasan[${ki}].items[${ii}].deskripsi=this.value"
                  style="width:100%;background:rgba(0,0,0,0.3);border:1px solid var(--border);color:var(--text-main);border-radius:6px;padding:4px 7px;font-size:0.75rem;resize:vertical;box-sizing:border-box;" placeholder="Deskripsi singkat...">${item.deskripsi || ""}</textarea>
                <div style="margin-top:4px;">
                  <div style="font-size:0.72rem;color:var(--text-muted);margin-bottom:3px;">Poin-poin (tiap baris = 1 poin):</div>
                  <textarea rows="3" onchange="infoKatalogData.penjelasan[${ki}].items[${ii}].poin=this.value.split('\\n').filter(p=>p.trim())"
                    style="width:100%;background:rgba(0,0,0,0.3);border:1px solid var(--border);color:var(--text-main);border-radius:6px;padding:4px 7px;font-size:0.73rem;resize:vertical;box-sizing:border-box;" placeholder="Poin 1\nPoin 2\nPoin 3">${(item.poin||[]).join("\\n")}</textarea>
                </div>
              </div>
            `).join("")}
            <button onclick="infoKatalogData.penjelasan[${ki}].items.push({nama:'Treatment Baru',deskripsi:'',poin:[]});renderPenjelasanEditor()"
              style="background:rgba(0,0,0,0.2);color:var(--text-muted);border:1px dashed var(--border);width:100%;padding:5px;border-radius:6px;cursor:pointer;font-size:0.73rem;margin-top:2px;">
              + Tambah Item
            </button>
          </div>
        `).join("");
      }

      function addPenjelasanCategory() {
        infoKatalogData.penjelasan.push({kategori:"Kategori Baru",icon:"fa-solid fa-star",items:[]});
        renderPenjelasanEditor();
      }

      // ===== EDITOR: KETAHANAN =====
      function renderKetahananEditor() {
        let c = document.getElementById("ketahananEditorContainer");
        if (!c) return;
        let data = infoKatalogData.ketahanan || [];
        c.innerHTML = data.map((item, i) => `
          <div class="ketahanan-editor-row">
            <input class="ketahanan-editor-icon" type="text" value="${item.icon||'⏳'}" onchange="infoKatalogData.ketahanan[${i}].icon=this.value" aria-label="Ikon treatment">
            <input class="ketahanan-editor-label" type="text" value="${item.label}" onchange="infoKatalogData.ketahanan[${i}].label=this.value" placeholder="Nama Treatment" aria-label="Nama treatment">
            <input class="ketahanan-editor-value" type="text" value="${item.nilai}" onchange="infoKatalogData.ketahanan[${i}].nilai=this.value" placeholder="cth: ± 2 Bulan" aria-label="Ketahanan treatment">
            <button type="button" class="ketahanan-editor-delete" onclick="infoKatalogData.ketahanan.splice(${i},1);renderKetahananEditor()" aria-label="Hapus item ketahanan">✕</button>
          </div>
        `).join("");
      }

      function addKetahananItem() {
        infoKatalogData.ketahanan.push({icon:"⏳",label:"Treatment",nilai:"± X Bulan"});
        renderKetahananEditor();
      }

      // ===== EDITOR: DURASI =====
      function renderDurasiEditor() {
        let c = document.getElementById("durasiEditorContainer");
        if (!c) return;
        let data = infoKatalogData.durasi || [];
        c.innerHTML = data.map((item, i) => `
          <div style="display:flex;gap:8px;align-items:center;padding:7px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
            <input type="text" value="${item.nama}" onchange="infoKatalogData.durasi[${i}].nama=this.value"
              style="flex:2;background:rgba(0,0,0,0.3);border:1px solid var(--border);color:var(--text-main);border-radius:6px;padding:4px 7px;font-size:0.78rem;" placeholder="Nama Layanan">
            <input type="text" value="${item.waktu}" onchange="infoKatalogData.durasi[${i}].waktu=this.value"
              style="flex:1;background:rgba(0,0,0,0.3);border:1px solid var(--border);color:var(--accent);border-radius:6px;padding:4px 7px;font-size:0.78rem;font-weight:600;" placeholder="cth: ± 50 Menit">
            <button onclick="infoKatalogData.durasi.splice(${i},1);renderDurasiEditor()" style="background:#3b0d0d;color:#ff8787;border:1px solid #661a1a;padding:3px 7px;border-radius:5px;cursor:pointer;font-size:0.7rem;">✕</button>
          </div>
        `).join("");
      }

      function addDurasiItem() {
        infoKatalogData.durasi.push({nama:"Layanan",waktu:"± 30 Menit"});
        renderDurasiEditor();
      }

      // ===== EDITOR: POLICY =====
      function renderPolicyEditor() {
        let c = document.getElementById("policyEditorContainer");
        if (!c) return;
        let data = infoKatalogData.policy || [];
        c.innerHTML = data.map((item, i) => `
          <div style="display:flex;gap:8px;align-items:flex-start;padding:7px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
            <div style="width:22px;height:22px;background:rgba(247,182,207,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;color:var(--accent);flex-shrink:0;margin-top:4px;">${i+1}</div>
            <textarea rows="2" onchange="infoKatalogData.policy[${i}].teks=this.value"
              style="flex:1;background:rgba(0,0,0,0.3);border:1px solid var(--border);color:var(--text-main);border-radius:6px;padding:4px 7px;font-size:0.76rem;resize:vertical;box-sizing:border-box;" placeholder="Isi poin kebijakan... (gunakan <strong>teks tebal</strong>)">${item.teks||""}</textarea>
            <button onclick="infoKatalogData.policy.splice(${i},1);renderPolicyEditor()" style="background:#3b0d0d;color:#ff8787;border:1px solid #661a1a;padding:3px 7px;border-radius:5px;cursor:pointer;font-size:0.7rem;flex-shrink:0;margin-top:3px;">✕</button>
          </div>
        `).join("");
      }

      function addPolicyItem() {
        infoKatalogData.policy.push({teks:"Poin kebijakan baru."});
        renderPolicyEditor();
      }

      // ===== SAVE INFO KATALOG =====
      async function saveInfoKatalog() {
        let btn = document.getElementById("saveInfoKatalogBtn");
        btn.disabled = true;
        btn.innerText = "⏳ Menyimpan ke Database...";
        try {
          await supabaseFetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "actionSettings", settings: { ...siteSettings, infoKatalog: infoKatalogData } })
          });
          siteSettings.infoKatalog = infoKatalogData;
          showToast("✓ Info Katalog berhasil disimpan!");
          renderCatalogInfoSections();
          renderKetahananSection();
          renderDurasiSection();
          renderPolicySection();
        } catch(e) {
          showToast("Gagal menyimpan ke server.", "warning");
        } finally {
          btn.disabled = false;
          btn.innerText = "💾 Simpan Info Katalog ke Database";
        }
      }

      let _catalogViewModes = [
        "large-icon",
        "thumbnail",
        "content",
        "detail",
        "list",
      ];

      function setCatalogView(view) {
        if (!_catalogViewModes.includes(view)) return;
        window._catalogView = view;

        let container = document.getElementById("fullCatalogContainer");
        if (container) {
          // Animasi fade out → switch → fade in
          container.style.transition = "opacity 0.18s ease";
          container.style.opacity = "0";
          setTimeout(() => {
            let grids = container.querySelectorAll(".catalog-grid");
            grids.forEach((g) => {
              g.className = "catalog-grid view-" + view;
            });
            container.style.opacity = "1";
          }, 180);
        }

        // Update tombol aktif
        _catalogViewModes.forEach((v) => {
          let btn = document.getElementById("viewBtn-" + v);
          if (btn) btn.classList.toggle("active", v === view);
        });

        // Simpan preferensi ke localStorage agar diingat
        try {
          localStorage.setItem("catalogView", view);
        } catch (e) {}
      }

      function initCatalogViewPreference() {
        let saved = "large-icon";
        try {
          saved = localStorage.getItem("catalogView") || "large-icon";
        } catch (e) {}
        if (!_catalogViewModes.includes(saved)) saved = "large-icon";
        window._catalogView = saved;
        let container = document.getElementById("fullCatalogContainer");
        if (container) {
          let grids = container.querySelectorAll(".catalog-grid");
          grids.forEach((g) => {
            g.className = "catalog-grid view-" + saved;
          });
        }
        _catalogViewModes.forEach((v) => {
          let btn = document.getElementById("viewBtn-" + v);
          if (btn) btn.classList.toggle("active", v === saved);
        });
      }

      function selectServiceForBooking(serviceName) {
        switchPage("booking");
        goToStep(2);
        setTimeout(() => {
          // Cari dan centang checkbox untuk Customer 1
          let chk = document.querySelector(`.service-chk[data-cust="1"][data-name="${serviceName}"]`);
          if (chk && !chk.checked) {
            chk.checked = true;
          }
          calculateTotal();
          generateAvailableSlots();
        }, 300);
      }

      async function saveCustomizeAndHolidayConfig() {
        let saveBtn = document.getElementById("saveCustomizeBtn");
        let customizeContainer = document.getElementById("admin-tab-customize");

        saveBtn.disabled = true;
        saveBtn.innerText = "⏳ Menyimpan Pengaturan...";
        customizeContainer.style.opacity = "0.6";
        let inputsInTab = customizeContainer.querySelectorAll(
          "input, select, textarea, button",
        );
        inputsInTab.forEach((el) => (el.disabled = true));

        let todayStr = getLocalTodayStr();
        let todayDateObj = new Date(todayStr + "T00:00:00");

        if (
          siteSettings.blockedDateHours &&
          typeof siteSettings.blockedDateHours === "object"
        ) {
          let cleanedBlockedHours = {};
          for (let dKey in siteSettings.blockedDateHours) {
            let targetDateObj = new Date(dKey + "T00:00:00");
            if (targetDateObj >= todayDateObj) {
              cleanedBlockedHours[dKey] = siteSettings.blockedDateHours[dKey];
            }
          }
          siteSettings.blockedDateHours = cleanedBlockedHours;
        }

        siteSettings.holidayMode = document.getElementById(
          "holidayModeCheckbox",
        ).checked;
        siteSettings.holidayMessage = document
          .getElementById("holidayMessageInput")
          .value.trim();
        siteSettings.hourOpen = cleanTimeString(
          document.getElementById("opHourOpen").value,
          "10:00",
        );
        siteSettings.hourClose = cleanTimeString(
          document.getElementById("opHourClose").value,
          "21:00",
        );

        let daysMap = [1, 2, 3, 4, 5, 6, 0];
        siteSettings.openDays = {};
        daysMap.forEach((dId) => {
          let chk = document.getElementById(`dayCheck_${dId}`);
          if (chk) siteSettings.openDays[dId] = chk.checked;
        });

        let heroVal = document.getElementById("custHeroInput") ? document.getElementById("custHeroInput").value.trim() : "";
        if (heroVal) siteSettings.heroImage = heroVal;
        let qrisVal = document.getElementById("custQrisInput") ? document.getElementById("custQrisInput").value.trim() : "";
        if (qrisVal) siteSettings.qrisImage = qrisVal;
        siteSettings.themePreset = "minimal_white";
        delete siteSettings.adminPasswordBase64;
        siteSettings.scriptFont = cleanFontString(
          document.getElementById("custScriptFontInput").value,
          "'Great Vibes', cursive",
        );

        try {
          await supabaseFetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "actionSettings",
              settings: siteSettings,
            }),
          });
          showToast("✓ Pengaturan berhasil disimpan!");
          applySiteCustomization();
          applyHolidayModeUI();
          renderBlockedHistoryList();
        } catch (e) {
          showToast("Gagal menyimpan.", "warning");
        } finally {
          saveBtn.disabled = false;
          saveBtn.innerText = "💾 Simpan Pengaturan & Kustomisasi";
          customizeContainer.style.opacity = "1";
          inputsInTab.forEach((el) => (el.disabled = false));
        }
      }


      let rawAdminBookingsCache = [];
      let selectedAdminBookingIds = new Set();
      let currentAdminDateFilter = "today";

      function setAdminDateFilter(filterType, btnElement) {
        currentAdminDateFilter = filterType;
        document
          .querySelectorAll("#admin-tab-bookings .tab-btn")
          .forEach((btn) => {
            if (btn.id.startsWith("filterBtn-"))
              btn.classList.remove("active-tab");
          });
        if (btnElement) btnElement.classList.add("active-tab");

        document.getElementById("filterStartDate").value = "";
        document.getElementById("filterEndDate").value = "";

        renderFilteredAdminBookings();
      }

      function onCustomDateChange() {
        currentAdminDateFilter = "custom";
        document
          .querySelectorAll("#admin-tab-bookings .tab-btn")
          .forEach((btn) => {
            if (btn.id.startsWith("filterBtn-"))
              btn.classList.remove("active-tab");
          });
        renderFilteredAdminBookings();
      }

      async function loadAdminTable() {
        let container = document.getElementById("adminBookingListContainer");
        container.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 15px; font-size: 0.8rem;">Memuat data...</p>`;

        try {
          let response = await supabaseFetch(SCRIPT_URL);
          let resData = await response.json();
          let bookings = resData.bookings || [];

          rawAdminBookingsCache = bookings.filter(
            (item) =>
              item.id &&
              (item.nama || item.name) &&
              (item.whatsapp || item.phone),
          );
          renderFilteredAdminBookings();
        } catch (e) {
          container.innerHTML = `<p style="text-align: center; color: #ff8787; padding: 15px; font-size: 0.8rem;">Gagal memuat data.</p>`;
        }
      }

      function resetDateFilter() {
        document.getElementById("filterStartDate").value = "";
        document.getElementById("filterEndDate").value = "";
        setAdminDateFilter("today", document.getElementById("filterBtn-today"));
      }

      function renderFilteredAdminBookings() {
        let container = document.getElementById("adminBookingListContainer");
        let searchKeyword = document.getElementById("adminSearchInput")
          ? document
              .getElementById("adminSearchInput")
              .value.toLowerCase()
              .trim()
          : "";
        let startDate = document.getElementById("filterStartDate").value;
        let endDate = document.getElementById("filterEndDate").value;

        let todayStr = getLocalTodayStr();
        let tomorrowDate = new Date();
        tomorrowDate.setDate(tomorrowDate.getDate() + 1);
        let tomorrowStr = `${tomorrowDate.getFullYear()}-${String(tomorrowDate.getMonth() + 1).padStart(2, "0")}-${String(tomorrowDate.getDate()).padStart(2, "0")}`;

        let filtered = rawAdminBookingsCache.filter((item) => {
          let itemName = (item.nama || item.name || "").toLowerCase();
          let itemPhone = cleanPhone(item.whatsapp || item.phone).toLowerCase();
          let matchesSearch =
            itemName.includes(searchKeyword) ||
            itemPhone.includes(searchKeyword);
          if (!matchesSearch) return false;

          let timeVal = item.waktu || item.datetime || "";
          if (!timeVal) return false;
          let bookingDateStr = getStandardDateKey(timeVal);

          if (currentAdminDateFilter === "today") {
            return bookingDateStr === todayStr;
          } else if (currentAdminDateFilter === "tomorrow") {
            return bookingDateStr === tomorrowStr;
          } else if (currentAdminDateFilter === "all") {
            return true;
          } else if (currentAdminDateFilter === "custom") {
            if (startDate && bookingDateStr < startDate) return false;
            if (endDate && bookingDateStr > endDate) return false;
            return true;
          }
          return true;
        });

        if (filtered.length === 0) {
          container.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 15px; font-size: 0.8rem;">Tidak ada data booking yang sesuai.</p>`;
          return;
        }

        let groupedByDate = {};
        filtered.forEach((item) => {
          let timeVal = item.waktu || item.datetime || "";
          let dateKey = getStandardDateKey(timeVal) || "Lainnya";
          if (!groupedByDate[dateKey]) groupedByDate[dateKey] = [];
          groupedByDate[dateKey].push(item);
        });

        container.innerHTML = "";

        let sortedDateKeys = Object.keys(groupedByDate).sort((a, b) => {
          let dA = parseSafeDateTime(a);
          let dB = parseSafeDateTime(b);
          return (dA ? dA.getTime() : 0) - (dB ? dB.getTime() : 0);
        });

        sortedDateKeys.forEach((dateKey) => {
          let dateTitle = formatIndonesianDateTitle(dateKey);

          groupedByDate[dateKey].sort((a, b) => {
            let timeA = parseSafeDateTime(a.waktu || a.datetime);
            let timeB = parseSafeDateTime(b.waktu || b.datetime);
            return (
              (timeA ? timeA.getTime() : 0) - (timeB ? timeB.getTime() : 0)
            );
          });

          let dailyTotalRevenue = 0;
          groupedByDate[dateKey].forEach((item) => {
            let rawTotal = item.total || item.totalPrice || "0";
            let numericTotal =
              parseInt(rawTotal.toString().replace(/\D/g, "")) || 0;
            dailyTotalRevenue += numericTotal;
          });

          let dateSectionDiv = document.createElement("div");
          dateSectionDiv.className = "booking-date-group";
          dateSectionDiv.innerHTML = `
                    <div class="booking-date-header">
                        <span>📅 ${dateTitle}</span>
                        <span style="color: var(--accent); font-size: 0.8rem; font-weight: 600;">Total: ${formatRupiah(dailyTotalRevenue)}</span>
                    </div>
                `;

          let tableHtml = `
                    <div class="booking-table-wrapper">
                        <table class="admin-booking-table">
                            <thead>
                                <tr>
                                    <th style="width:42px; text-align:center;"><input type="checkbox" title="Pilih semua booking yang tampil" onchange="toggleSelectVisibleBookings(this.checked)"></th>
                                    <th style="min-width: 135px; width: 135px;">📌 Status</th>
                                    <th style="width: 100px;">🕒 Jam Booking</th>
                                    <th style="width: max-content; white-space: nowrap;">💆 Layanan Dipilih</th>
                                    <th style="width: 120px;">👤 Nama</th>
                                    <th style="text-align: center; width: 65px;">📷 Bukti</th>
                                    <th style="width: 125px;">📱 WhatsApp</th>
                                    <th>⚠️ Ket. Penolakan</th>
                                </tr>
                            </thead>
                            <tbody>
                `;

          groupedByDate[dateKey].forEach((item) => {
            let st = item.status || "Pending";
            let rawService = item.layanan || item.service || "";
            let timeRange = formatDateTimeRange(
              item.waktu || item.datetime,
              rawService,
            );
            let timeDisplay = timeRange.includes("(")
              ? timeRange.split("(")[1].replace(")", "").trim()
              : timeRange;

            let proofImgUrl = item.buktibayar || item.paymentProof || "";
            let proofAction = proofImgUrl
              ? `<button type="button" class="proof-btn-icon" onclick="openImageModal('${proofImgUrl}')" title="Lihat Bukti Transfer"><i class="fa-solid fa-image"></i></button>`
              : `<span style="font-size:0.75rem; color:var(--text-muted);">-</span>`;

            let itemName = item.nama || item.name || "-";
            let itemPhone = cleanPhone(item.whatsapp || item.phone);

            let itemId = item.id || "";
            let reasonText =
              st === "Ditolak" && item.alasan
                ? `<span style="color:#ff8787; font-size:0.75rem; font-weight:500;">${item.alasan}</span>`
                : `<span style="color:var(--text-muted); font-size:0.75rem;">-</span>`;

            let rowStatusClass = "row-status-pending";
            if (st === "Diterima") rowStatusClass = "row-status-diterima";
            else if (st === "Selesai") rowStatusClass = "row-status-selesai";
            else if (st === "Ditolak") rowStatusClass = "row-status-ditolak";

            // Sesi gabungan ditampilkan sebagai satu item ringkas agar layanan
            // pembentuk kombinasi tidak berulang di tabel admin.
            let servicesArr = rawService.split(/\s*\|\s*/);
            let servicesLinesHtml = servicesArr.map((srv) => {
              let clean = srv.replace(/^C\d+:\s*/, "").trim();
              const comboMatch = clean.match(/\[Sesi Gabungan:\s*(.*?)\s*-\s*(\d+)\s*mnt\s*-\s*(Rp\s*[\d.]+)\]/i);
              if (comboMatch) {
                return `<span class="service-item-line">• <b>${comboMatch[1].trim()}</b> — ${comboMatch[2]} mnt — ${comboMatch[3].trim()}</span>`;
              }
              const legacyComboMatch = clean.match(/\[Sesi Gabungan:\s*(.*?)\s*-\s*(Rp\s*[\d.]+)\]/i);
              if (legacyComboMatch) {
                const comboName = legacyComboMatch[1].trim();
                const savedRule = (Array.isArray(siteSettings.sessionCombinations) ? siteSettings.sessionCombinations : [])
                  .find(rule => String(rule?.name || '').trim() === comboName);
                const legacyDuration = clean.match(/\[DURASI EFEKTIF:\s*(\d+)\s*mnt\]/i);
                const durationValue = Number(savedRule?.duration) || (legacyDuration ? Number(legacyDuration[1]) : 0);
                const durationText = durationValue ? `${durationValue} mnt` : "Durasi tidak tercatat";
                return `<span class="service-item-line">• <b>${comboName}</b> — ${durationText} — ${legacyComboMatch[2].trim()}</span>`;
              }
              clean = clean.replace(/\s*\[DURASI EFEKTIF:\s*\d+\s*mnt\]/i, "").trim();
              return clean ? `<span class="service-item-line">• ${clean}</span>` : "";
            }).filter(Boolean).join("");

            tableHtml += `
                            <tr class="${rowStatusClass}">
                                <td style="text-align:center"><input type="checkbox" class="admin-booking-select" value="${itemId}" ${selectedAdminBookingIds.has(String(itemId)) ? "checked" : ""} onchange="toggleAdminBookingSelection('${itemId}',this.checked)"></td>
                                <td>
                                    <select class="table-status-select" onchange="handleStatusCheckAndChange(this, '${itemId}')">
                                        <option value="Pending" ${st === "Pending" ? "selected" : ""}>⏳ Pending</option>
                                        <option value="Diterima" ${st === "Diterima" ? "selected" : ""}>✅ Diterima</option>
                                        <option value="Selesai" ${st === "Selesai" ? "selected" : ""}>✨ Selesai</option>
                                        <option value="Ditolak" ${st === "Ditolak" ? "selected" : ""}>❌ Ditolak</option>
                                    </select>
                                </td>
                                <td style="font-weight: 700; color: #111827; white-space: nowrap;">
                                    ${timeDisplay}
                                </td>
                                <td style="white-space: nowrap; width: max-content;">
                                    ${servicesLinesHtml || "-"}
                                </td>
                                <td style="font-weight: 600; color: #111827; white-space: nowrap;">
                                    ${itemName}
                                </td>
                                <td style="text-align: center;">
                                    ${proofAction}
                                </td>
                                <td style="white-space: nowrap;">
                                    <a href="https://wa.me/${itemPhone}" target="_blank" style="color: #0b7285; text-decoration: none; font-weight: 600; font-size: 0.75rem; display: inline-flex; align-items: center; gap: 4px;">
                                        <i class="fa-brands fa-whatsapp" style="font-size: 0.85rem; color: #25d366;"></i> ${itemPhone}
                                    </a>
                                </td>
                                <td>
                                    ${reasonText}
                                </td>
                            </tr>
                        `;
          });

          tableHtml += `
                            </tbody>
                        </table>
                    </div>
                `;
          dateSectionDiv.innerHTML += tableHtml;
          container.appendChild(dateSectionDiv);
          updateAdminDeleteControls();
        });
      }

      function getCurrentlyFilteredAdminBookings() {
        let searchKeyword = document.getElementById("adminSearchInput") ? document.getElementById("adminSearchInput").value.toLowerCase().trim() : "";
        let startDate = document.getElementById("filterStartDate").value, endDate = document.getElementById("filterEndDate").value;
        let todayStr = getLocalTodayStr(), tomorrowDate = new Date(); tomorrowDate.setDate(tomorrowDate.getDate()+1);
        let tomorrowStr = `${tomorrowDate.getFullYear()}-${String(tomorrowDate.getMonth()+1).padStart(2,"0")}-${String(tomorrowDate.getDate()).padStart(2,"0")}`;
        return rawAdminBookingsCache.filter(item => {
          let name=(item.nama||item.name||"").toLowerCase(), phone=cleanPhone(item.whatsapp||item.phone).toLowerCase();
          if(!(name.includes(searchKeyword)||phone.includes(searchKeyword))) return false;
          let timeVal=item.waktu||item.datetime||""; if(!timeVal)return false; let dateKey=getStandardDateKey(timeVal);
          if(currentAdminDateFilter==="today")return dateKey===todayStr;
          if(currentAdminDateFilter==="tomorrow")return dateKey===tomorrowStr;
          if(currentAdminDateFilter==="custom")return (!startDate||dateKey>=startDate)&&(!endDate||dateKey<=endDate);
          return true;
        });
      }
      function toggleAdminBookingSelection(id, checked){ if(checked)selectedAdminBookingIds.add(String(id));else selectedAdminBookingIds.delete(String(id)); updateAdminDeleteControls(); }
      function toggleSelectVisibleBookings(checked){ getCurrentlyFilteredAdminBookings().forEach(item=>{let id=String(item.id);if(checked)selectedAdminBookingIds.add(id);else selectedAdminBookingIds.delete(id);}); renderFilteredAdminBookings(); }
      function updateAdminDeleteControls(){ let count=selectedAdminBookingIds.size, btn=document.getElementById("adminDeleteSelectedBtn");if(btn)btn.textContent=`🗑 Hapus Dipilih (${count})`; }
      async function deleteAdminBookings(ids, mode){
        ids=[...new Set(ids.map(String).filter(Boolean))]; if(!ids.length){showToast("Pilih booking yang akan dihapus.","warning");return;}
        let confirmText=mode==="visible"?`Hapus ${ids.length} transaksi yang sedang tampil?`:`Hapus ${ids.length} transaksi terpilih?`;
        if(!confirm(confirmText+"\nData yang dihapus tidak dapat dikembalikan."))return;
        try{let response=await supabaseFetch(SCRIPT_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"deleteBookings",ids})});let result=await response.json();if(!response.ok||result.status!=="success")throw new Error(result.message||"Gagal menghapus transaksi");
          rawAdminBookingsCache=rawAdminBookingsCache.filter(item=>!ids.includes(String(item.id)));ids.forEach(id=>selectedAdminBookingIds.delete(id));renderFilteredAdminBookings();updateAdminDeleteControls();showToast(`✓ ${ids.length} transaksi berhasil dihapus`);
        }catch(err){showToast(err.message||"Gagal menghapus transaksi.","warning");}
      }
      function deleteSelectedAdminBookings(){deleteAdminBookings([...selectedAdminBookingIds],"selected");}
      function deleteVisibleAdminBookings(){deleteAdminBookings(getCurrentlyFilteredAdminBookings().map(item=>item.id),"visible");}

      function filterAdminBookings() {
        renderFilteredAdminBookings();
      }

      let currentHistoryMode = "daily";

      function setHistoryMode(mode, btnElement) {
        currentHistoryMode = mode;
        document
          .querySelectorAll("#admin-tab-history .tab-btn")
          .forEach((btn) => btn.classList.remove("active-tab"));
        btnElement.classList.add("active-tab");

        let label = document.getElementById("historyInputLabel");
        if (mode === "daily") label.innerText = "Pilih Tanggal:";
        else if (mode === "weekly")
          label.innerText = "Pilih Tanggal (Dalam Minggu Tersebut):";
        else if (mode === "monthly") label.innerText = "Pilih Bulan & Tahun:";
        else if (mode === "yearly") label.innerText = "Pilih Tahun:";

        renderHistoryReport();
      }

      function renderHistoryReport() {
        let container = document.getElementById("historyReportContainer");
        let dateVal = document.getElementById("historyDateInput").value;
        let histDisplayEl = document.getElementById("historyDateDisplay");
        if (histDisplayEl) {
          if (dateVal) {
            histDisplayEl.style.display = "block";
            histDisplayEl.innerHTML = `📅 <b>${formatIndonesianDateTitle(dateVal)}</b>`;
          } else {
            histDisplayEl.style.display = "none";
          }
        }
        if (!dateVal) {
          container.innerHTML = `<p style="font-size:0.8rem; color:var(--text-muted); text-align:center;">Pilih tanggal terlebih dahulu.</p>`;
          return;
        }

        const statusFilterEl = document.getElementById("historyStatusFilter");
        const selectedHistoryStatus = statusFilterEl ? statusFilterEl.value : "all";

        // Tampilan riwayat dibuat ringkas: nama layanan/sesi tetap terlihat,
        // sedangkan harga per layanan dan penanda durasi efektif disembunyikan.
        const cleanHistoryServiceText = (servicePart) => {
          let clean = String(servicePart || "").replace(/^C\d+:\s*/, "").trim();
          const comboNames = [...clean.matchAll(/\[Sesi Gabungan:\s*(.*?)\s*(?:-\s*\d+\s*mnt\s*)?-\s*Rp\s*[\d.]+\]/gi)]
            .map(match => match[1].trim())
            .filter(Boolean);
          clean = clean.replace(/\s*\[Sesi Gabungan:[^\]]*\]/gi, "");
          clean = clean.replace(/\s*\[DURASI EFEKTIF:\s*\d+\s*mnt\s*\]/gi, "");
          clean = clean.replace(/\s*\(\s*\d+\s*mnt\s*-\s*Rp\s*[\d.]+\s*\)/gi, "");
          clean = clean.replace(/\s*\(\s*Rp\s*[\d.]+\s*\)/gi, "");
          clean = clean.replace(/\s*\(\s*\d+\s*mnt\s*\)/gi, "");
          clean = clean.replace(/\s+/g, " ").replace(/^[,;\s]+|[,;\s]+$/g, "").trim();
          if (comboNames.length) clean += `${clean ? " · " : ""}Sesi Gabungan: ${comboNames.join(", ")}`;
          return clean;
        };

        let filtered = rawAdminBookingsCache.filter((item) => {
          // Filter status diterapkan bersamaan dengan periode tanggal.
          const itemStatus = String(item.status || "Pending").trim().toLowerCase();
          if (
            selectedHistoryStatus !== "all" &&
            itemStatus !== selectedHistoryStatus.toLowerCase()
          ) return false;

          let timeVal = item.waktu || item.datetime || "";
          if (!timeVal) return false;
          let bDateStr = getStandardDateKey(timeVal);
          let bDate = parseSafeDateTime(timeVal);
          let targetDate = parseSafeDateTime(dateVal);
          if (!bDate || !targetDate) return false;

          if (currentHistoryMode === "daily") {
            return bDateStr === dateVal;
          } else if (currentHistoryMode === "weekly") {
            let diffTime = Math.abs(bDate.getTime() - targetDate.getTime());
            let diffDays = diffTime / (1000 * 60 * 60 * 24);
            return (
              diffDays <= 3.5 &&
              bDate <= new Date(targetDate.getTime() + 3.5 * 86400000) &&
              bDate >= new Date(targetDate.getTime() - 3.5 * 86400000)
            );
          } else if (currentHistoryMode === "monthly") {
            return bDateStr.substring(0, 7) === dateVal.substring(0, 7);
          } else if (currentHistoryMode === "yearly") {
            return bDateStr.substring(0, 4) === dateVal.substring(0, 4);
          }
          return false;
        });

        if (filtered.length === 0) {
          const statusLabel = selectedHistoryStatus === "all"
            ? ""
            : ` dengan status ${selectedHistoryStatus}`;
          container.innerHTML = `<p style="font-size:0.8rem; color:var(--text-muted); text-align:center; padding:15px;">Tidak ada riwayat${statusLabel} pada periode ini.</p>`;
          return;
        }

        let groupedByDate = {};
        let serviceStats = {};
        let totalRevenue = 0;

        filtered.forEach((item) => {
          let timeVal = item.waktu || item.datetime || "";
          let dateKey = getStandardDateKey(timeVal) || "Lainnya";
          if (!groupedByDate[dateKey]) groupedByDate[dateKey] = [];
          groupedByDate[dateKey].push(item);

          let rawTotal = item.total || item.totalPrice || "0";
          let numericTotal =
            parseInt(rawTotal.toString().replace(/\D/g, "")) || 0;
          totalRevenue += numericTotal;

          let rawService = item.layanan || item.service || "";
          rawService.split(/\s*\|\s*/).forEach((part) => {
            let cleanName = cleanHistoryServiceText(part);
            if (cleanName) {
              serviceStats[cleanName] = (serviceStats[cleanName] || 0) + 1;
            }
          });
        });

        let html = `<div style="display: flex; flex-direction: column; gap: 12px;">`;

        let sortedHistoryDates = Object.keys(groupedByDate).sort((a, b) => {
          let dA = parseSafeDateTime(a);
          let dB = parseSafeDateTime(b);
          return (dA ? dA.getTime() : 0) - (dB ? dB.getTime() : 0);
        });

        sortedHistoryDates.forEach((dateKey) => {
          let dateTitle = formatIndonesianDateTitle(dateKey);

          groupedByDate[dateKey].sort((a, b) => {
            let timeA = parseSafeDateTime(a.waktu || a.datetime);
            let timeB = parseSafeDateTime(b.waktu || b.datetime);
            return (
              (timeA ? timeA.getTime() : 0) - (timeB ? timeB.getTime() : 0)
            );
          });

          html += `<div style="background: rgba(0,0,0,0.25); border:1px solid var(--border); border-radius:10px; padding:8px;">
                    <div style="font-size:0.8rem; font-weight:bold; color:var(--accent); margin-bottom:6px;">📅 ${dateTitle}</div>`;

          groupedByDate[dateKey].forEach((item) => {
            let itemName = item.nama || item.name || "-";
            let itemPhone = cleanPhone(item.whatsapp || item.phone);
            let rawService = item.layanan || item.service || "";

            let rawTotal = item.total || item.totalPrice || "0";
            let numericTotal = rawTotal.toString().replace(/\D/g, "");
            let formattedItemTotal = numericTotal
              ? formatRupiah(parseInt(numericTotal))
              : "Rp 0";

            let timeRange = formatDateTimeRange(
              item.waktu || item.datetime,
              rawService,
            );
            let timeOnly = timeRange.includes("(")
              ? timeRange.split("(")[1].replace(")", "").split("-")[0]
              : timeRange;

            let serviceParts = rawService.split(/\s*\|\s*/);
            let simplifiedServices = serviceParts
              .map((part) => cleanHistoryServiceText(part))
              .filter(Boolean)
              .join(" + ");

            html += `<div style="font-size:0.75rem; border-top:1px solid rgba(255,255,255,0.15); padding-top:6px; margin-top:4px; display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <b>🕒 ${timeOnly}</b> | <b>${itemName}</b> (<a href="https://wa.me/${itemPhone}" target="_blank" style="color:var(--accent); text-decoration:none;"><i class="fa-brands fa-whatsapp"></i> ${itemPhone}</a>)<br>
                            <span style="color:var(--text-muted); font-size:0.7rem;">Layanan: ${simplifiedServices}</span>
                        </div>
                        <div style="font-weight:bold; color:var(--accent); font-size:0.8rem; flex-shrink:0; margin-left:8px;">${formattedItemTotal}</div>
                    </div>`;
          });
          html += `</div>`;
        });

        html += `<div style="background: rgba(255,255,255,0.06); border:1px solid var(--border); border-radius:10px; padding:10px; margin-top:5px;">
                <div style="font-size:0.85rem; font-weight:bold; color:var(--accent); margin-bottom:6px;">📊 Statistik Layanan</div>`;
        for (let sName in serviceStats) {
          html += `<div style="font-size:0.75rem; display:flex; justify-content:space-between; padding:2px 0; border-bottom:1px dashed rgba(255,255,255,0.15);">
                    <span>${sName}</span>
                    <b>${serviceStats[sName]}x digunakan</b>
                </div>`;
        }
        html += `</div>`;

        html += `<div class="total-box" style="margin-top:5px; padding:10px; font-size:0.9rem;">
                <span>Total Pendapatan:</span>
                <span style="color:var(--accent);">${formatRupiah(totalRevenue)}</span>
            </div>`;

        html += `</div>`;
        container.innerHTML = html;
      }

      async function handleStatusCheckAndChange(selectElement, id) {
        let newStatus = selectElement.value;

        if (newStatus === "Ditolak") {
          // Memanggil Modal Prompt Modern khusus untuk mengisi alasan penolakan
          showPromptModal(
            "Tolak Pesanan",
            "Masukkan alasan penolakan pesanan ini:",
            "Contoh: Jadwal penuh...",
            function (reason) {
              executeStatusUpdate(id, newStatus, reason);
            },
          );
          return;
        }

        // Jika status lain (Pending, Diterima, Selesai), langsung eksekusi
        executeStatusUpdate(id, newStatus, "");
      }

      // Fungsi khusus untuk mengirim pembaruan status ke Google Sheets
      async function executeStatusUpdate(id, newStatus, reason) {
        try {
          await supabaseFetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "updateStatus",
              id: id,
              status: newStatus,
              reason: reason,
            }),
          });
          showToast("Status berhasil diperbarui!", "success");
          loadAdminTable();
        } catch (e) {
          showToast("Gagal memperbarui status.", "error");
          loadAdminTable();
        }
      }
    
