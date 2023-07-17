import React from 'react';
import { styled } from 'styled-components';
import { FOOTER_LIST } from './footerdata';

const Footer = () => {
  return (
    <FooterBox>
      <p>© 2023 IIIIEE, Inc.</p>
      <div className="btnBox">
        {FOOTER_LIST.map(info => (
          <button key={info.id}>{info.text}</button>
        ))}
      </div>
      <div className="developer">
        developer : 최진이(F), 양회진(F), 김상원(B), 최리나(B), 신동현(B),
        정성남(B)
      </div>
    </FooterBox>
  );
};

export default Footer;

const FooterBox = styled.div`
  width: 440px;
  padding: 1em 1em 71px 1em;
  background-color: #f7f7f7;

  p {
    font-size: 1em;
  }
  .btnBox {
    padding-bottom: 1em;
    border-bottom: 1px solid #d9d9d9;
    button {
      border: none;
      background: none;
      font-size: 0.6em;
    }
  }
  .developer {
    padding-top: 1em;
    font-size: 0.6em;
  }
`;
