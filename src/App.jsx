import { useState, useEffect } from 'react'
import { sincronizarGoogleSheets } from './constants'
import Dashboard from './Dashboard'
import Cotizador from './Cotizador'
import ListaPaises from './ListaPaises'
import AdminPanel from './AdminPanel'
import LoginAdmin from './LoginAdmin'

function App() {
  const [ruta, setRuta] = useState('inicio')
  const [auth, setAuth] = useState(false)
  const [sheetsReady, setSheetsReady] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Autenticación inicial y Sincronización
  useEffect(() => {
    const isAuth = sessionStorage.getItem('jk_admin_auth')
    if (isAuth) setAuth(true)

    sincronizarGoogleSheets().finally(() => {
        setSheetsReady(true)
    })
  }, [])



  // Enrutamiento básico con hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '') || 'inicio'
      setRuta(hash)
    }
    
    window.addEventListener('hashchange', handleHashChange)
    handleHashChange()
    
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navegar = (nueva) => {
    window.location.hash = `/${nueva}`
  }

  const handleLogin = () => {
    setAuth(true)
    navegar('admin')
  }

  const handleLogout = () => {
    sessionStorage.removeItem('jk_admin_auth')
    setAuth(false)
    navegar('inicio')
  }

  if (!sheetsReady) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)', color: 'white', flexDirection: 'column', gap: '1rem' }}>
        <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid rgba(255,255,255,0.2)', borderTopColor: 'var(--primary-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ fontWeight: 600, letterSpacing: '0.05em' }}>Conectando a Google Sheets...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Navbar Público */}
      {(ruta !== 'admin-jk' && ruta !== 'admin') && (
        <nav style={{
          height: 'var(--header-height)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: isMobile ? '0 1rem' : '0 2rem',
          background: 'rgba(6, 25, 52, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--glass-border)',
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}>
          <div 
            style={{ fontSize: isMobile ? '1.1rem' : '1.5rem', fontWeight: 800, color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            onClick={() => navegar('inicio')}
          >
            <div style={{ width: isMobile ? '2rem' : '2.6rem', height: isMobile ? '2rem' : '2.6rem', borderRadius: '0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '0.15rem' }}>
              <img src="./logo-jk-transparente.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <span>GRUPO JK</span>
          </div>
          
          <div style={{ display: 'flex', gap: isMobile ? '0.6rem' : '2rem', alignItems: 'center' }}>
            <button onClick={() => navegar('inicio')} className={`nav-link ${ruta === 'inicio' ? 'active' : ''}`} style={{ background: 'none', border: 'none', fontSize: isMobile ? '0.8rem' : '1rem', cursor: 'pointer', padding: isMobile ? '0.3rem 0.5rem' : undefined }}>Inicio</button>
            <button onClick={() => navegar('cotizador')} className={`nav-link ${ruta === 'cotizador' ? 'active' : ''}`} style={{ background: 'none', border: 'none', fontSize: isMobile ? '0.8rem' : '1rem', cursor: 'pointer', padding: isMobile ? '0.3rem 0.5rem' : undefined }}>Cotizador</button>
            <button onClick={() => navegar('tasas')} className={`nav-link ${ruta === 'tasas' ? 'active' : ''}`} style={{ background: 'none', border: 'none', fontSize: isMobile ? '0.8rem' : '1rem', cursor: 'pointer', padding: isMobile ? '0.3rem 0.5rem' : undefined }}>{isMobile ? 'Tasas' : 'Lista de Tasas'}</button>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {ruta === 'inicio' && <Dashboard onNavegar={navegar} />}
        {ruta === 'cotizador' && <Cotizador />}
        {ruta === 'tasas' && <ListaPaises />}
        
        {ruta === 'admin-jk' && (
          !auth ? <LoginAdmin onLogin={handleLogin} /> : <AdminPanel onLogout={handleLogout} />
        )}
        
        {ruta === 'admin' && (
          auth ? <AdminPanel onLogout={handleLogout} /> : <LoginAdmin onLogin={handleLogin} />
        )}
      </main>

      {/* Footer Público */}
      {(ruta !== 'admin-jk' && ruta !== 'admin') && (
        <footer style={{
          textAlign: 'center',
          padding: '2rem',
          borderTop: '1px solid var(--glass-border)',
          color: 'var(--text-low)',
          fontSize: '0.85rem'
        }}>
          <p>© {new Date().getFullYear()} GRUPO JK. Todos los derechos reservados.</p>
          <p style={{ marginTop: '0.5rem' }}>
            <span style={{ cursor: 'pointer', opacity: 0.3 }} onDoubleClick={() => navegar('admin-jk')}>⚡</span>
          </p>
        </footer>
      )}

    </div>
  )
}

export default App
