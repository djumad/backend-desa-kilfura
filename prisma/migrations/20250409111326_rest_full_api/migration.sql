-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `foto` VARCHAR(100) NULL,
    `password` VARCHAR(100) NOT NULL,
    `token` TEXT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfilDesa` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `namaDesa` VARCHAR(100) NOT NULL,
    `logo` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SejarahDesa` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(100) NOT NULL,
    `foto` VARCHAR(100) NULL,
    `deskripsi` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Berita` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(100) NOT NULL,
    `deskripsi` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VisiMisi` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(100) NOT NULL,
    `foto` VARCHAR(100) NULL,
    `deskripsi` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PerangkatDesa` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `status` VARCHAR(100) NOT NULL,
    `profil` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DataPenduduk` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `tanggalLahir` DATETIME(3) NOT NULL,
    `pekerjaan` VARCHAR(191) NOT NULL,
    `jenisKelamin` VARCHAR(191) NOT NULL,
    `pendidikanTerakhir` VARCHAR(191) NOT NULL,
    `agama` VARCHAR(191) NOT NULL,
    `kartuKeluargaId` VARCHAR(191) NULL,
    `hubunganKeluarga` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KartuKeluarga` (
    `id` VARCHAR(191) NOT NULL,
    `nomorKK` VARCHAR(50) NOT NULL,
    `alamat` VARCHAR(255) NOT NULL,
    `rt` VARCHAR(10) NOT NULL,
    `rw` VARCHAR(10) NOT NULL,
    `desa` VARCHAR(100) NOT NULL,
    `kecamatan` VARCHAR(100) NOT NULL,
    `kabupaten` VARCHAR(100) NOT NULL,
    `provinsi` VARCHAR(100) NOT NULL,
    `kepalaKeluargaId` VARCHAR(191) NULL,

    UNIQUE INDEX `KartuKeluarga_nomorKK_key`(`nomorKK`),
    UNIQUE INDEX `KartuKeluarga_kepalaKeluargaId_key`(`kepalaKeluargaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KontakDesa` (
    `id` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `telepon` VARCHAR(20) NOT NULL,
    `whatsapp` VARCHAR(20) NOT NULL,
    `mapsUrl` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LembagaDesa` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `foto` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Galeri` (
    `id` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(100) NOT NULL,
    `foto` VARCHAR(100) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Agenda` (
    `id` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(100) NOT NULL,
    `lokasi` VARCHAR(100) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pengumuman` (
    `id` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(100) NOT NULL,
    `isi` TEXT NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransparansiAnggaran` (
    `id` VARCHAR(191) NOT NULL,
    `tahun` INTEGER NOT NULL,
    `pendapatan` DOUBLE NOT NULL,
    `belanja` DOUBLE NOT NULL,
    `rincian` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProdukUnggulan` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `foto` VARCHAR(100) NOT NULL,
    `harga` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PotensiDesa` (
    `id` VARCHAR(191) NOT NULL,
    `kategori` VARCHAR(100) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `foto` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AduanMasyarakat` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `isi` TEXT NOT NULL,
    `tanggal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL DEFAULT 'belum dibaca',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LayananSurat` (
    `id` VARCHAR(191) NOT NULL,
    `namaPemohon` VARCHAR(100) NOT NULL,
    `jenisSurat` VARCHAR(100) NOT NULL,
    `keterangan` TEXT NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'diajukan',
    `tanggal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProfilDesa` ADD CONSTRAINT `ProfilDesa_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SejarahDesa` ADD CONSTRAINT `SejarahDesa_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Berita` ADD CONSTRAINT `Berita_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VisiMisi` ADD CONSTRAINT `VisiMisi_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PerangkatDesa` ADD CONSTRAINT `PerangkatDesa_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DataPenduduk` ADD CONSTRAINT `DataPenduduk_kartuKeluargaId_fkey` FOREIGN KEY (`kartuKeluargaId`) REFERENCES `KartuKeluarga`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KartuKeluarga` ADD CONSTRAINT `KartuKeluarga_kepalaKeluargaId_fkey` FOREIGN KEY (`kepalaKeluargaId`) REFERENCES `DataPenduduk`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
