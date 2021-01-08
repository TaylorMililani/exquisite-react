import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './PlayerSubmissionForm.css';

const PlayerSubmissionForm = (props) => {

  const emptyValues = {};
  props.fields.forEach((field) => {
    if (field.key) {
      emptyValues[field.key] = '';
    }
  });
  
    
  const [poemFields, setPoemFields] = useState(emptyValues)

  const resetForm = () => {
    setPoemFields(emptyValues)
  }

  const onInputChange = (id, value) => {
    const newFields = {
      ...poemFields,
      [id]: value
    }
    setPoemFields(newFields);
  };
  
  const sendSubmission = (event) => {
    event.preventDefault();
    const submission = props.fields.map((field) => {
      if (field.key) {
        // if (field.key.value !== '') {
        return field.key.value;
        // }
      } else {
        return field;
      } 
    });
    props.sendSubmission(submission.join(' '));
    resetForm();
  }

  return (
    <div className="PlayerSubmissionForm">
      <h3>Player Submission Form for Player #{props.index}</h3>

      <form className="PlayerSubmissionForm__form" >

        <div className="PlayerSubmissionForm__poem-inputs">
          <input
            placeholder="adjective"
            type="text" 
            name='adj1'
            data-testid='adj1'
            value={props.fields.adj1}
            onChange={onInputChange}
          />
          <input
            placeholder='noun'
            type='text'
            name='noun1'
            data-testid='noun1'
            value={props.fields.noun1}
            onChange={onInputChange}
          />
          <input
            placeholder='adverb'
            type='text'
            name='adv'
            data-testid='adv'
            value={props.fields.adv}
            onChange={onInputChange}
          />
          <input
            placeholder='verb'
            type='text'
            name='verb'
            data-testid='verb'
            value={props.fields.verb}
            onChange={onInputChange}
          />
          <input
            placeholder='adjective'
            type='text'
            name='adj2'
            data-testid='adj2'
            value={props.fields.adj2}
            onChange={onInputChange}
          />
          <input
            placeholder='noun'
            type='text'
            name='noun2'
            data-testid='noun2'
            value={props.fields.noun2}
            onChange={onInputChange}
          />
        </div>

        <div className="PlayerSubmissionForm__submit">
          <input 
          type="submit" 
          value="Submit Line" 
          className="PlayerSubmissionForm__submit-btn"
          onSubmit={sendSubmission}
          />
        </div>
      </form>
    </div>
  );
}

PlayerSubmissionForm.propTypes = {
  index: PropTypes.number.isRequired,
  sendSubmission: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
    }),
  ])).isRequired,
}

export default PlayerSubmissionForm;
