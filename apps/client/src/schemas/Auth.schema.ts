import * as yup from 'yup';

const htmlRegex = /<\/?[a-z][\s\S]*>/i;

export const registerSchema = yup.object({
  name: yup
    .string()
    .required('El nombre es obligatorio')
    .min(2, 'Debe tener al menos 2 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .test('no-html', 'No se permite HTML', (val) => !htmlRegex.test(val || '')),

  email: yup
    .string()
    .required('El correo es obligatorio')
    .email('Correo inválido')
    .test('no-html', 'No se permite HTML', (val) => !htmlRegex.test(val || '')),

  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(6, 'Debe tener al menos 6 caracteres')
    .max(100, 'Máximo 100 caracteres'),

});

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('El correo es obligatorio')
    .email('Correo inválido')
    .test('no-html', 'No se permite HTML', (val) => !htmlRegex.test(val || '')),

  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(6, 'Debe tener al menos 6 caracteres')
    .max(100, 'Máximo 100 caracteres'),
});
