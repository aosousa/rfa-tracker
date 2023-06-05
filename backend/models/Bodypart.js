module.exports = function(sequelize, DataTypes) {
    const Bodypart = sequelize.define('Bodypart', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: 'Bodypart',
        timestamps: false
    });

    Bodypart.associate = function(models) {
        models.Bodypart.hasMany(models.Move_bodypart, {
            as: 'move_bodypart_bp',
            foreignKey: 'bodypart_id',
            foreignKeyConstraint: true
        });
    }

    return Bodypart;
}