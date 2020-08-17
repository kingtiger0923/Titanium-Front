import React from 'react';

function Landing() {
  return (
    <div className="landing">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 p-5">
          <h1 className="p-5">Staying one leap ahead of technology.</h1>
          <p className="px-5">Technology is rapidly changing, making it easy for businesses to operate more efficiently. With over 25 years of experience in communication and technology, we understand the solutions that help transform businesses. Also, our AT&amp;T partnership allows us to provide you with the latest in communications solutions.</p>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 p-5">
          <h1 className="p-5">Superior mobility experience that transforms how you do business.</h1>
          <p className="px-5">We go above and beyond to understand your business operations and create a custom solution that keeps you connected.</p>
        </div>
      </div>
      <div className="footer">
        <img src="./assets/dotFooter.png" width="100%" alt="Footer"/>
      </div>
    </div>
  );
}

export default Landing;