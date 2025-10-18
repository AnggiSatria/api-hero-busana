# Tugas Take-Home – Aplikasi Team Task Tracker

Terima kasih sudah melamar ke _Hero Busana_!  
Ini adalah tugas kecil untuk melihat kemampuan kamu dalam membangun aplikasi web sederhana secara end-to-end (frontend dan backend).  
Waktu pengerjaan: _1–3 hari_ sejak kamu menerima tugas ini.

---

## Latar Belakang

Seorang _Project Manager_ merasa kesulitan memantau apa saja yang sedang dikerjakan oleh anggota timnya.  
Selama ini, ia hanya mengandalkan chat dan catatan pribadi, sehingga sering kehilangan jejak siapa mengerjakan apa dan sejauh mana progresnya.

Untuk itu, ia ingin dibuatkan sebuah _Task Manager_ sederhana.  
Melalui aplikasi ini, ia bisa mencatat setiap tugas yang diberikan kepada anggota tim, lengkap dengan _tanggal dibuat, **tanggal mulai, dan **tanggal selesai_.  
Setiap tugas juga bisa diberi *status, seperti *Belum Dimulai, Sedang Dikerjakan, atau Selesai, agar mudah dipantau.

Untuk mencatat progres kerja dengan lebih detail, Project Manager juga ingin setiap tugas bisa memiliki _riwayat tugas_—misalnya saat tugas dimulai atau diselesaikan.  
Artinya, selain tabel utama _Task, aplikasi juga sebaiknya memiliki \*\*tabel kedua_ untuk mencatat setiap perubahan atau pergerakan tugas tersebut (misalnya _Task Log_).

Agar pencarian lebih cepat, ia ingin bisa _memfilter atau mencari task tertentu_ berdasarkan status tugas.  
Selain itu, ia juga berharap ada _dashboard ringkas_ yang menampilkan gambaran umum kinerja tim — misalnya berapa banyak task yang sedang berjalan, siapa yang paling aktif, atau metrik lain sesuai kreativitas kamu.

Karena sifatnya internal, aplikasi ini hanya boleh diakses oleh si Project Manager, jadi perlu ada _fitur login sederhana_ untuk membatasi akses.

---

## Ketentuan Teknis

| Bagian        | Ketentuan                                                                |
| ------------- | ------------------------------------------------------------------------ |
| _Frontend_    | React                                                                    |
| _Backend_     | PHP / Python / JavaScript (Node.js) — nilai plus jika menggunakan Python |
| _Database_    | JSON file atau PostgreSQL                                                |
| _Schema File_ | Jika pakai PostgreSQL, sertakan file .sql untuk membuat tabel            |
| _Dokumentasi_ | Dokumentasi simple cara run websitenya                                   |

---

## Tujuan Penilaian

Kamu tidak perlu mengikuti format tertentu — justru kami ingin melihat:

- Bagaimana kamu _memahami kebutuhan user_ di atas,
- Bagaimana kamu _merancang struktur data dan API_,
- Seberapa baik kamu _menata kode frontend/backend_,
- Dan bagaimana kamu menjelaskan hasil kerja kamu di README.

Bonus poin jika kamu:

- Membuat UI/UX yang rapi dan responsif
- Menyertakan pagination, validasi, atau struktur folder yang bersih
- Menggunakan komponen reusable

---

## Aturan Penggunaan AI

Penggunaan **AI tools (seperti ChatGPT, GitHub Copilot, atau sejenisnya)** diperbolehkan sebagai **alat bantu**, namun dengan ketentuan:

- Gunakan **secukupnya** untuk mempercepat proses, bukan menggantikan seluruh pekerjaan
- Kamu harus **memahami dan dapat menjelaskan** semua kode yang kamu submit
- Dilarang menyalin **100%** dari AI tanpa modifikasi atau pemahaman

Konsekuensi:

- Penggunaan AI 100% tanpa usaha pribadi = **Diskualifikasi**

Verifikasi:
Semua hasil diperiksa **manual** dan menggunakan **AI detection tools**. Kamu mungkin diminta menjelaskan kode saat review.

Catatan:
Tujuan tes adalah menilai kemampuan dan pemahamanmu — bukan kemahiran menggunakan AI. Kami menghargai **kejujuran dan proses belajar** lebih dari hasil yang "sempurna".

---

## Pengumpulan

Kirim hasil pengerjaan kamu dalam bentuk _repository GitHub_.

Pastikan repository tersebut berisi:

1. Seluruh source code frontend dan backend
2. File README.md yang menjelaskan cara menjalankan proyek
3. File schema.sql (jika menggunakan PostgreSQL)
4. Sudah di-push ke GitHub dan dapat diakses publik

_Catatan:_

- Tidak perlu mengirim file ZIP atau node_modules.
- Pastikan struktur folder dan commit history jelas, agar kami bisa memahami alur kerja kamu.

---

## Isi README Proyek

Pastikan di dalam proyek kamu ada file README.md yang menjelaskan:

1. Cara menjalankan proyek

   ```bash
   # Backend
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload

   # Frontend
   cd frontend
   npm install
   npm run dev
   ```
