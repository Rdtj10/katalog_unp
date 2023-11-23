import conn from './db-connection';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default async function handler(req, res) {
  const notify = () => toast("Gagal koneksi ke database");
  if (req.method === 'POST') {
    const { keyword, faculty, tahun } = req.body;
    let query;
    let values;
    if (tahun && faculty) {
      query = 'SELECT tb_koleksi.*, tb_jenis.jenis, tb_fakultas.nama_fakultas, tb_jurusan.nm_jur FROM tb_koleksi LEFT JOIN tb_jenis ON tb_koleksi.kd_jenis = tb_jenis.kd_jenis LEFT JOIN tb_fakultas ON tb_koleksi.kd_fakultas = tb_fakultas.kd_fakultas LEFT JOIN tb_jurusan ON tb_koleksi.kd_jur = tb_jurusan.kd_jur WHERE tb_koleksi.judul_koleksi LIKE ? AND tb_fakultas.nama_fakultas = ? AND tb_koleksi.tahun = ? ';
      values = [`%${keyword}%`, faculty, tahun];
    } else if(faculty){
      query = 'SELECT tb_koleksi.*, tb_jenis.jenis, tb_fakultas.nama_fakultas, tb_jurusan.nm_jur FROM tb_koleksi LEFT JOIN tb_jenis ON tb_koleksi.kd_jenis = tb_jenis.kd_jenis LEFT JOIN tb_fakultas ON tb_koleksi.kd_fakultas = tb_fakultas.kd_fakultas LEFT JOIN tb_jurusan ON tb_koleksi.kd_jur = tb_jurusan.kd_jur WHERE tb_koleksi.judul_koleksi LIKE ? AND tb_fakultas.nama_fakultas = ?';
      values = [`%${keyword}%`, faculty];
    } else if(tahun) {
      query = 'SELECT tb_koleksi.*, tb_jenis.jenis, tb_fakultas.nama_fakultas, tb_jurusan.nm_jur FROM tb_koleksi LEFT JOIN tb_jenis ON tb_koleksi.kd_jenis = tb_jenis.kd_jenis LEFT JOIN tb_fakultas ON tb_koleksi.kd_fakultas = tb_fakultas.kd_fakultas LEFT JOIN tb_jurusan ON tb_koleksi.kd_jur = tb_jurusan.kd_jur WHERE tb_koleksi.judul_koleksi LIKE ? AND tb_koleksi.tahun = ?';
      values = [`%${keyword}%`, tahun];
    } else {
      query = 'SELECT tb_koleksi.*, tb_jenis.jenis, tb_fakultas.nama_fakultas, tb_jurusan.nm_jur FROM tb_koleksi LEFT JOIN tb_jenis ON tb_koleksi.kd_jenis = tb_jenis.kd_jenis LEFT JOIN tb_fakultas ON tb_koleksi.kd_fakultas = tb_fakultas.kd_fakultas LEFT JOIN tb_jurusan ON tb_koleksi.kd_jur = tb_jurusan.kd_jur WHERE tb_koleksi.judul_koleksi LIKE ?';
      values = [`%${keyword}%`];
    }

    conn.query(query, values, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Terjadi kesalahan pada server' });
        toast.error('Terjadi kesalahan pada server', { position: toast.POSITION.TOP_LEFT });
        return;
      }
      toast.success('Pencarian Berhasil!', { position: toast.POSITION.TOP_LEFT });
      res.status(200).json(results);
    });
  } else {
    res.status(405).end();
  }
}