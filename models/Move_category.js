module.exports = function(sequelize, DataTypes) {
    var Move_category = sequelize.define('Move_category', {
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
        background: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        color: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        border: {
            type: DataTypes.STRING(10),
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: 'Move_category',
        timestamps: false
    });

    Move_category.associate = function(models) {
        models.Move_category.hasMany(models.Move, {
            as: 'move_category_move',
            foreignKey: 'category_id',
            foreignKeyConstraint: true
        });
    }

    return Move_category;
}