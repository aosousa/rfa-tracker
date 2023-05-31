module.exports = function(sequelize, DataTypes) {
    const Workout_move = sequelize.define('Workout_move', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        workout_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Workout',
                key: 'id'
            }
        },
        move_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Move',
                key: 'id'
            }
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: 'Workout_move',
        timestamps: false
    });

    Workout_move.associate = function(models) {
        models.Workout_move.belongsTo(models.Workout, {
            as: 'workout_move_workout',
            foreignKey: 'workout_id',
            foreignKeyConstraint: true
        });

        models.Workout_move.belongsTo(models.Move, {
            as: 'workout_move_move',
            foreignKey: 'move_id',
            foreignKeyConstraint: true
        });
    }

    return Workout_move;
}