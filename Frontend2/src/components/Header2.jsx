import { Link } from 'react-router-dom';

const Header2 = () => {
  return (
    <header className="flex justify-between items-center mb-10">
      <div className="flex items-center space-x-3">
        <img
          src="/src/assets/icon.png"
          alt="logo"
          className="w-12 h-12 rounded-lg"
        />
        <Link to={"/home"}>
          <h1 className="text-xl font-bold text-purple-700">StudyHub</h1>
        </Link>
        <Link to={"/home"}>
          <button className="ml-4 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 font-medium">
            Overview
          </button>
        </Link>
        <Link to={"/resource"}>
          <span className="text-gray-500">Resources</span>
        </Link>
      </div>
      <div className="text-sm text-gray-500 font-medium">Progress: 0%</div>
    </header>
  );
}

export default Header2
