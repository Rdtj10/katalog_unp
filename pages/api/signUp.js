import conn from "./db-connection";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { nim, nama, faculty } = req.body; 
        let query = "INSERT INTO tb_pengunjung (kd_pengunjung,nm_pengunjung,fakultas) VALUES(?,?,?)";
        let values = [nim, nama, faculty];

        conn.query(query, values, (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Terjadi kesalahan pada server' });
                return;
            }
            res.status(200).json(results);
        });
    }
    else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
