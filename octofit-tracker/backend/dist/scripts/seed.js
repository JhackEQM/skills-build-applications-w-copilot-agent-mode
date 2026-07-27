import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            LeaderboardEntry.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.insertMany([
            {
                name: 'Ava Chen',
                email: 'ava.chen@octofit.com',
                role: 'captain',
                goal: 'Marathon prep',
                fitnessLevel: 'advanced',
            },
            {
                name: 'Mateo Alvarez',
                email: 'mateo.alvarez@octofit.com',
                role: 'member',
                goal: 'Strength building',
                fitnessLevel: 'intermediate',
            },
            {
                name: 'Nia Brooks',
                email: 'nia.brooks@octofit.com',
                role: 'member',
                goal: 'Improve endurance',
                fitnessLevel: 'intermediate',
            },
        ]);
        const teams = await Team.insertMany([
            {
                name: 'North Stars',
                focus: 'Endurance',
                description: 'A fast-paced running crew focused on long-distance events.',
                goal: 'Complete a half marathon together',
                memberIds: [users[0]._id, users[1]._id],
            },
            {
                name: 'Peak Builders',
                focus: 'Strength',
                description: 'A strength-first team preparing for a community fitness challenge.',
                goal: 'Increase total body strength',
                memberIds: [users[2]._id],
            },
        ]);
        await User.updateMany({}, { $set: { teamId: null } });
        await User.findByIdAndUpdate(users[0]._id, { teamId: teams[0]._id });
        await User.findByIdAndUpdate(users[1]._id, { teamId: teams[0]._id });
        await User.findByIdAndUpdate(users[2]._id, { teamId: teams[1]._id });
        await Activity.insertMany([
            {
                userId: users[0]._id,
                type: 'run',
                durationMinutes: 45,
                distanceKm: 7.8,
                calories: 520,
                notes: 'Morning tempo run',
                date: new Date('2026-07-20T06:30:00.000Z'),
            },
            {
                userId: users[1]._id,
                type: 'strength',
                durationMinutes: 60,
                calories: 410,
                notes: 'Upper body circuit',
                date: new Date('2026-07-21T18:00:00.000Z'),
            },
            {
                userId: users[2]._id,
                type: 'cycle',
                durationMinutes: 40,
                distanceKm: 18.5,
                calories: 390,
                notes: 'Steady indoor ride',
                date: new Date('2026-07-22T07:00:00.000Z'),
            },
        ]);
        await LeaderboardEntry.insertMany([
            {
                userId: users[0]._id,
                name: 'Ava Chen',
                teamName: 'North Stars',
                score: 980,
                streak: 7,
                rank: 1,
            },
            {
                userId: users[1]._id,
                name: 'Mateo Alvarez',
                teamName: 'North Stars',
                score: 912,
                streak: 4,
                rank: 2,
            },
            {
                userId: users[2]._id,
                name: 'Nia Brooks',
                teamName: 'Peak Builders',
                score: 875,
                streak: 5,
                rank: 3,
            },
        ]);
        await Workout.insertMany([
            {
                title: 'Tempo Run',
                focus: 'Endurance',
                difficulty: 'Intermediate',
                durationMinutes: 35,
                equipment: ['Running shoes'],
                description: 'A structured interval run to build pace control and stamina.',
            },
            {
                title: 'Upper Body Circuit',
                focus: 'Strength',
                difficulty: 'Beginner',
                durationMinutes: 30,
                equipment: ['Dumbbells', 'Bench'],
                description: 'A simple circuit for shoulder, chest, and arm strength.',
            },
            {
                title: 'Core Stability Flow',
                focus: 'Mobility',
                difficulty: 'Beginner',
                durationMinutes: 25,
                equipment: ['Yoga mat'],
                description: 'A gentle sequence that improves posture and core control.',
            },
        ]);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
