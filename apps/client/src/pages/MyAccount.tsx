import { useNavigate } from 'react-router-dom';


const MyAccount = () => {

  const navigate = useNavigate();

const userString = localStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;

  // Traducción de roles
  const role = (rol: string) => {
    switch (rol) {
      case 'prof':
        return 'Profesor';
      case 'admin':
        return 'Administrador';
      case 'student':
        return 'Estudiante';
      default:
        return rol;
    }
  };

  if (!user) {
    return <p>No hay usuario en el sistema.</p>;
  }


  return (
  <div style={{ padding: '20px' }}>
      <h2>Perfil de Usuario</h2>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Rol:</strong> {role(user.role)}</p>

      <button onClick={() => navigate('/ayuda')}>Ayuda</button>

      {user.role === 'student' && (
        <div style={{ marginTop: '10px' }}>
          <p>¿Quieres ser docente?</p>
          <button onClick={() => navigate('/ayuda')}>Solicitar acceso</button>
        </div>
      )}
    </div>
  );
};

export default MyAccount