import React, {PropTypes} from 'react';
import Button from '../button/button';
import CopyToClipboard from 'react-copy-to-clipboard';

const ButtonCopy = (p) => {
  return (
    <CopyToClipboard text={p.text}>
      <Button type="primary">
        {p.children}
      </Button>
    </CopyToClipboard>
  );
};

ButtonCopy.propTypes = {
  children: PropTypes.any,
  text: PropTypes.string
};

export default ButtonCopy;
