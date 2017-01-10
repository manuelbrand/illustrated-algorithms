import React from 'react';
import {
  transitionValue
} from '../../../utils/transition';

const getOpacity = step => {
  if (!step) {
    return 0;
  }

  const {
    compared,
    returnValue,
  } = step;

  if (returnValue !== undefined) {
    return 1;
  }

  if (!compared || compared.indexOf('guess') === -1) {
    return 0;
  }

  return 1;
};

export default function Comparison({ prevStep, nextStep, stepProgress }, { layout }) {
  const { bindings, returnValue } = nextStep;
  const {
    item,
    guess,
  } = bindings;

  const val = returnValue !== undefined || guess === item ? '=' : (
    guess > item ? '>' : '<'
  );

  const top = layout.getComparisonTopPosition();
  const left = layout.getComparisonLeftPosition();
  const width = layout.getNumberVarHeight();
  const height = width;

  // TODO: Get FiraCode-Light font into the codebase
  return (
    <div
      className="comparison"
      style={{
        top,
        left,
        width,
        height,
        lineHeight: `${height}px`,
        fontSize: layout.getBlockLabelFontSize() * 1.5,
        opacity: transitionValue(
          getOpacity(prevStep, layout),
          getOpacity(nextStep, layout),
          stepProgress,
        ),
      }}
      >
      {val}
      <style jsx>{`
        .comparison {
          position: absolute;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          color: white;
          font-family: 'FiraCode-Light', monospace;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

Comparison.propTypes = {
  nextStep: React.PropTypes.object.isRequired,
  prevStep: React.PropTypes.object,
  stepProgress: React.PropTypes.number.isRequired,
};

Comparison.contextTypes = {
  layout: React.PropTypes.object,
};