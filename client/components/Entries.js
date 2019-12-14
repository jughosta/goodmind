import React from 'react';

const Entries = ({ entries }) => {
  return (
    <ul>
      {entries.map(entry => (
        <li key={entry.id}>
          <div>{entry.question}</div>
          <div>{entry.answer}</div>
          <div>{entry.period}</div>
        </li>
      ))}
    </ul>
  );
};

export default Entries;
