import React from 'react';
import './styles.scss';

const ToggleBar = ({ defaultValue, options, onChangeValue }: any) => {
  return (
    <div className="toggle-container">
      {options.map((option: { key: string; label: string }) => (
        <button
          key={option.key}
          className={defaultValue === option.key ? `selected` : 'not'}
          onClick={(e) => {
            onChangeValue(option.key);
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ToggleBar;
