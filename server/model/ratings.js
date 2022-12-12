import { DataTypes } from 'sequelize'

const Ratings = (sequelize) => {
    const Schema = {
        rating: {
            type: DataTypes.INTEGER, 
            allowNull: false 
        }
    }

    return sequelize.define('ratings', Schema)
}

export default Ratings