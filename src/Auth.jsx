import { useState } from 'react'
import { supabase } from './lib/supabase'

export default function Auth({ onLogin }) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState(null)

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isRegister) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              nombre: nombre,
              whatsapp: whatsapp
            }
          }
        })
        if (error) throw error
        alert('📦 Registro exitoso. Por favor revisa tu correo para confirmar tu cuenta (si aplica).')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        if (error) throw error
        if (onLogin) onLogin()
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      minHeight: 'calc(100vh - var(--header-height))', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '2rem' 
    }}>
      <div className="glass" style={{ 
        maxWidth: '450px', 
        width: '100%', 
        padding: '3rem 2.5rem', 
        animation: 'fadeIn 0.5s ease-out' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ 
            width: '4.5rem', 
            height: '4.5rem', 
            background: 'rgba(16,185,129,0.1)', 
            borderRadius: '1.2rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 1.5rem',
            color: 'var(--primary-color)',
            border: '1px solid rgba(16,185,129,0.2)'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.6rem' }}>
            {isRegister ? 'Crear Cuenta' : 'Bienvenido de nuevo'}
          </h2>
          <p style={{ color: 'var(--text-low)', fontSize: '0.95rem' }}>
            {isRegister ? 'Regístrate para gestionar tus cambios fácilmente' : 'Ingresa a tu cuenta para continuar'}
          </p>
        </div>

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {isRegister && (
            <>
              <div className="input-group">
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-low)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Nombre Completo</label>
                <input
                  required
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  className="input-field"
                  style={{ width: '100%' }}
                />
              </div>
              <div className="input-group">
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-low)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>WhatsApp</label>
                <input
                  required
                  type="text"
                  placeholder="Ej: +593987654321"
                  value={whatsapp}
                  onChange={e => setWhatsapp(e.target.value)}
                  className="input-field"
                  style={{ width: '100%' }}
                />
              </div>
            </>
          )}

          <div className="input-group">
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-low)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Correo Electrónico</label>
            <input
              required
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="input-field"
              style={{ width: '100%' }}
            />
          </div>

          <div className="input-group">
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-low)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Contraseña</label>
            <input
              required
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="input-field"
              style={{ width: '100%' }}
            />
          </div>

          {error && (
            <div style={{ 
              padding: '0.8rem', 
              background: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid rgba(239, 68, 68, 0.2)', 
              borderRadius: '0.8rem', 
              color: '#ff4d4d', 
              fontSize: '0.85rem',
              fontWeight: 600
            }}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ 
              width: '100%', 
              padding: '1rem', 
              fontSize: '1rem', 
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.8rem'
            }}
          >
            {loading ? (
              <span className="spinner" style={{ width: '20px', height: '20px', border: '3px solid rgba(0,0,0,0.1)', borderTopColor: 'black', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span>
            ) : null}
            {loading ? 'Procesando...' : (isRegister ? 'Registrarse Ahora' : 'Iniciar Sesión')}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-low)', fontSize: '0.9rem' }}>
            {isRegister ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta aún?'}
            <button
              onClick={() => setIsRegister(!isRegister)}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--primary-color)', 
                fontWeight: 700, 
                cursor: 'pointer',
                marginLeft: '0.5rem',
                padding: '0.2rem 0.5rem'
              }}
            >
              {isRegister ? 'Inicia Sesión' : 'Regístrate aquí'}
            </button>
          </p>
        </div>
      </div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
