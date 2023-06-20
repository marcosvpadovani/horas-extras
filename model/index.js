const { DataTypes } = require("sequelize");
const dbConn = require("../db/index");

const Secretaria = dbConn.define(
  "Secretaria",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    paranoid: true,
  }
);

const Setor = dbConn.define(
  "Setor",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    paranoid: true,
  }
);

const Servidor = dbConn.define(
  "Servidor",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    matricula: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nivel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    dataAdmissao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    telefone: {
      type: DataTypes.STRING,
    },
    HoraTotal: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    faltasTotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    paranoid: true,
  }
);

const Hora = dbConn.define(
  "Hora",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    horarios: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    anexo: {
      type: DataTypes.STRING,
    },
    justificativa: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    situacao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);

const Fechamento = sequelize.define("Fechamento", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  mes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Suporte = sequelize.define("Chamados_Suporte", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  descricao: {
    type: DataTypes.STRING(1024),
    allowNull: false,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

Secretaria.hasMany(Setor, { foreignKey: "Secretaria_id" });
Setor.belongsTo(Secretaria, { foreignKey: "Secretaria_id" });

Setor.hasMany(Servidor, { foreignKey: "Setor_id" });
Servidor.belongsTo(Setor, { foreignKey: "Setor_id" });

Servidor.hasMany(Hora, { foreignKey: "Servidor_id" });
Hora.belongsTo(Servidor, { foreignKey: "Servidor_id" });

Servidor.hasMany(Servidor, { foreignKey: "chefia_id", as: "chefia_imediata" });

Servidor.hasMany(Servidor, {
  foreignKey: "secretario_id",
  as: "secretario_pasta",
});

Servidor.hasMany(Suporte, { foreignKey: "user_id", as: "user_creator" });

Servidor.hasMany(Suporte, {
  foreignKey: "Suporte_func_id",
  as: "support_user",
});

Hora.belongsToMany(Fechamento, { through: "FECHAMENTO" });
Fechamento.belongsToMany(Hora, { through: "FECHAMENTO" });

module.exports = { Secretaria, Setor, Servidor, Hora, Fechamento, Suporte };
