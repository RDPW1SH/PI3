
import { DataTypes } from 'sequelize';
import sequelize from '@/lib/sequelize';

const PollOptions = sequelize.define('Poll_options', {
    optionTitle: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    pollId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {

});

export default PollOptions;
