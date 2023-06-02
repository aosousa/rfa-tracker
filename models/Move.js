module.exports = function(sequelize, DataTypes) {
    const Move = sequelize.define('Move', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Move_category',
                key: 'id'
            }
        },
        unit: {
            type: DataTypes.STRING(10),
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: 'Move',
        timestamps: false
    });

    Move.associate = function(models) {
        models.Move.hasMany(models.Move_bodypart, {
            as: 'move_bodypart_move',
            foreignKey: 'move_id',
            foreignKeyConstraint: true
        });

        models.Move.hasMany(models.Workout_move, {
            as: 'move',
            foreignKey: 'move_id',
            foreignKeyConstraint: true
        });

        models.Move.belongsTo(models.Move_category, {
            as: 'move_category_move',
            foreignKey: 'category_id',
            foreignKeyConstraint: true
        });
    }

    return Move;
}