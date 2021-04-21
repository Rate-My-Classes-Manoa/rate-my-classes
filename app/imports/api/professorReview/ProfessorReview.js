import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The ProfessorReviewsCollection.
 */
class ProfessorReviewsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ProfessorReviewsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      owner: String,
      createdAt: Date,
      review: String,
      approved: Boolean,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ProfessorReviewsCollection.
 * @type {ProfessorReviewsCollection}
 */
export const ProfessorReviews = new ProfessorReviewsCollection();
