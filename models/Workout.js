module.exports = function(sequelize, DataTypes) {
    const Workout = sequelize.define('Workout', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        duration_ingame: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        duration_real: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        kcal_ingame: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        kcal_real: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        start_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: 'Workout',
        timestamps: false
    });

    Workout.associate = function(models) {
        models.Workout.hasMany(models.Workout_move, {
            as: 'workout_move_workout',
            foreignKey: 'workout_id',
            foreignKeyConstraint: true
        });
    }


    return Workout;
}