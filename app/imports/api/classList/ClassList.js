import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The ClassListCollection.
 */
class ClassListCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ClassListCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      classAlpha: String,
      classNumber: Number,
      classA: String,
      className: String,
      oneStar: Number,
      twoStar: Number,
      threeStar: Number,
      fourStar: Number,
      fiveStar: Number,
      totalRatings: Number,
      avgRating: Number,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.generalPublicationName = `${this.name}.publication`;
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }

  getTotalRatings() {
    return this.totalRatings;
  }
}

/**
 * The singleton instance of the ClassListCollection.
 * @type {ClassListCollection}
 */
export const ClassList = new ClassListCollection();
