# Phase 2 — Modern Software Engineering

Fase kedua ini membahas konsep software engineering modern yang esensial untuk dipahami — dari Technical Debt hingga MoM. Istilah-istilah ini memberimu bahasa yang tepat untuk berkomunikasi dengan sesama engineer.

---

## Phase 2 — Modern Software Engineering

### Technical Debt

<Intuition>
Bayangkan kamu meminjam uang untuk membangun rumah cepat, tapi dengan bahan murah. Rumahnya tampak bagus sekarang, tapi nanti kamu akan membayar lebih untuk memperbaiki retakan. Itu "technical debt" — tapi untuk kode, bukan uang.
</Intuition>

<Theory>
Biaya tambahan yang akan kamu bayar nanti, karena kode dibangun dengan cepat dan tidak hati-hati pada awalnya. Seperti utang finansial, technical debt menumpuk bunga — semakin lama kamu menunda memperbaikinya, semakin mahal biayanya.
</Theory>

<Example>
Sebuah tim membangun aplikasi cepat menggunakan kode yang dihasilkan AI tanpa memeriksanya dengan hati-hati. Kemudian, aplikasi menjadi lambat, penuh bug, dan sulit diperbarui. Pekerjaan ekstra untuk memperbaikinya nanti = technical debt.
</Example>

<Conclusion>
Banyak startup gagal bukan karena idenya buruk, tapi karena technical debt menjadi terlalu berat untuk dikelola. Kode menjadi begitu kusut sehingga setiap fitur baru merusak sesuatu yang lain.
</Conclusion>

**🦊 Opportunist Lens:** Jika pesaingmu tenggelam dalam technical debt, mereka akan melambat sementara kamu bisa bergerak lebih cepat — jika kodemu lebih bersih. Technical debt adalah senjata kompetitif tersembunyi.

---

### Service

<Intuition>
Pikirkan dapur restoran. Satu stasiun hanya membuat minuman. Stasiun lain hanya membuat makanan penutup. Dalam software, "service" seperti satu stasiun — satu pekerjaan yang jelas.
</Intuition>

<Theory>
Bagian dari sistem software yang menangani satu pekerjaan spesifik — misalnya: "payment service" hanya menangani pembayaran, "login service" hanya menangani login pengguna. Services dirancang untuk independen.
</Theory>

<Example>
Aplikasi toko online mungkin memiliki: Product Service, Payment Service, dan Delivery Service — masing-masing terpisah.
</Example>

<Conclusion>
Developer yang baik memahami bagaimana services terhubung satu sama lain — itu adalah pengetahuan engineering inti, bukan sesuatu yang digantikan AI. AI bisa menghasilkan kode untuk service individu, tapi manusia yang mendesain bagaimana mereka berkomunikasi.
</Conclusion>

**🦊 Opportunist Lens:** Jika kamu hanya tahu cara mengklik "generate" di alat AI tapi tidak memahami bagaimana services terhubung, kamu akan macet di proyek nyata yang kompleks. Investasi dalam memahami desain service-oriented memposisikanmu di minoritas kecil developer yang bisa mengarsiteki sistem nyata.

---

### Business Logic

<Intuition>
Business logic adalah "buku aturan" di belakang aplikasi. Misalnya: "kode diskon hanya bisa digunakan sekali per pengguna" — aturan itu adalah business logic, bukan hanya kode.
</Intuition>

<Theory>
Aturan dan keputusan yang membuat aplikasi berperilaku benar untuk bisnis nyata — "mengapa" di balik kode, bukan hanya "bagaimana." Business logic menjawab pertanyaan seperti: siapa yang diizinkan melakukan apa? kapan diskon berlaku? apa yang terjadi jika pembayaran gagal?
</Theory>

<Example>
Seorang komentar menggambarkan teman: dia memahami business logic dengan baik (dari pengalaman coding manual), tapi setelah mendapat alat AI cepat, dia berhenti mau belajar bagaimana setiap service benar-benar bekerja.
</Example>

<Conclusion>
Memahami business logic adalah yang membedakan engineer sejati dari seseorang yang hanya menyalin output AI. AI bisa menulis kode yang syntactically correct, tapi tidak bisa mengetahui aturan spesifik bisnismu.
</Conclusion>

**🦊 Opportunist Lens:** Orang yang sangat memahami business logic tidak perlu menjadi full-time coder. Mereka bisa bermitra dengan orang teknis dan tetap berharga melalui pemahaman mereka, bukan kecepatan mengetik.

---

### Workflow (in engineering)

<Intuition>
Lihat "AI Workflow" di Phase 1 — konsep intinya sama, tapi di sini juga berarti langkah teknis di dalam sistem software, seperti: request masuk → cek user → simpan data → kirim konfirmasi.
</Intuition>

<Theory>
Dalam konteks engineering, workflow adalah urutan langkah yang diikuti oleh sistem atau pengguna untuk menyelesaikan suatu proses bisnis.
</Theory>

<Example>
Workflow pendaftaran pengguna: user mengisi form → sistem validasi → kirim email verifikasi → user verifikasi → sistem aktifkan akun.
</Example>

<Conclusion>
Workflow yang baik membuat sistem mudah dipahami dan diubah. Workflow yang buruk membuat proses jadi kacau dan sulit di-debug.
</Conclusion>

**🦊 Opportunist Lens:** Mendesain workflow yang efisien adalah skill yang terus berharga, tidak peduli alat apa yang sedang tren.

---

### Architecture

<Intuition>
Jika kode seperti bangunan, architecture adalah blueprint — bagaimana ruangan (services) terhubung, di mana tangga berada, di mana pipa-pipa berada.
</Intuition>

<Theory>
Struktur keseluruhan dan desain bagaimana bagian-bagian sistem software saling cocok. Architecture adalah keputusan tingkat tinggi yang membentuk seluruh proyek: teknologi mana yang digunakan, bagaimana membagi sistem menjadi services, bagaimana data mengalir antar komponen.
</Theory>

<Example>
Memilih untuk membagi aplikasi menjadi service-service kecil yang independen (daripada satu file raksasa) adalah keputusan architecture.
</Example>

<Conclusion>
Alat AI semakin baik dalam menulis kode, tapi keputusan architecture masih membutuhkan judgment dan pengalaman manusia. AI tidak bisa mengevaluasi trade-off antara pendekatan arsitektur yang berbeda untuk konteks spesifikmu.
</Conclusion>

**🦊 Opportunist Lens:** Skill architecture adalah salah satu hal tersulit untuk digantikan AI sepenuhnya. Investasi waktu di sini memberimu keuntungan jangka panjang.

---

### Prototype

<Intuition>
Prototype seperti sketsa kertas rumah sebelum konstruksi nyata — cukup baik untuk menunjukkan ide, tidak cukup baik untuk benar-benar ditinggali.
</Intuition>

<Theory>
Versi awal, sederhana, dan kasar dari sebuah produk — dibangun untuk menguji atau menunjukkan ide, tidak dimaksudkan sebagai produk akhir. Prototype memprioritaskan kecepatan di atas kualitas.
</Theory>

<Example>
Seseorang yang kuat dalam business logic harus menggunakan "vibe coding" hanya untuk membuat prototype — untuk menunjukkan alur dan ide ke partner programmer nyata, bukan sebagai aplikasi final.
</Example>

<Conclusion>
Prototype sangat berguna untuk komunikasi (menunjukkan ide), tapi berisiko sebagai fondasi permanen. Banyak proyek gagal karena "prototype cepat" yang tidak pernah dibangun ulang.
</Conclusion>

**🦊 Opportunist Lens:** Prototyping cepat dengan AI memberimu keunggulan dalam menyampaikan ide dengan cepat — tapi selalu rencanakan untuk membangun ulang dengan benar sebelum scaling.

---

### Maintainability

<Intuition>
Lemari yang terorganisir dengan baik mudah dibersihkan dan diperbarui. Lemari berantakan penuh barang acak sulit diperbaiki, bahkan untuk perubahan kecil.
</Intuition>

<Theory>
Seberapa mudah untuk memperbarui, memperbaiki, atau meningkatkan software setelah dibangun. Maintainability tinggi berarti developer baru bisa bergabung dan membuat perubahan dalam hitungan jam, bukan minggu.
</Theory>

<Example>
Kode dengan nama yang jelas dan struktur bersih mudah di-maintain. Kode AI yang berantakan, copy-paste tanpa struktur sulit di-maintain.
</Example>

<Conclusion>
Maintainability rendah adalah salah satu biaya tersembunyi terbesar dari coding AI yang cepat dan ceroboh (vibe coding). Kode bekerja hari ini, tapi setiap fungsi yang tidak jelas namanya menjadi ranjau untuk besok.
</Conclusion>

**🦊 Opportunist Lens:** Tim dengan maintainability buruk melambat seiring waktu. Jika kodemu tetap maintainable, kamu bisa bergerak lebih cepat dari pesaing dalam jangka panjang.

---

### Scalability

<Intuition>
Warung kecil bisa melayani 20 pelanggan sehari dengan mudah. Tapi bisakah melayani 20.000 pelanggan sehari, dengan pengaturan yang sama? Jika tidak, itu tidak scalable.
</Intuition>

<Theory>
Kemampuan sistem untuk terus bekerja dengan baik saat permintaan bertambah (lebih banyak pengguna, lebih banyak data, lebih banyak traffic). Sistem yang scalable menangani 1 pengguna dan 1 juta pengguna dengan arsitektur yang sama.
</Theory>

<Example>
Aplikasi yang bekerja baik dengan 10 pengguna tapi crash dengan 10.000 pengguna memiliki masalah scalability.
</Example>

<Conclusion>
Arsitektur yang baik dari awal membuat scaling jauh lebih mudah nanti. Kamu tidak perlu over-engineer untuk sejuta pengguna di hari pertama, tapi hindari pilihan desain yang membuat scaling tidak mungkin.
</Conclusion>

**🦊 Opportunist Lens:** Jika aplikasi pesaing crash saat tiba-tiba populer, dan aplikasimu tidak, kamu menang di momen itu.

---

### Vibe Coding

<Intuition>
Bayangkan memasak tanpa resep, hanya mencicipi dan menyesuaikan sambil jalan, tanpa benar-benar memahami kimia memasak. Mungkin rasanya enak hari ini, tapi kamu tidak bisa mengulanginya dengan andal.
</Intuition>

<Theory>
Membangun software dengan meminta AI untuk menghasilkan kode, tanpa memahami logika di baliknya — hanya memeriksa "apakah berjalan?" Istilah "vibe coding" menangkap pendekatan berbasis perasaan: kamu tidak memikirkan arsitektur, keamanan, atau maintainability.
</Theory>

<Example>
Sebuah komentar berbagi pengalaman nyata: banyak perusahaan yang menggunakan vibe coding memiliki website yang bisa diserang dengan mudah (DoS), karena kode tidak pernah diperiksa dengan benar.
</Example>

<Conclusion>
Vibe coding adalah peningkatan produktivitas nyata untuk prototype, tapi berisiko sebagai basis permanen dari produk atau bisnis nyata.
</Conclusion>

**🦊 Opportunist Lens:** Orang yang memahami fundamental DAN bisa vibe coding cepat akan mengalahkan orang yang hanya vibe coding. Fast + correct beats fast + fragile.

---

### Refactoring

<Intuition>
Seperti merapikan kamar yang berantakan — kamu tidak menambahkan furnitur baru, kamu hanya mengatur apa yang sudah ada agar lebih bersih dan mudah digunakan.
</Intuition>

<Theory>
Memperbaiki struktur internal kode tanpa mengubah apa yang dilakukannya dari luar. Refactoring mengurangi kompleksitas, menghilangkan duplikasi, dan membuat kode lebih mudah dibaca dan dimodifikasi di masa depan.
</Theory>

<Example>
Mengambil fungsi besar yang berantakan dan membaginya menjadi bagian-bagian kecil yang lebih jelas — aplikasi masih bekerja sama, tapi kode lebih mudah dipahami.
</Example>

<Conclusion>
Refactoring kecil yang teratur jauh lebih aman dan lebih murah daripada menunggu sampai kode menjadi kekacauan besar. Tim yang baik mengikuti "boy scout rule" — tinggalkan kode lebih bersih dari saat kamu menemukannya.
</Conclusion>

**🦊 Opportunist Lens:** Proyek yang tidak pernah refactoring akhirnya menjadi "terlalu menakutkan untuk disentuh." Jika kamu menjaga kodemu bersih, kamu bisa bergerak lebih cepat dari tim yang macet dengan kode lama yang berantakan.

---

### Documentation

<Intuition>
Seperti buku petunjuk untuk furnitur — tanpa itu, hanya orang yang membuatnya yang tahu cara kerjanya. Dengan itu, siapa pun bisa memahami dan menggunakannya.
</Intuition>

<Theory>
Catatan tertulis yang menjelaskan bagaimana sistem, kode, atau proses bekerja, sehingga orang lain (atau kamu di masa depan) bisa memahaminya. Dokumentasi yang baik menjawab pertanyaan yang tidak bisa dijawab oleh kode itu sendiri.
</Theory>

<Example>
Seseorang dalam diskusi menyebutkan menggunakan AI untuk membantu membuat dokumentasi sebagai bagian dari workflow pribadi mereka.
</Example>

<Conclusion>
Alat AI membuat penulisan dokumentasi jauh lebih cepat sekarang, jadi tidak ada alasan untuk melewatkannya. Biaya waktu dokumentasi telah turun drastis.
</Conclusion>

**🦊 Opportunist Lens:** Tim (atau orang) dengan dokumentasi yang baik bergerak lebih cepat seiring waktu, karena mereka tidak membuang waktu untuk menjelaskan ulang hal yang sama berulang kali.

---

### MoM (Minutes of Meeting)

<Intuition>
Seperti foto ringkasan rapat — daripada mengingat semuanya dari ingatan, kamu memiliki catatan tertulis tentang apa yang dibahas dan diputuskan.
</Intuition>

<Theory>
"MoM" adalah singkatan dari **Minutes of Meeting** — ringkasan tertulis tentang apa yang dibahas dan diputuskan dalam rapat. MoM yang baik menangkap keputusan kunci, item tindakan, dan tenggat waktu.
</Theory>

<Example>
Seseorang menggambarkan menggunakan AI untuk secara otomatis membuat MoM sebagai bagian dari workflow asisten pribadi mereka.
</Example>

<Conclusion>
AI sekarang bisa mendengarkan rekaman rapat dan menulis MoM yang bersih secara otomatis — penghemat waktu besar. Alat seperti Otter.ai, Fireflies, dan fitur AI bawaan di platform rapat bisa mentranskripsi dan menghasilkan ringkasan terstruktur.
</Conclusion>

**🦊 Opportunist Lens:** Jika kamu adalah orang yang selalu memiliki MoM yang bersih, kamu secara alami menjadi orang yang dipercaya orang lain untuk mengingat keputusan dengan benar.

---

## Flashcards

<Flashcard front="Technical Debt" back="Biaya tambahan di masa depan karena kode dibangun cepat dan tidak hati-hati." />
<Flashcard front="Service" back="Bagian sistem yang menangani satu pekerjaan spesifik, seperti payment service." />
<Flashcard front="Business Logic" back="Aturan dan keputusan yang membuat aplikasi berperilaku benar untuk bisnis nyata." />
<Flashcard front="Architecture" back="Struktur keseluruhan bagaimana bagian-bagian sistem software saling cocok." />
<Flashcard front="Prototype" back="Versi awal dan sederhana dari produk untuk menguji ide, bukan untuk dipakai final." />
<Flashcard front="Maintainability" back="Seberapa mudah memperbarui, memperbaiki, atau meningkatkan software setelah dibangun." />
<Flashcard front="Scalability" back="Kemampuan sistem untuk tetap bekerja baik saat pengguna atau data bertambah." />
<Flashcard front="Vibe Coding" back="Membangun software dengan AI tanpa memahami logika di baliknya." />
<Flashcard front="Refactoring" back="Memperbaiki struktur internal kode tanpa mengubah apa yang dilakukannya." />
<Flashcard front="Documentation" back="Catatan tertulis yang menjelaskan bagaimana sistem, kode, atau proses bekerja." />
<Flashcard front="MoM" back="Minutes of Meeting — ringkasan tertulis tentang apa yang dibahas dan diputuskan dalam rapat." />

## Quiz

<Quiz question="Apa itu Technical Debt?" options='["Utang uang untuk membeli teknologi", "Biaya tambahan di masa depan karena kode dibangun cepat dan tidak hati-hati", "Lisensi software yang mahal", "Biaya hosting server"]' correctIndex="1" explanation="Technical debt adalah 'bunga' yang harus dibayar di masa depan karena kode dibangun dengan cepat dan ceroboh." />
<Quiz question="Mengapa memahami Business Logic penting dalam era AI?" options='["Karena AI tidak bisa menulis kode sama sekali", "Karena AI bisa menulis kode yang benar secara syntax tapi tidak tahu aturan bisnis spesifik", "Karena Business Logic adalah nama model AI baru", "Karena AI tidak perlu business logic"]' correctIndex="1" explanation="AI bisa menulis kode yang benar secara syntax, tapi tidak bisa mengetahui aturan bisnis spesifik perusahaanmu." />
<Quiz question="Apa perbedaan antara Prototype dan MVP?" options='["Tidak ada perbedaan", "Prototype untuk menunjukkan ide; MVP adalah produk sederhana yang benar-benar bekerja", "MVP untuk coding; Prototype untuk desain", "Prototype lebih kompleks dari MVP"]' correctIndex="1" explanation="Prototype hanya untuk menunjukkan ide, sementara MVP adalah produk nyata yang bisa digunakan oleh pengguna." />
