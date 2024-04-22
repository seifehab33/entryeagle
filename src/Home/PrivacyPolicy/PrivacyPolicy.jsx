import React from "react";
import { Link } from "react-router-dom";
function PrivacyPolicy() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <p className="mb-4">Last updated: [3-11-2024]</p>
          <p className="mb-4">
            [Entry Eagle] ("us", "we", or "our") operates [Entry Eagle] (the
            "Site"). This page informs you of our policies regarding the
            collection, use, and disclosure of Personal Information we receive
            from users of the Site.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-4">
            Information Collection And Use
          </h2>
          <p className="mb-4">
            While using our Site, we may ask you to provide us with certain
            personally identifiable information that can be used to contact or
            identify you. Personally identifiable information may include, but
            is not limited to your name ("Personal Information").
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-4">Log Data</h2>
          <p className="mb-4">
            Like many site operators, we collect information that your browser
            sends whenever you visit our Site ("Log Data"). This Log Data may
            include information such as your computer's Internet Protocol ("IP")
            address, browser type, browser version, the pages of our Site that
            you visit, the time and date of your visit, the time spent on those
            pages, and other statistics.
          </p>

          {/* Add more sections as necessary */}

          <h2 className="text-2xl font-bold mt-6 mb-4">Security</h2>
          <p className="mb-4">
            The security of your Personal Information is important to us, but
            remember that no method of transmission over the Internet, or method
            of electronic storage, is 100% secure. While we strive to use
            commercially acceptable means to protect your Personal Information,
            we cannot guarantee its absolute security.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mt-6 mb-4">
            Changes To This Privacy Policy
          </h2>
          <p className="mb-4">
            This Privacy Policy is effective as of [3-11-2024] and will remain
            in effect except with respect to any changes in its provisions in
            the future, which will be in effect immediately after being posted
            on this page.
          </p>

          <p className="mb-4">
            We reserve the right to update or change our Privacy Policy at any
            time and you should check this Privacy Policy periodically. Your
            continued use of the Service after we post any modifications to the
            Privacy Policy on this page will constitute your acknowledgment of
            the modifications and your consent to abide and be bound by the
            modified Privacy Policy.
          </p>

          <p className="mb-4">
            If we make any material changes to this Privacy Policy, we will
            notify you either through the email address you have provided us, or
            by placing a prominent notice on our website.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-4">Contact Us</h2>
          <p className="mb-4 capitalize">
            If you have any questions about this Privacy Policy, please{" "}
            <Link
              className="capitalize underline text-[#ee5c24] font-bold"
              to="/ContactUs"
            >
              contact us.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
