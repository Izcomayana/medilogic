// components/CookiePopup.tsx
import React from 'react';

interface CookiePopupProps {
  onAccept: () => void;
}

const CookiePopup: React.FC<CookiePopupProps> = ({ onAccept }) => {
  return (
    <div className="fixed bottom-5 left-5 bg-white border border-gray-200 shadow-lg p-4 rounded-lg max-w-sm z-[1000]">
      <p className="text-sm text-gray-700">
        This site uses cookies to improve your experience. By continuing to use
        the site, you accept our use of cookies.
      </p>
      <div className="w-full flex justify-end">
        <button
          onClick={onAccept}
          className="mt-3 p-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Accept Cookies
        </button>
      </div>
    </div>
  );
};

export default CookiePopup;
