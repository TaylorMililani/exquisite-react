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

  const onInputChange = (value, name) => {
    const newFields = {
      ...poemFields,
      [name]: value
    }
  
    setPoemFields(newFields);
  };

   const isValid = (value) => {
    return value.length > 0
  }
  
  const sendSubmission = (event) => {
    event.preventDefault();
    const submission = props.fields.map((field) => {
      if (field.key) {
        return poemFields[field.key];
      } else {
        return field;
      } 
    });
    props.sendSubmission(submission.join(' '));
    resetForm();
  }

  const inputValues = props.fields.map((field) => {
    if (field.key) {
      return <input
      // name={field.name}
      placeholder={field.placeholder} 
      type="text"
      onChange={(event) => {onInputChange(event.target.value, field.key)}}
      value={poemFields[field.key]}
      key={field.index}
      className={isValid(poemFields[field.key]) ? 'PlayerSubmissionForm__poem-inputs' : 'PlayerSubmissionFormt__input--invalid'}
      data-testid={field.name}
    /> 
    } else {
      return field;
    }
  });

  return (
    <div className="PlayerSubmissionForm">
      <h3>Player Submission Form for Player #{ props.index }</h3>

      <form 
        className="PlayerSubmissionForm__form"
        onSubmit={sendSubmission} >

        <div className="PlayerSubmissionForm__poem-inputs">
          { inputValues }
        </div>

        <div className="PlayerSubmissionForm__submit">
          <input 
          type="submit" 
          value="Submit Line" 
          className="PlayerSubmissionForm__submit-btn"
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
