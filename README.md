# Beauty Bar Malang — struktur modular awal

## Struktur
- `index.html` — struktur halaman dan pemanggilan aset.
- `css/style.css` — seluruh CSS dari empat blok `<style>` asli, urutannya dipertahankan.
- `js/app.js` — JavaScript asli, dipindahkan utuh sebagai classic script agar fungsi global dan inline `onclick` tetap dapat diakses.
- `manifest.json` — metadata aplikasi web.

## Catatan kompatibilitas
Pemisahan ini hanya memindahkan CSS dan JavaScript keluar dari HTML. Isi aturan CSS dan kode JavaScript tidak dirombak. `app.js` sengaja dimuat sebagai classic script (bukan `type="module"`) karena halaman menggunakan fungsi global/inline event handler.

`manifest.json` adalah metadata PWA; file ini sendiri tidak mengaktifkan service worker atau offline cache.

## Menjalankan
Letakkan isi folder ini pada root hosting yang sama, sehingga `index.html`, `manifest.json`, `css/`, dan `js/` berada pada satu level. Uji pada staging terlebih dahulu sebelum mengganti website aktif.
