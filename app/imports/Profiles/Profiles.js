import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The StuffsCollection. It encapsulates state and variable values for stuff.
 */
class ProfilesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ProfilesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    // this.schema = new SimpleSchema({
    //   firstName: { type: String },
    //   lastName: { type: String },
    //   owner: String,
    //   bio: String,
    //   classes: SimpleSchema.oneOf(String, Array),
    //   'classes.$': { type: String },
    //   reviews: SimpleSchema.oneOf(String, Object),
    // }, { tracker: Tracker });
    // // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    // this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    console.log(this.userPublicationName);
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {StuffsCollection}
 */
export const Profiles = new ProfilesCollection();
