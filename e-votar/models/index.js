import Users from './users';
import Polls from './polls';
import Votes from './votes';
import PollOptions from './poll_options';

// Associations

Users.hasMany(Polls, { foreignKey: 'userId', as: 'polls' });
Polls.belongsTo(Users, { foreignKey: 'userId', as: 'users' });

Users.hasMany(Votes, { foreignKey: 'userId', as: 'votes' });
Votes.belongsTo(Users, { foreignKey: 'userId', as: 'users' });

Polls.hasMany(Votes, { foreignKey: 'pollId', as: 'votes' });
Votes.belongsTo(Polls, { foreignKey: 'pollId', as: 'poll' });

PollOptions.belongsTo(Polls, { foreignKey: 'pollId', as: 'poll_options' });
Polls.hasMany(PollOptions, {foreignKey: 'id', as: 'options'})

export { Users, Polls, Votes };