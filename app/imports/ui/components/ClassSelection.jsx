import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const classOptions = [
  { key: 'ICS 101', text: 'ICS 101', value: 'ICS 101' },
  { key: 'ICS 102', text: 'ICS 102', value: 'ICS 102' },
  { key: 'ICS 103', text: 'ICS 103', value: 'ICS 103' },
  { key: 'ICS 110', text: 'ICS 110', value: 'ICS 110' },
  { key: 'ICS 111', text: 'ICS 111', value: 'ICS 111' },
  { key: 'ICS 141', text: 'ICS 141', value: 'ICS 141' },
  { key: 'ICS 211', text: 'ICS 211', value: 'ICS 211' },
  { key: 'ICS 212', text: 'ICS 212', value: 'ICS 212' },
  { key: 'ICS 215', text: 'ICS 215', value: 'ICS 215' },
  { key: 'ICS 222', text: 'ICS 222', value: 'ICS 222' },
  { key: 'ICS 235', text: 'ICS 235', value: 'ICS 235' },
  { key: 'ICS 241', text: 'ICS 241', value: 'ICS 241' },
  { key: 'ICS 290', text: 'ICS 290', value: 'ICS 290' },
  { key: 'ICS 311', text: 'ICS 311', value: 'ICS 311' },
  { key: 'ICS 312', text: 'ICS 312', value: 'ICS 312' },
  { key: 'ICS 313', text: 'ICS 313', value: 'ICS 313' },
  { key: 'ICS 314', text: 'ICS 314', value: 'ICS 314' },
  { key: 'ICS 321', text: 'ICS 321', value: 'ICS 321' },
  { key: 'ICS 331', text: 'ICS 331', value: 'ICS 331' },
  { key: 'ICS 332', text: 'ICS 332', value: 'ICS 332' },
  { key: 'ICS 351', text: 'ICS 351', value: 'ICS 351' },
  { key: 'ICS 355', text: 'ICS 355', value: 'ICS 355' },
  { key: 'ICS 361', text: 'ICS 361', value: 'ICS 361' },
  { key: 'ICS 390', text: 'ICS 390', value: 'ICS 390' },
  { key: 'ICS 414', text: 'ICS 414', value: 'ICS 414' },
  { key: 'ICS 415', text: 'ICS 415', value: 'ICS 415' },
  { key: 'ICS 419', text: 'ICS 419', value: 'ICS 419' },
  { key: 'ICS 421', text: 'ICS 421', value: 'ICS 421' },
  { key: 'ICS 422', text: 'ICS 422', value: 'ICS 422' },
  { key: 'ICS 423', text: 'ICS 423', value: 'ICS 423' },
  { key: 'ICS 424', text: 'ICS 424', value: 'ICS 424' },
  { key: 'ICS 425', text: 'ICS 425', value: 'ICS 425' },
  { key: 'ICS 426', text: 'ICS 426', value: 'ICS 426' },
  { key: 'ICS 427', text: 'ICS 427', value: 'ICS 427' },
  { key: 'ICS 428', text: 'ICS 428', value: 'ICS 428' },
  { key: 'ICS 431', text: 'ICS 431', value: 'ICS 431' },
  { key: 'ICS 432', text: 'ICS 432', value: 'ICS 432' },
  { key: 'ICS 434', text: 'ICS 434', value: 'ICS 434' },
  { key: 'ICS 435', text: 'ICS 435', value: 'ICS 435' },
  { key: 'ICS 438', text: 'ICS 438', value: 'ICS 438' },
  { key: 'ICS 441', text: 'ICS 441', value: 'ICS 441' },
  { key: 'ICS 442', text: 'ICS 442', value: 'ICS 442' },
  { key: 'ICS 443', text: 'ICS 443', value: 'ICS 443' },
  { key: 'ICS 451', text: 'ICS 451', value: 'ICS 451' },
  { key: 'ICS 452', text: 'ICS 452', value: 'ICS 452' },
  { key: 'ICS 455', text: 'ICS 455', value: 'ICS 455' },
  { key: 'ICS 461', text: 'ICS 461', value: 'ICS 461' },
  { key: 'ICS 462', text: 'ICS 462', value: 'ICS 462' },
  { key: 'ICS 464', text: 'ICS 464', value: 'ICS 464' },
  { key: 'ICS 465', text: 'ICS 465', value: 'ICS 465' },
  { key: 'ICS 466', text: 'ICS 466', value: 'ICS 466' },
  { key: 'ICS 469', text: 'ICS 469', value: 'ICS 469' },
  { key: 'ICS 471', text: 'ICS 471', value: 'ICS 471' },
  { key: 'ICS 475', text: 'ICS 475', value: 'ICS 475' },
  { key: 'ICS 476', text: 'ICS 476', value: 'ICS 476' },
  { key: 'ICS 481', text: 'ICS 481', value: 'ICS 481' },
  { key: 'ICS 483', text: 'ICS 483', value: 'ICS 483' },
  { key: 'ICS 484', text: 'ICS 484', value: 'ICS 484' },
  { key: 'ICS 485', text: 'ICS 485', value: 'ICS 485' },
  { key: 'ICS 486', text: 'ICS 486', value: 'ICS 486' },
  { key: 'ICS 491', text: 'ICS 491', value: 'ICS 491' },
  { key: 'ICS 495', text: 'ICS 495', value: 'ICS 495' },
  { key: 'ICS 496', text: 'ICS 496', value: 'ICS 496' },
  { key: 'ICS 499', text: 'ICS 499', value: 'ICS 499' },
];

const ClassSelection = () => (
  <Dropdown
    id={'classOptions'}
    placeholder={'Select a Class'}
    fluid
    search
    selection
    options={classOptions}
  />
);

export default ClassSelection;
