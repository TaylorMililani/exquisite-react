import React, { useState } from 'react';
import './Game.css';
import PlayerSubmissionForm from './PlayerSubmissionForm';
import FinalPoem from './FinalPoem';
import RecentSubmission from './RecentSubmission';

const Game = () => {
  const exampleFormat = FIELDS.map((field) => {
    if (field.key) {
      return field.placeholder;
    } else {
      return field;
    }
  }).join(' ');

  const [submissions, setSubmissions] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const addSubmission = (submission) => {
    setSubmissions([...submissions,submission])
  }
  
  const revealPoem = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  }

  const recentSubmission = isSubmitted ? '' : <RecentSubmission submission={ submissions[submissions.length - 1]} />

  const playerForm = isSubmitted ? '' : <PlayerSubmissionForm 
  index={submissions.length + 1}
  sendSubmission={addSubmission}
  fields={FIELDS} 
  />

  return (
    <div className="Game">
      <h2>Game</h2>

      <p>Each player should take turns filling out and submitting the form below. Each turn should be done individually and <em>in secret!</em> Take inspiration from the revealed recent submission. When all players are finished, click the final button on the bottom to reveal the entire poem.</p>

      <p>Please follow the following format for your poetry submission:</p>

      <p className="Game__format-example">
        { exampleFormat }
      </p>

      {recentSubmission}

      {playerForm}
{/* 
      <RecentSubmission submission={ submissions[submissions.length - 1]} />

      <PlayerSubmissionForm 
        index={submissions.length + 1}
        sendSubmission={addSubmission}
        fields={FIELDS} 
      /> */}

      <FinalPoem 
        isSubmitted={isSubmitted}
        submissions={submissions}
        revealPoem={revealPoem}
      />

    </div>
  );
}


export const FIELDS = [
  'The',
  {
    key: 'adj1',
    placeholder: 'adjective',
  },
  {
    key: 'noun1',
    placeholder: 'noun',
  },
  {
    key: 'adv',
    placeholder: 'adverb',
  },
  {
    key: 'verb',
    placeholder: 'verb',
  },
  'the',
  {
    key: 'adj2',
    placeholder: 'adjective',
  },
  {
    key: 'noun2',
    placeholder: 'noun',
  },
  '.',
];

export default Game;
