import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { ClassReviews } from '../../api/classReview/ClassReview';
import { ProfessorReviews } from '../../api/professorReview/ProfessorReview';
import { Events } from '../../api/events/Events';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

function addClassReviews(data) {
  console.log(`  Adding review for ${data.className} by (${data.owner})`);
  ClassReviews.collection.insert(data);
}

function addProfessorReviews(data) {
  console.log(`  Adding review for ${data.professorName} by (${data.owner})`);
  ProfessorReviews.collection.insert(data);
}
function addEvent(data) {
  console.log(`  Adding: ${data.eventName}`);
  Events.collection.insert(data);
}

// Initialize the ClassReviewsCollection if empty.
if (ClassReviews.collection.find().count() === 0) {
  if (Meteor.settings.defaultClassReviews) {
    console.log('Creating default class reviews.');
    Meteor.settings.defaultClassReviews.map(data => addClassReviews(data));
  }
}

// Initialize the ProfessorReviewsCollection if empty.
if (ProfessorReviews.collection.find().count() === 0) {
  if (Meteor.settings.defaultClassReviews) {
    console.log('Creating default professor reviews.');
    Meteor.settings.defaultProfessorReviews.map(data => addProfessorReviews(data));
  }
}

// Initialize the EventsCollection if empty.
if (Events.collection.find().count() === 0) {
  if (Meteor.settings.defaultEvents) {
    console.log('Creating default events.');
    Meteor.settings.defaultEvents.map(data => addEvent(data));
  }
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}
