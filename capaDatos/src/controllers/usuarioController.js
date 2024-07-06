const Usuario = require('../models/usuariom');
const Rol = require('../models/rolm');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  try {
    const nuevoUsuario = await Usuario.create(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({ include: Rol });
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, { include: Rol });
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario por ID
exports.updateUsuario = async (req, res) => {
  try {
    const [updated] = await Usuario.update(req.body, {
      where: { id_usuario: req.params.id }
    });
    if (updated) {
      const updatedUsuario = await Usuario.findByPk(req.params.id, { include: Rol });
      res.status(200).json(updatedUsuario);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un usuario por ID
exports.deleteUsuario = async (req, res) => {
  try {
    const deleted = await Usuario.destroy({
      where: { id_usuario: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Usuario eliminado' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  const { correo_electronico, contrasena } = req.body;

  try {
    console.log(`Intento de inicio de sesión para correo electrónico: ${correo_electronico}`);

    const usuario = await Usuario.findOne({ 
      where: { correo_electronico },
      include: Rol // Para incluir el rol asociado al usuario
    });

    if (!usuario) {
      console.log(`Usuario con correo electrónico ${correo_electronico} no encontrado`);
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    console.log(`Usuario encontrado: ${usuario.nombre}`);
    console.log(`Contraseña almacenada (hash): ${usuario.contrasena}`);
    console.log(`Rol del usuario: ${usuario.Rol.nombre_rol}`);

    const passwordMatch = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!passwordMatch) {
      console.log(`Contraseña incorrecta para el usuario ${correo_electronico}`);
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    console.log(`Inicio de sesión exitoso para ${usuario.nombre}`);

    // Generar token JWT (ajusta la configuración según tus necesidades)
    const token = jwt.sign({ id_usuario: usuario.id_usuario, role: usuario.Rol.nombre_rol}, 'tu_secreto_jwt', { expiresIn: '1h' }); 
    res.json({ token }); 
  } catch (error) {
    console.error(`Error en el proceso de inicio de sesión: ${error.message}`);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Registrar usuario
exports.registerUser = async (req, res) => {
  try {
    const { nombre, correo_electronico, contrasena, id_rol } = req.body;
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const nuevoUsuario = await Usuario.create({ 
      nombre, 
      correo_electronico, 
      contrasena: hashedPassword, 
      id_rol 
    });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener roles
exports.getRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear rol
exports.createRole = async (req, res) => {
  try {
    const { nombre_rol } = req.body;
    const nuevoRol = await Rol.create({ nombre_rol });
    res.status(201).json(nuevoRol);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
