import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The ProfessorListCollection.
 */
class ProfessorListCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ProfessorListCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      firstName: String,
      lastName: String,
      name: String,
      department: String,
      imageLink: String,
      '1star': Number,
      '2star': Number,
      '3star': Number,
      '4star': Number,
      '5star': Number,
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
 * The singleton instance of the ProfessorListCollection.
 * @type {ProfessorListCollection}
 */
export const ProfessorList = new ProfessorListCollection();
