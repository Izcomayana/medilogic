// components/TermsModal.tsx
import React from "react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center">
      <div className="bg-white p-6 max-w-lg max-h-[80vh] overflow-y-auto rounded-lg shadow-lg text-sm">
        <h2 className="text-xl font-bold mb-2">Medilogic – Terms of Service</h2>
        <p className="text-xs text-gray-600 mb-4">
          Effective Date: July 10, 2025
        </p>
        <p>
          Welcome to Medilogic! These Terms of Service (“Terms”) govern your
          access to and use of the Medilogic platform and services.
        </p>
        <p>
          By creating an account or using our services, you agree to these
          Terms. If you do not agree, please do not use our platform.
        </p>

        <hr className="my-4" />

        <h3 className="font-semibold mt-3">1. Use of Service</h3>
        <p>
          Medilogic provides software to manage medical logistics operations.
          Use must comply with laws and these Terms.
        </p>

        <h3 className="font-semibold mt-3">2. Eligibility</h3>
        <p>
          You must be 18+ or authorized by an organization to use Medilogic with
          accurate information.
        </p>

        <h3 className="font-semibold mt-3">3. User Responsibilities</h3>
        <ul className="list-disc list-inside pl-3">
          <li>Use Medilogic lawfully and responsibly.</li>
          <li>Keep your login credentials confidential.</li>
          <li>Report unauthorized use of your account.</li>
        </ul>

        <h3 className="font-semibold mt-3">4. Organization Accounts</h3>
        <p>
          If you&lsquo;re an admin, you&apos;re responsible for all activities
          under your org.
        </p>

        <h3 className="font-semibold mt-3">5. Payment & Subscriptions</h3>
        <p>
          Some features require paid subscriptions. Prices vary by country/user
          type.
        </p>

        <h3 className="font-semibold mt-3">6. Data & Privacy</h3>
        <p>You agree to our Privacy Policy and data handling practices.</p>

        <h3 className="font-semibold mt-3">7. Suspension & Termination</h3>
        <ul className="list-disc list-inside pl-3">
          <li>Violating terms</li>
          <li>Non-payment</li>
          <li>Misusing the platform</li>
        </ul>

        <h3 className="font-semibold mt-3">8. Changes to Terms</h3>
        <p>We may update terms. Continued use = acceptance of updated terms.</p>

        <h3 className="font-semibold mt-3">9. Governing Law</h3>
        <ul className="list-disc list-inside pl-3">
          <li>
            <strong>UK law</strong> for UK users
          </li>
          <li>
            <strong>Nigerian law</strong> for Nigerian users
          </li>
        </ul>

        <h3 className="font-semibold mt-3">10. Contact</h3>
        <p>
          Questions? Email: <strong>support@medilogicapp.com</strong>
        </p>

        <button
          className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TermsModal;
