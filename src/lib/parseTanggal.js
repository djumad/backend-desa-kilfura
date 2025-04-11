export default function parseTanggal(tanggalStr) {
    const date = new Date(tanggalStr);
    if (isNaN(date)) throw new Error("Format tanggal tidak valid");
    return date;
}