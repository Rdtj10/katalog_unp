import { conn } from "./db-connection"; // Sesuaikan dengan lokasi koneksi database Anda
import { createReadStream } from "fs";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { judul, type } = req.conn;

  try {
    // Gantilah `your_table` dan `your_column` dengan nama tabel dan kolom yang sesuai
    const result = await conn(
      "SELECT abstrak FROM tb_koleksi WHERE judul_koleksi = ?",
      [judul]
    );

    if (result.length === 0 || !result[0].your_column) {
      return res.status(404).json({ error: "File not found" });
    }

    const pdfData = result[0].your_column;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=${type}.pdf`);
    createReadStream(pdfData).pipe(res);
  } catch (error) {
    console.error("Error fetching PDF:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
