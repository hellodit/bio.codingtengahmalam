# Komponen MDC Custom

Komponen-komponen ini digunakan untuk memperkaya konten markdown produk dengan komponen Vue yang interaktif.

## Komponen yang Tersedia

### SneakPeek

Menampilkan galeri gambar preview produk dengan modal untuk melihat gambar secara detail.

**Penggunaan:**
```markdown
::sneak-peek
productName="Nama Produk"
images="/path/to/image1.png,/path/to/image2.png,/path/to/image3.png"
::
```

**Props:**
- `productName` (string, optional): Nama produk yang ditampilkan sebagai judul
- `images` (string atau array): Daftar path gambar yang dipisahkan koma, atau array string

### FeatureGrid

Menampilkan grid fitur produk dengan ikon checkmark.

**Penggunaan:**
```markdown
::feature-grid
columns=2
items='[{"title":"Fitur 1","description":"Deskripsi fitur 1"},{"title":"Fitur 2","description":"Deskripsi fitur 2"}]'
::
```

**Props:**
- `columns` (number, default: 2): Jumlah kolom grid (1, 2, 3, atau 4)
- `items` (string JSON atau array): Array objek dengan properti `title` dan `description`

## Lokasi Komponen

Semua komponen MDC berada di folder `app/components/mdc/`. Komponen akan otomatis terdeteksi oleh MDC dengan nama kebab-case (misalnya `SneakPeek.vue` menjadi `::sneak-peek`).

## Menambahkan Komponen Baru

1. Buat file Vue di `app/components/mdc/YourComponent.vue`
2. Komponen akan otomatis tersedia dengan nama `::your-component` di markdown
3. Gunakan `<MDCSlot />` jika perlu unwrap elemen wrapper dari markdown

## Catatan

- Komponen MDC menggunakan sintaks `::component-name` bukan JSX `<ComponentName>`
- Props bisa berupa string sederhana atau JSON string untuk data kompleks
- Komponen mendukung dark mode melalui Nuxt UI
