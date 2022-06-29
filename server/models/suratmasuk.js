const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SuratMasuk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static tambah({
      tanggalMasuk, kodeSurat, nomorSurat, tanggalSurat, pengirim, perihal, filePdf, operator,
    }) {
      return this.create({
        tanggal_masuk: tanggalMasuk, username, password: encryptedPassword, foto,
      });
    }
  }
  SuratMasuk.init({
    tanggal_masuk: DataTypes.DATE,
    kode_surat: DataTypes.STRING,
    nomor_surat: DataTypes.STRING,
    tanggal_surat: DataTypes.STRING,
    pengirim: DataTypes.STRING,
    perihal: DataTypes.TEXT,
    file_pdf: DataTypes.STRING,
    operator: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'SuratMasuk',
  });
  return SuratMasuk;
};
