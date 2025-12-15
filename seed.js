const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Performance = require('./models/Performance');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(async () => {
        console.log('MongoDB Connected for Seeding');

        // Clear existing data
        await User.deleteMany({});
        await Performance.deleteMany({});

        // Create Staff
        const salt = await bcrypt.genSalt(10);
        const staffPassword = await bcrypt.hash('staff123', salt);
        const staff1 = new User({
            username: 'ramprasad',
            password: staffPassword,
            role: 'staff',
            name: 'Prof.RamPrasad'
        });
        const staff2 = new User({
            username: 'arun',
            password: staffPassword,
            role: 'staff',
            name: 'Prof.Arun'
        });
        const staff3 = new User({
            username: 'chandan',
            password: staffPassword,
            role: 'staff',
            name: 'Prof.Chandan'
        });

        await staff1.save();
        await staff2.save();
        await staff3.save();

        // Create Students
        const studentPassword = await bcrypt.hash('student123', salt);

        const students = [
            { username: 'Harshu', name: 'Harshitha' },
            { username: 'Shre', name: 'Shreya' },
            { username: 'Sinch', name: 'Sinchana' }
        ];

        for (let s of students) {
            const user = new User({
                username: s.username,
                password: studentPassword, // all use same password for demo
                role: 'student',
                name: s.name
            });
            const savedUser = await user.save();

            // Add dummy performance data
            const perf = new Performance({
                student: savedUser._id,
                term: 'Term 1',
                subjects: [
                    { name: 'Artificial Intelligence', internalMarks: 85, assignmentMarks: 15, attendance: 95 },
                    { name: 'Software Engineering', internalMarks: 78, assignmentMarks: 20, attendance: 92 },
                    { name: 'Computer Networks', internalMarks: 95, assignmentMarks: 18, attendance: 88 }
                ]
            });
            await perf.save();
        }

        console.log('Database Seeded!');
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
