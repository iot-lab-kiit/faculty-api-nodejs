import { Application } from '../declarations';
import users from './users/users.service';
import reviews from './reviews/reviews.service';
import faculties from './faculties/faculties.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(reviews);
  app.configure(faculties);
}