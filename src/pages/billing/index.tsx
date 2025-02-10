import './style.scss';

export const Billing = () => {
  return (
    <div className="billing-page">
      <div className="billing-container">
        <div className="billing-card">
          <div className='billing-card-header'>
            <h2>Current Plan - <span>Free</span></h2>
            <button className="change-plan">Change Plan</button>
          </div>
          <div className='billing-card-body'>
            <h3>$0.00 <span>(Tax inclusive)</span></h3>
            <p>Next Charge:</p>
          </div>
          <div className='billing-card-footer'>
            <h4>View Upcoming Bill</h4>
            <p>Clients: <span>0/50</span></p>
          </div>
        </div>
        <div className="billing-card">
          <div className='billing-card-header'>
            <h2>Billing Details</h2>
            <button className="change-plan">Credit: $0.00</button>
          </div>
          <div className='billing-card-body'>
            <h3>Billing Period</h3>
            <h4>Monthly</h4>
            <button className="credit-card">Credit Card</button>
          </div>
        </div>
        <div className="billing-card">
          <h2>Bill History:</h2>
          <h3>No Bills</h3>
        </div>
        <div className="billing-card">
          <h2>Bills - <span>Contact</span></h2>
          <div className="contact-info">
            <img src="path/to/avatar.jpg" alt="Avatar" />
            <p>Mike Jones</p>
            <p>mikejones@gmail.com</p>
            <button>Change Contact</button>
          </div>
        </div>
      </div>
    </div>
  );
}