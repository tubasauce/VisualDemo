import React from 'react';

const AppFooter = () => {
  return (
    <footer>
      <div className="container desktop-only">
        <div className="col-xs-12">
          <div className="justify-spaced small">
            <p>&copy; {(new Date).getFullYear()} Screener Technologies Inc.</p>
            <div>
              <a href="https://status.screener.io" target="_blank" className="space-right-4">Status</a>
              <a href="/terms" className="space-right-4">Terms of Service</a>
              <a href="/terms/privacy">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
