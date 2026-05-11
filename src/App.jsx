import { useState } from 'react';
import './App.css';

function App() {
  const [menuTerbuka, setMenuTerbuka] = useState(false);
  const [menuAktif, setMenuAktif] = useState('beranda');

  // --- STATE BACKGROUND UTAMA ---
  const [bgUtama, setBgUtama] = useState('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070');

  // --- DATA FILM ---
  const [filmList, setFilmList] = useState([
    { id: 1, judul: "John Wick", genre: "Crime, Action", tahun: "2019", gambar: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=750&fit=crop", sinopsis: "", linkTrailer: "" },
    { id: 2, judul: "Joker", genre: "Crime, Drama", tahun: "2019", gambar: "https://images.unsplash.com/photo-1559583109-3e7968136c99?w=500&h=750&fit=crop", sinopsis: "", linkTrailer: "" },
    { id: 3, judul: "Hoppers", genre: "Animation", tahun: "2024", gambar: "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?w=500&h=750&fit=crop", sinopsis: "", linkTrailer: "" },
    { id: 4, judul: "Goat", genre: "Anim, Comedy", tahun: "2024", gambar: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&h=750&fit=crop", sinopsis: "", linkTrailer: "" },
    { id: 5, judul: "Super Mario", genre: "Anim, Fantasy", tahun: "2023", gambar: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=500&h=750&fit=crop", sinopsis: "", linkTrailer: "" },
  ]);

  const [formFilm, setFormFilm] = useState({ judul: '', genre: '', tahun: '', sinopsis: '', linkTrailer: '', gambar: '' });
  const [modeEdit, setModeEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  // --- FUNGSI MENU ---
  const gantiMenu = (menu) => {
    setMenuAktif(menu);
    setMenuTerbuka(false);
    window.scrollTo(0, 0);

    if (menu === 'unggah') {
      setFormFilm({ judul: '', genre: '', tahun: '', sinopsis: '', linkTrailer: '', gambar: '' });
      setModeEdit(false);
      setEditId(null);
    }
  };

  const handleInputChange = (e) => {
    setFormFilm({ ...formFilm, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormFilm({ ...formFilm, gambar: imageUrl });
    }
  };

  const handleBgUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const bgUrl = URL.createObjectURL(file);
      setBgUtama(bgUrl);
      alert("Gambar Background berhasil diubah!");
    }
  };

  const handleSimpanFilm = (e) => {
    e.preventDefault();
    if (!formFilm.gambar) {
      alert("Poster wajib diunggah, Bos!");
      return;
    }

    if (modeEdit) {
      const updatedList = filmList.map(film => 
        film.id === editId ? { ...film, ...formFilm } : film
      );
      setFilmList(updatedList);
      alert("Data film berhasil diperbarui!");
    } else {
      const filmBaru = { id: Date.now(), ...formFilm };
      setFilmList([filmBaru, ...filmList]); 
      alert("Film Baru Berhasil Ditambahkan!");
    }

    setFormFilm({ judul: '', genre: '', tahun: '', sinopsis: '', linkTrailer: '', gambar: '' });
    setModeEdit(false);
    setEditId(null);
    setMenuAktif('beranda');
  };

  const handleHapus = (id) => {
    if (window.confirm("Yakin mau hapus film ini dari Beranda?")) {
      setFilmList(filmList.filter(film => film.id !== id));
    }
  };

  const handleEdit = (film) => {
    setFormFilm({
      judul: film.judul,
      genre: film.genre,
      tahun: film.tahun || '',
      sinopsis: film.sinopsis || '',
      linkTrailer: film.linkTrailer || '',
      gambar: film.gambar
    });
    setModeEdit(true);
    setEditId(film.id);
    gantiMenu('unggah'); 
  };

  return (
    <div className="app-wrapper" style={{
      backgroundImage: `
        linear-gradient(to bottom, rgba(5, 5, 5, 0) 0%, #050505 80%), 
        linear-gradient(to right, #050505 20%, rgba(5, 5, 5, 0.5) 50%, rgba(5, 5, 5, 0) 100%),
        url('${bgUtama}')
      `
    }}>
      <header className="top-header">
        <div className="logo-brand" onClick={() => gantiMenu('beranda')}>
          <span className="text-x">X</span> <span className="text-light">Light</span>
        </div>
        
        <div className="center-header">
          {menuAktif === 'beranda' ? (
            <div className="search-bar">
              <input type="text" placeholder="Search your Favorite movies.." />
              <svg className="search-icon-premium" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          ) : (
            <h2 className="judul-halaman">
              {menuAktif === 'kelola' ? 'KELOLA FILM' : menuAktif.toUpperCase()}
            </h2>
          )}
        </div>

        <div className="hamburger" onClick={() => setMenuTerbuka(!menuTerbuka)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </header>

      <div className={`sidebar-menu ${menuTerbuka ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <span className="text-x">X</span> <span className="text-light">Light</span>
        </div>
        <ul>
          <li className={menuAktif === 'beranda' ? 'active' : ''} onClick={() => gantiMenu('beranda')}>Beranda</li>
          <li className={menuAktif === 'kategori' ? 'active' : ''} onClick={() => gantiMenu('kategori')}>Kategori</li>
          <li className={menuAktif === 'favorit' ? 'active' : ''} onClick={() => gantiMenu('favorit')}>Favorit</li>
          <li className={menuAktif === 'unggah' ? 'active' : ''} onClick={() => gantiMenu('unggah')}>Unggah</li>
          <li className={menuAktif === 'kelola' ? 'active' : ''} onClick={() => gantiMenu('kelola')}>Kelola Film</li>
        </ul>
      </div>

      <main className="main-content">
        {/* ================= HALAMAN BERANDA ================= */}
        {menuAktif === 'beranda' && (
          <>
            <div className="movie-grid">
              {filmList.map((film) => (
                <div key={film.id} className="movie-item">
                  <div className="poster-container">
                    <img src={film.gambar} alt={film.judul} />
                    <div className="hd-badge">HD</div>
                    <div className="year-badge">{film.tahun}</div>
                  </div>
                  <div className="hover-info">
                    <p className="genre-text">{film.genre}</p>
                    <h3 className="title-text">{film.judul}</h3>
                    <div className="blue-line"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination-bottom">
              <span className="icon-page">⊙</span>
              <span className="num-page active">1</span>
              <span className="num-page">2</span>
              <span className="num-page">3</span>
              <span className="icon-page">⊙</span>
            </div>
          </>
        )}

        {/* ================= HALAMAN UNGGAH / EDIT ================= */}
        {menuAktif === 'unggah' && (
          <div className="upload-section">
            <div className="upload-container">
              <div className="upload-header">
                <h3>{modeEdit ? "Edit Data Film" : "Tambah Film Baru"}</h3>
                <p>{modeEdit ? "Perbarui informasi film di bawah ini." : "Lengkapi detail dan sampul film di bawah ini."}</p>
              </div>

              <form className="form-premium" onSubmit={handleSimpanFilm}>
                <div className="form-layout">
                  <div className="poster-upload-area">
                    <label className="judul-input">Sampul (Poster)</label>
                    <label htmlFor="upload-poster" className={`dropzone ${formFilm.gambar ? 'has-image' : ''}`}>
                      {formFilm.gambar ? (
                        <img src={formFilm.gambar} alt="Preview Poster" className="preview-img" />
                      ) : (
                        <div className="dropzone-text">
                          <span className="icon-plus">+</span>
                          <p>Klik untuk Pilih Poster</p>
                          <small>2:3 Ratio (Portrait)</small>
                        </div>
                      )}
                    </label>
                    <input id="upload-poster" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                  </div>

                  <div className="input-data-area">
                    <div className="form-group">
                      <label>Judul Film.....</label>
                      <input type="text" name="judul" value={formFilm.judul} onChange={handleInputChange} placeholder="Masukkan judul..." required />
                    </div>

                    <div className="form-group dua-kolom">
                      <div>
                        <label>Tahun...</label>
                        <input type="number" name="tahun" value={formFilm.tahun} onChange={handleInputChange} placeholder="2026" required />
                      </div>
                      <div>
                        <label>Pilih Genre</label>
                        <input type="text" name="genre" value={formFilm.genre} onChange={handleInputChange} placeholder="Contoh: Action, Sci-Fi" required />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Sinopsis....</label>
                      <textarea name="sinopsis" value={formFilm.sinopsis} onChange={handleInputChange} rows="3" placeholder="Ceritakan singkat tentang film ini..."></textarea>
                    </div>

                    <div className="form-group">
                      <label>Upload your Link..</label>
                      <input type="text" name="linkTrailer" value={formFilm.linkTrailer} onChange={handleInputChange} placeholder="link trailer......" />
                    </div>
                  </div>
                </div>

                <div className="form-action">
                  <button type="submit" className="btn-submit-premium">
                    {modeEdit ? "Simpan Perubahan" : "Unggah Film ke Beranda"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= HALAMAN KELOLA FILM ================= */}
        {menuAktif === 'kelola' && (
          <div className="kelola-section">
            <div className="kelola-container">
              <div className="kelola-header">
                <h3>Daftar Film Beranda</h3>
                <p>Klik tombol Edit untuk mengubah poster/data, atau Hapus untuk menghilangkan film dari beranda.</p>
              </div>

              {/* UPLOAD BACKGROUND */}
              <div className="ganti-bg-box">
                <div>
                  <h4 style={{ color: '#fff', marginBottom: '5px' }}>Ubah Sampul Belakang (Background)</h4>
                  <p style={{ color: '#888', fontSize: '0.9rem' }}>Format gambar yang disarankan: Landscape (16:9)</p>
                </div>
                <div>
                  <label htmlFor="upload-bg" className="btn-upload-bg">Pilih Gambar</label>
                  <input id="upload-bg" type="file" accept="image/*" onChange={handleBgUpload} style={{ display: 'none' }} />
                </div>
              </div>
              
              <div className="table-responsive">
                <table className="tabel-premium">
                  <thead>
                    <tr>
                      <th>Poster</th>
                      <th>Judul</th>
                      <th>Tahun</th>
                      <th>Genre</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filmList.length === 0 ? (
                      <tr><td colSpan="5" style={{textAlign:'center'}}>Belum ada film di Beranda.</td></tr>
                    ) : (
                      filmList.map(film => (
                        <tr key={film.id}>
                          <td><img src={film.gambar} alt="poster" className="img-mini" /></td>
                          <td className="teks-tebal">{film.judul}</td>
                          <td>{film.tahun}</td>
                          <td><span className="badge-genre">{film.genre}</span></td>
                          <td>
                            <button className="btn-edit" onClick={() => handleEdit(film)}>Edit</button>
                            <button className="btn-hapus" onClick={() => handleHapus(film.id)}>Hapus</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;