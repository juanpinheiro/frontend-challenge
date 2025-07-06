import logo from '@/assets/logo.svg';

const Header = () => {
  return (
    <header className="bg-white">
      <div className="container mx-auto px-4 py-6">
        <h1 className="">
          <img src={logo} alt="Upgrade Logo" />
        </h1>
      </div>
    </header>
  );
};

export default Header;
