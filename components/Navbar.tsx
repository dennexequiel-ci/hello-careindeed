
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <a href="/">
            <Image src="/ci-logo.webp" alt="Company Logo" width={180} height={20}/>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;