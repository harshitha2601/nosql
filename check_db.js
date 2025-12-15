const mongoose = require('mongoose');
const User = require('./models/User');
const Performance = require('./models/Performance');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(async () => {
        console.log('--- Connected to MongoDB ---');

        console.log('\n--- USERS ---');
        const users = await User.find({});
        console.table(users.map(u => ({ id: u._id.toString(), username: u.username, role: u.role, name: u.name })));

        console.log('\n--- PERFORMANCES ---');
        const perfs = await Performance.find({}).populate('student', 'username');
        perfs.forEach(p => {
            console.log(`\nStudent: ${p.student?.username} | Term: ${p.term}`);
            console.table(p.subjects.map(s => ({
                Subject: s.name,
                Internal: s.internalMarks,
                Assignment: s.assignmentMarks,
                Attendance: s.attendance + '%'
            })));
        });

        mongoose.connection.close();
    })
    .catch(err => console.error(err));
