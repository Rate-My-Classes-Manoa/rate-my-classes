import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Profiles } from '../../Profiles/Profiles';
import { ClassReviews } from '../../api/classReview/ClassReview';
import { ClassList } from '../../api/classList/ClassList';
import { ProfessorReviews } from '../../api/professorReview/ProfessorReview';
import { ProfessorList } from '../../api/professorList/ProfessorList';
import { Events } from '../../api/events/Events';
import { ClassReviewsForUserpage } from '../../api/classReview/ClassReviewForUserpage';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

function addClassList(data) {
  console.log(`  Adding class ${data.class}`);
  ClassList.collection.insert(data);
}

function addProfessorList(data) {
  console.log(`  Adding Professor ${data.lastName}`);
  ProfessorList.collection.insert(data);
}

function updateTotalClassReviewsCount(className) {
  const record = ClassList.collection.findOne({ class: className });
  const totalRating = record.totalRatings + 1;
  ClassList.collection.update(record._id, { $set: { totalRatings: totalRating } });
}

function updateAvgRating(className) {
  const record = ClassList.collection.findOne({ class: className });
  const avgRating = record.avgRating / record.totalRatings;
  ClassList.collection.update(record._id, { $set: { avgRating: avgRating } });
}

function updateRatingsCount(className, stars) {
  const record = ClassList.collection.findOne({ class: className });
  const ratings = {
    1: record['1star'],
    2: record['2star'],
    3: record['3star'],
    4: record['4star'],
    5: record['5star'],
  };

  switch (stars) {
  case 1:
    ClassList.collection.update(record._id, { $set: { '1star': ratings[1] + 1 } });
    updateAvgRating(className);
    break;
  case 2:
    ClassList.collection.update(record._id, { $set: { '2star': ratings[2] + 1 } });
    updateAvgRating(className);
    break;
  case 3:
    ClassList.collection.update(record._id, { $set: { '3star': ratings[3] + 1 } });
    updateAvgRating(className);
    break;
  case 4:
    ClassList.collection.update(record._id, { $set: { '4star': ratings[4] + 1 } });
    updateAvgRating(className);
    break;
  case 5:
    ClassList.collection.update(record._id, { $set: { '5star': ratings[5] + 1 } });
    updateAvgRating(className);
    break;
  default:
  }
}

function addClassReviews(data) {
  console.log(`  Adding review for ${data.className} by (${data.owner})`);
  ClassReviews.collection.insert(data);
  if (data.approved === true) {
    updateTotalClassReviewsCount(data.className);
    updateRatingsCount(data.className, data.rating);
  }
}

function addClassReviewsForUserpage(data) {
  console.log(`  Adding review for ${data.className} by (${data.owner})`);
  ClassReviewsForUserpage.collection.insert(data);
}

function updateTotalProfReviewsCount(name) {
  const record = ProfessorList.collection.findOne({ name: name });
  const totalRating = record.totalRatings + 1;
  ProfessorList.collection.update(record._id, { $set: { totalRatings: totalRating } });
}

function updateProfAvgRating(name) {
  const record = ProfessorList.collection.findOne({ name: name });
  const avgRating = record.avgRating / record.totalRatings;
  ProfessorList.collection.update(record._id, { $set: { avgRating: avgRating } });
}

function updateProfRatingsCount(name, stars) {
  const record = ProfessorList.collection.findOne({ name: name });
  const ratings = {
    1: record['1star'],
    2: record['2star'],
    3: record['3star'],
    4: record['4star'],
    5: record['5star'],
  };

  switch (stars) {
  case 1:
    ProfessorList.collection.update(record._id, { $set: { '1star': ratings[1] + 1 } });
    updateProfAvgRating(name);
    break;
  case 2:
    ProfessorList.collection.update(record._id, { $set: { '2star': ratings[2] + 1 } });
    updateProfAvgRating(name);
    break;
  case 3:
    ProfessorList.collection.update(record._id, { $set: { '3star': ratings[3] + 1 } });
    updateProfAvgRating(name);
    break;
  case 4:
    ProfessorList.collection.update(record._id, { $set: { '4star': ratings[4] + 1 } });
    updateProfAvgRating(name);
    break;
  case 5:
    ProfessorList.collection.update(record._id, { $set: { '5star': ratings[5] + 1 } });
    updateProfAvgRating(name);
    break;
  default:
  }
}

function addProfessorReviews(data) {
  console.log(`  Adding review for ${data.professorName} by (${data.owner})`);
  ProfessorReviews.collection.insert(data);
  if (data.approved === true) {
    updateTotalProfReviewsCount(data.professorName);
    updateProfRatingsCount(data.professorName, data.rating);
  }
}
function addEvent(data) {
  console.log(`  Adding: ${data.eventName}`);
  Events.collection.insert(data);
}

// Initialize the ProfessorListCollection if empty.
if (ProfessorList.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfessorList) {
    console.log('Creating default professor list.');
    Meteor.settings.defaultProfessorList.map(data => addProfessorList(data));
  }
}

// Initialize the ClassListCollection if empty.
if (ClassList.collection.find().count() === 0) {
  if (Meteor.settings.defaultClassList) {
    console.log('Creating default class list.');
    Meteor.settings.defaultClassList.map(data => addClassList(data));
  }
}

// Initialize the ClassReviewsCollection if empty.
if (ClassReviews.collection.find().count() === 0) {
  if (Meteor.settings.defaultClassReviews) {
    console.log('Creating default class reviews.');
    Meteor.settings.defaultClassReviews.map(data => addClassReviews(data));
  }
}

if (ClassReviewsForUserpage.collection.find().count() === 0) {
  if (Meteor.settings.defaultClassReviews) {
    console.log('Creating default class reviews for user page.');
    Meteor.settings.defaultClassReviews.map(data => addClassReviewsForUserpage(data));
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

// Initialize the database with a default profile document.
function addProfile(profile) {
  console.log(`  Adding: ${profile.firstName} ${profile.lastName}`);
  Profiles.collection.insert(profile);
}

// Initialize the ProfilesCollection if empty.
if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.map(profile => addProfile(profile));
  }
}
