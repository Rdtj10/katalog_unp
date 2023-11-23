import conn from "./db-connection";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { nim, nama, faculty, univ } = req.body; 
        let query = "INSERT INTO tb_pengunjung (kd_pengunjung,nm_pengunjung,fakultas,asal) VALUES(?,?,?,?)";
        let values = [nim, nama, faculty,univ];

        conn.query(query, values, (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Terjadi kesalahan pada server' });
                toast.error('Terjadi kesalahan pada server', { position: toast.POSITION.TOP_RIGHT });
                return;
            }
            toast.success('Data berhasil disimpan', { position: toast.POSITION.TOP_RIGHT });
            res.status(200).json(results);
        });
    }
    else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
