import React from 'react';

const Footer = React.memo((props) => {
  return (
    <footer className="footer section page__footer">
      <p className="footer__copyright">
        &copy;&nbsp;2021 Mesto Russia
      </p>
    </footer>
  )
});

export default Footer;
