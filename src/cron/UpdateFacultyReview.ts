import { CronJob } from 'cron';
import { ACTIVE } from '../constants/Status';
import { Application } from '../declarations';

// const cronTime = '0 1 * * *';  // Every Day at 1am
const cronTime = '* * * * *';
const reviewPipeline = [
  {
    $match: {
      status: ACTIVE,
    },
  },
  {
    $group: {
      _id: '$faculty',
      teachingAvg: { $avg: '$rating.teaching.points' },
      markingAvg: { $avg: '$rating.marking.points' },
      attendanceAvg: { $avg: '$rating.attendance.points' },
    },
  },
  {
    $lookup: {
      from: 'faculties',
      localField: '_id',
      foreignField: '_id',
      as: 'faculty_info',
    },
  },
  {
    $unwind: '$faculty_info',
  },
  {
    $project: {
      _id: 1,
      'Teacher Name': '$faculty_info.name',
      'Teaching Average': '$teachingAvg',
      'Marking Average': '$markingAvg',
      'Attendance Average': '$attendanceAvg',
    },
  },
];

const UpdateFacultyReviews = (app: Application) => {
  const handleReviewUpdate = async () => {
    const reviewModel = app.service('reviews').Model;

    const review = await reviewModel.aggregate(reviewPipeline).exec();
    console.log(review);
  };

  const job = new CronJob(cronTime, handleReviewUpdate);
  job.start();
};

export default UpdateFacultyReviews;
