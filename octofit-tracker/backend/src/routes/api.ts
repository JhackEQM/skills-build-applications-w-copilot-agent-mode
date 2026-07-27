import { Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const router = Router();

router.get(['/users', '/users/'], async (_req, res) => {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

router.post(['/users', '/users/'], async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create user', error });
  }
});

router.get(['/teams', '/teams/'], async (_req, res) => {
  try {
    const teams = await Team.find().populate('memberIds').lean();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error });
  }
});

router.post(['/teams', '/teams/'], async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create team', error });
  }
});

router.get(['/activities', '/activities/'], async (_req, res) => {
  try {
    const activities = await Activity.find().populate('userId').sort({ date: -1 }).lean();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

router.post(['/activities', '/activities/'], async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create activity', error });
  }
});

router.get(['/leaderboard', '/leaderboard/'], async (_req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 }).lean();
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

router.get(['/workouts', '/workouts/'], async (_req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: 1 }).lean();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workouts', error });
  }
});

router.post(['/workouts', '/workouts/'], async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create workout', error });
  }
});

export default router;
