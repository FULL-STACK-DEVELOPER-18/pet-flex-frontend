import { CheckMarkIcon, PaymentPetflexClapIcon } from '../../assets/svg-images';
import './style.scss';

export const Payments = () => {
  return (
    <div className="pricing-container">
      <h1 className="pricing-title">Our Pricing</h1>
      <div className="pricing-cards">
        <div className="card">
          <div className='card-header'>
            <PaymentPetflexClapIcon/>
            <h2>Pet Owner</h2>
          </div>
          <p>Charge of $3.50 p/month there after.</p>
          <h3>$0 <span>First 4 weeks</span></h3>
          <hr />
          <h4>Whats Included</h4>
          <ul>
            <li><CheckMarkIcon /> Videos & Pictured instructions</li>
            <li><CheckMarkIcon /> Trainer search</li>
            <li><CheckMarkIcon /> Blog</li>
          </ul>
          <button>Get Started!</button>
        </div>
        <div className="card popular">
          <div className='card-header'>
            <PaymentPetflexClapIcon/>
            <h2>Trainer Starter</h2>
          </div>
          <p>Great to get going.</p>
          <h3>$10 <span>p/month</span></h3>
          <hr />
          <h4>Whats Included</h4>
          <ul>
            <li><CheckMarkIcon /> 25 uploads</li>
            <li><CheckMarkIcon /> Analytics</li>
            <li><CheckMarkIcon /> Calendar & Charts</li>
            <li><CheckMarkIcon /> Share Features</li>
          </ul>
          <button>Get Started!</button>
        </div>
        <div className="card">
          <div className='card-header'>
            <PaymentPetflexClapIcon/>
            <h2>Top Flexer</h2>
          </div>
          <p>Top tier service.</p>
          <h3>$25 <span>p/month</span></h3>
          <hr />
          <h4>Whats Included</h4>
          <ul>
            <li><CheckMarkIcon /> Unlimited uploads</li>
            <li><CheckMarkIcon /> Analytics</li>
            <li><CheckMarkIcon /> Calendar & Charts</li>
            <li><CheckMarkIcon /> Share Features</li>
          </ul>
          <button>Get Started!</button>
        </div>
      </div>
    </div>
  );
};