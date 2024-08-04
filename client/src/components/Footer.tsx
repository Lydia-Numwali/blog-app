const Footer = () => {
  return (
    <footer className="bg-gray-900 mt-24 pt-24">
      <ul className="flex items-center justify-center gap-6 mb-16">
        <li>
          <span className="bg-gray-700 text-white py-2 px-4 rounded-md transition-colors hover:bg-white hover:text-gray-900">
            Education
          </span>
        </li>
        <li>
          <span className="bg-gray-700 text-white py-2 px-4 rounded-md transition-colors hover:bg-white hover:text-gray-900">
            Sciences
          </span>
        </li>
        <li>
          <span className="bg-gray-700 text-white py-2 px-4 rounded-md transition-colors hover:bg-white hover:text-gray-900">
            Business
          </span>
        </li>
        <li>
          <span className="bg-gray-700 text-white py-2 px-4 rounded-md transition-colors hover:bg-white hover:text-gray-900">
            Fashion
          </span>
        </li>
        <li>
          <span className="bg-gray-700 text-white py-2 px-4 rounded-md transition-colors hover:bg-white hover:text-gray-900">
            Technology
          </span>
        </li>
        <li>
          <span className="bg-gray-700 text-white py-2 px-4 rounded-md transition-colors hover:bg-white hover:text-gray-900">
            Uncategorized
          </span>
        </li>
      </ul>
      <div className="text-center border-t-2 border-gray-700 py-4 text-white font-light">
        <small>All Rights Reserved &copy; Copyright, 2024</small>
      </div>
    </footer>
  );
};

export default Footer;
