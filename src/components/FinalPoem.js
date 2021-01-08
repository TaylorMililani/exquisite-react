import React from 'react';
import PropTypes from 'prop-types';
import './FinalPoem.css';

const FinalPoem = (props) => {

  const button = 
    <div className="FinalPoem__reveal-btn-container">
      <input type="button" value="We are finished: Reveal the Poem" className="FinalPoem__reveal-btn" onClick={props.revealPoem} />
    </div>

  const completePoemLines = props.submissions.map((submission, index) => {
    return <p key={index}>{submission}</p>
  })

  const completePoem =
    <section className="FinalPoem__poem">
      <h3>Final Poem</h3>
      {completePoemLines}
    </section>
    
  const buttonOrPoem = props.isSubmitted ? completePoem : button

  return (
    <div className="FinalPoem">
      {buttonOrPoem}
    </div>
  );
}

FinalPoem.propTypes = {
  isSubmitted: PropTypes.bool.isRequired,
  submissions: PropTypes.arrayOf(PropTypes.string).isRequired,
  revealPoem: PropTypes.func.isRequired,
};

export default FinalPoem;
