# cbartuk.com

Next.js + TypeScript + Tailwind tabanli personal portfolio.
Icerik yonetimi Sanity ile yapilir. Lokal JSON dosyasi sadece local snapshot/edit amaclidir.

## Kisa Ozet

Bu projede 3 icerik modu var:

- `sanity`: Her seyi Sanity'den oku.
- `json`: Her seyi `data/content.json` dosyasindan oku.
- `hybrid` (local workflow): JSON doluysa onu kullan, eksikse Sanity fallback.

Ayrica iki yonlu senkron var:

- Pull: `Sanity -> data/content.json`
- Push: `data/content.json -> Sanity`

## Kurulum

1. Bagimliliklari kur:

```bash
yarn install
```

2. `.env.local` olustur (`.env.example`i referans al):

```env
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
CONTENT_SOURCE=hybrid

# Push icin gerekli
SANITY_API_WRITE_TOKEN=your_write_token

# Opsiyonel (tehlikeli mod)
SANITY_SYNC_PRUNE=false
```

3. Gelistirme sunucusunu baslat:

```bash
yarn dev
```

Not:
- `yarn dev` oncesi otomatik pull calisir (best-effort) ve `data/content.json` guncellenir.
- Push otomatik degildir, manuel komutla yapilir.

## Senkron Komutlari

### 1) Sanity'den JSON'a cek (Pull)

```bash
yarn sync:content:pull
```

Ayni komutun alias'i:

```bash
yarn sync:content
```

### 2) JSON'dan Sanity'ye gonder (Push)

```bash
yarn sync:content:push
```

### 3) Cift yonlu tam senkron (Pull + Push)

```bash
yarn sync:content:roundtrip
```

### 4) Tam pipeline (Pull -> Enrich -> Push -> Verify)

```bash
yarn sync:content:pipeline
```

Bu pipeline lokal JSON'u senior odakli skill metadata ile zenginlestirir ve tekrar Sanity'ye yazar.

## Otomatik Senkron Davranisi

- `yarn dev` oncesi otomatik best-effort pull calisir (`predev`).
- Ag/credential yoksa bu pull dev'i bloklamaz.
- `yarn build` otomatik pull yapmaz (build asamasinda dosya mutasyonu olmasin diye).

## Sanity Studio ve Schema Deploy

Schema degisikligi yaptiysan (ornegin `skill` veya `project` alanlari):

1. Sanity login ol:

```bash
cd sanity
yarn sanity login
```

2. Studio'yu lokalde test et:

```bash
yarn dev
```

3. Studio'yu deploy et:

```bash
yarn deploy
```

### Unknown fields found hatasi

Sanity Studio'da su uyarayi gorursen:

- `Unknown fields found`
- `Encountered X fields that are not defined in the schema`

Anlami: Dataset'te alanlar var ama deploy edilen Studio schema'si eski.

Cozum:

1. `sanity/` altinda schema dosyalarinin guncel oldugunu kontrol et.
2. `yarn sanity login`
3. `yarn deploy`
4. Studio'yu yenile.

## Onemli Notlar

- `SANITY_SYNC_PRUNE=true` yaparsan, JSON'da olmayan dokumanlar Sanity'den silinir.
- Bu ayar varsayilan olarak `false` kalmali.
- Push icin mutlaka `SANITY_API_WRITE_TOKEN` gerekli.
- Token'i asla git'e commit etme.
- `data/content.json` generated dosyadir ve git'e pushlanmaz.

## Icerik Dosyasi

Lokal generated snapshot dosyasi:

- `data/content.json`

Template dosyasi:

- `data/content.example.json`

Workflow:
1. `yarn sync:content:pull`
2. `data/content.json` duzenle
3. `yarn sync:content:push`

## Studio

Sanity Studio `sanity/` altindadir:

```bash
cd sanity
yarn install
yarn dev
```

## Scriptler

```bash
yarn dev
yarn lint
yarn build
yarn start
yarn sync:content
yarn sync:content:pull
yarn sync:content:push
yarn sync:content:roundtrip
yarn sync:content:pipeline
```
