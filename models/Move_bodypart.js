module.exports = function(sequelize, DataTypes) {
    const Move_bodypart = sequelize.define('Move_bodypart', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        move_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Move',
                key: 'id'
            }
        },
        bodypart_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Bodypart',
                key: 'id'
            }
        }
    }, {
        freezeTableName: true,
        tableName: 'Move_bodypart',
        timestamps: false
    });

    Move_bodypart.associate = function(models) {
        models.Move_bodypart.belongsTo(models.Bodypart, {
            as: 'move_bodypart_bp',
            foreignKey: 'bodypart_id',
            foreignKeyConstraint: true
        });

        models.Move_bodypart.belongsTo(models.Move, {
            as: 'move_bodypart_move',
            foreignKey: 'move_id',
            foreignKeyConstraint: true
        });
    }

    return Move_bodypart;
}