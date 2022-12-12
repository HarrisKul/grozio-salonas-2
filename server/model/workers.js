import { DataTypes } from 'sequelize'

const Workers = (sequelize) => {
    const Schema = {
        first_name: {
            type: DataTypes.STRING, 
            allowNull: false 
        },
        last_name: {
            type: DataTypes.STRING, 
            allowNull: false 
        },
        photo: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    }

    return sequelize.define('workers', Schema)
}

export default Workers