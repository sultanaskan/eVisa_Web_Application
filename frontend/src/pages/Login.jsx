import React, { useState } from 'react';
import ULGHeader from '../components/ULGHeader.jsx';
import TabSwitcher from '../components/TabSwitcher.jsx';
import LoginForm from '../components/LoginForm.jsx';
import ULGFooter from '../components/ULGFooter.jsx';


function Login() {
  const [activeTab, setActiveTab] = useState('username'); // 'cert' or 'mobile'

  return (
    <div className="page-container">
      <ULGHeader />
      
      <main className="login-card">
        <h2>Login</h2>
        
        {/* Pass state to the switcher to change tabs */}
        <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="form-content">
          {activeTab === 'username' && <LoginForm />}
          {activeTab === 'cert' && <p>Insert your card...</p>}
          {activeTab === 'mobile' && <p>Open ConsentID app...</p>}
        </div>

        <div className="registration-link">
          Don't have an account? <a href="/register">Register here.</a>
        </div>
      </main>

      <ULGFooter />
    </div>
  );
}

export default Login;