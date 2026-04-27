-- 1. Crear la tabla de transacciones
create table public.transacciones (
  id uuid default gen_random_uuid() primary key,
  codigo text not null unique,
  fecha timestamp with time zone default timezone('utc'::text, now()) not null,
  nombre_cliente text not null,
  apellido_cliente text not null,
  whatsapp_cliente text not null,
  pais_origen text not null,
  moneda_origen text not null,
  monto_enviado numeric not null,
  pais_destino text not null,
  moneda_destino text not null,
  monto_recibir numeric not null,
  tasa_pactada numeric not null,
  estado text not null default 'Pendiente' check (estado in ('Pendiente', 'Verificando', 'Completada', 'Cancelada')),
  tipo_cliente text not null default 'Estándar' check (tipo_cliente in ('Estándar', 'Mayorista'))
);

-- 2. Configurar la seguridad (RLS - Row Level Security)
-- Habilitar RLS en la tabla
alter table public.transacciones enable row level security;

-- Política 1: Permitir a cualquier usuario (incluso anónimos de la web) insertar datos
create policy "Permitir insertar cotizaciones desde la web"
on public.transacciones for insert
to public
with check (true);

-- Política 2: Permitir la lectura a todos los usuarios (para que funcione el panel de administración temporalmente sin auth)
create policy "Permitir leer transacciones"
on public.transacciones for select
to public
using (true);

-- Política 3: Permitir actualizar el estado de las transacciones (para el panel de administrador)
create policy "Permitir actualizar transacciones"
on public.transacciones for update
to public
using (true);
