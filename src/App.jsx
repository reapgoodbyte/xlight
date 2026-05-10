import { useState } from 'react'
import './App.css'

function App() {
  const [menuAktif, setMenuAktif] = useState('film');
  const [kataKunci, setKataKunci] = useState('');

  // --- STATE UNTUK DATA FILM ---
  const [filmList, setFilmList] = useState([
    { id: 1, judul: "Inception", tahun: "2010", genre: "Sci-Fi", gambar: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80", deskripsi: "Seorang pencuri profesional yang mencuri informasi dengan menyusup ke alam bawah sadar targetnya." },
    { id: 2, judul: "Interstellar", tahun: "2014", genre: "Adventure", gambar: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&q=80", deskripsi: "Tim penjelajah melakukan perjalanan melalui lubang cacing di luar angkasa untuk mencari rumah baru bagi umat manusia." },
    { id: 3, judul: "The Matrix", tahun: "1999", genre: "Action", gambar: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&q=80", deskripsi: "Seorang hacker menemukan kebenaran mengejutkan tentang realitas dan perannya dalam perang melawan pengendalinya." },
    { id: 4, judul: "The Batman", tahun: "2022", genre: "Action", gambar: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=500&q=80", deskripsi: "Batman mengungkap korupsi di Gotham City yang terhubung dengan keluarganya sendiri." },
  ]);

  // --- STATE UNTUK FORM ADMIN ---
  const [formFilm, setFormFilm] = useState({ id: null, judul: '', tahun: '', genre: '', gambar: '', deskripsi: '' });
  const [modeEdit, setModeEdit] = useState(false);

  // --- FUNGSI ADMIN ---
  const handleInputChange = (e) => {
    setFormFilm({ ...formFilm, [e.target.name]: e.target.value });
  };

  const handleSimpan = (e) => {
    e.preventDefault();
    if (modeEdit) {
      // Update film yang ada
      setFilmList(filmList.map(film => film.id === formFilm.id ? formFilm : film));
    } else {
      // Tambah film baru
      const filmBaru = { ...formFilm, id: Date.now() }; // Pakai waktu sekarang untuk ID unik
      setFilmList([...filmList, filmBaru]);
    }
    // Reset form setelah simpan
    setFormFilm({ id: null, judul: '', tahun: '', genre: '', gambar: '', deskripsi: '' });
    setModeEdit(false);
  };

  const handleEdit = (film) => {
    setFormFilm(film);
    setModeEdit(true);
    window.scrollTo(0, 0); // Otomatis scroll ke atas pas klik edit
  };

  const handleHapus = (id) => {
    if (window.confirm("Yakin ingin menghapus film ini?")) {
      setFilmList(filmList.filter(film => film.id !== id));
    }
  };

  const handleBatal = () => {
    setFormFilm({ id: null, judul: '', tahun: '', genre: '', gambar: '', deskripsi: '' });
    setModeEdit(false);
  };

  // Logika Pencarian
  const filmTampil = filmList.filter(film => 
    film.judul.toLowerCase().includes(kataKunci.toLowerCase())
  );

  return (
    <div className="app-container">
      {/* --- NAVBAR PREMIUM --- */}
      <nav className="navbar">
        <div className="logo">
          <span className="cyan-text">X</span>LIGHT <span className="cyan-text">MOVIES</span>
        </div>
        <ul className="nav-links">
          <li className={menuAktif === 'film' ? 'active' : ''} onClick={() => setMenuAktif('film')}>Film</li>
          <li className={menuAktif === 'kategori' ? 'active' : ''} onClick={() => setMenuAktif('kategori')}>Kategori</li>
          <li className={menuAktif === 'admin' ? 'active' : ''} onClick={() => setMenuAktif('admin')}>Admin</li>
        </ul>
      </nav>

      <div className="wadah-utama">
        {/* ======================= TAMPILAN HALAMAN FILM ======================= */}
        {menuAktif === 'film' && (
          <>
            <header className="header-section">
              <h2>Eksplorasi <span className="cyan-text">Sinema</span> Tanpa Batas</h2>
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Cari judul film..."
                  value={kataKunci}
                  onChange={(e) => setKataKunci(e.target.value)}
                />
                <button className="btn-search">Cari</button>
              </div>
            </header>

            <div className="grid-film">
              {filmTampil.map((film) => (
                <div key={film.id} className="kartu-film">
                  <div className="poster-wrapper">
                    <img src={film.gambar} alt={film.judul} />
                    <div className="overlay-genre">{film.genre}</div>
                  </div>
                  <div className="info-film">
                    <h3>{film.judul}</h3>
                    <div className="info-meta">
                      <p className="tahun">{film.tahun}</p>
                    </div>
                    {/* Tampilkan Deskripsi Singkat */}
                    <p className="deskripsi-singkat">{film.deskripsi}</p>
                  </div>
                </div>
              ))}
              {filmTampil.length === 0 && <p className="tidak-ada">Film tidak ditemukan.</p>}
            </div>
          </>
        )}

        {/* ======================= TAMPILAN HALAMAN ADMIN ======================= */}
        {menuAktif === 'admin' && (
          <div className="admin-panel">
            <h2 className="judul-admin"><span className="cyan-text">Panel</span> Admin</h2>
            
            {/* Form Tambah/Edit */}
            <div className="kotak-form">
              <h3>{modeEdit ? "Edit Data Film" : "Tambah Film Baru"}</h3>
              <form onSubmit={handleSimpan}>
                <div className="grup-input">
                  <input type="text" name="judul" placeholder="Judul Film" value={formFilm.judul} onChange={handleInputChange} required />
                  <input type="text" name="tahun" placeholder="Tahun Rilis" value={formFilm.tahun} onChange={handleInputChange} required />
                </div>
                <div className="grup-input">
                  <input type="text" name="genre" placeholder="Genre (Cth: Sci-Fi, Action)" value={formFilm.genre} onChange={handleInputChange} required />
                  <input type="url" name="gambar" placeholder="Link URL Gambar / Poster" value={formFilm.gambar} onChange={handleInputChange} required />
                </div>
                <textarea name="deskripsi" placeholder="Deskripsi Singkat Film..." value={formFilm.deskripsi} onChange={handleInputChange} rows="3" required></textarea>
                
                <div className="aksi-form">
                  <button type="submit" className="btn-simpan">{modeEdit ? "Update Film" : "Simpan Film"}</button>
                  {modeEdit && <button type="button" className="btn-batal" onClick={handleBatal}>Batal</button>}
                </div>
              </form>
            </div>

            {/* Tabel Daftar Film */}
            <div className="daftar-film-admin">
              <h3>Daftar Film Tersimpan</h3>
              <div className="tabel-wrapper">
                <table className="tabel-admin">
                  <thead>
                    <tr>
                      <th>Poster</th>
                      <th>Judul & Tahun</th>
                      <th>Genre</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filmList.map(film => (
                      <tr key={film.id}>
                        <td><img src={film.gambar} alt="poster" className="poster-mini" /></td>
                        <td>
                          <strong>{film.judul}</strong> <br/>
                          <span className="teks-kecil">{film.tahun}</span>
                        </td>
                        <td><span className="badge-genre">{film.genre}</span></td>
                        <td>
                          <button className="btn-edit" onClick={() => handleEdit(film)}>Edit</button>
                          <button className="btn-hapus" onClick={() => handleHapus(film.id)}>Hapus</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- TAMPILAN HALAMAN KATEGORI --- */}
        {menuAktif === 'kategori' && <div className="placeholder-screen"><h2>Menu Kategori Premium (Segera Hadir)</h2></div>}
      </div>
    </div>
  )
}

export default App