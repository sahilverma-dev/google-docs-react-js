import { signOut } from "@firebase/auth";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useContext } from "react";
import { AuthContext } from "../../context/firebase";
import { auth } from "../../fireabase/config";

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  return (
    <header className="sticky gap-2 top-0 z-50 bg-white shadow-md w-100 flex items-center py-2 px-3">
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="h-10 w-10 hidden md:block border-0"
      >
        <Icon name="menu" size="3xl" />
      </Button>
      <Icon name="description" color="blue" size="5xl" />
      <h1 className="hidden md:inline-flex ml-2 text-gray-700 text-2xl">
        Docs
      </h1>
      <div
        className="md:mx-20 w-full flex-shrink flex md:flex-grow items-center px-5 py-3 bg-gray-100 rounded focus-within:text-gray-600 focus-within:shadow-md
      "
      >
        <Icon name="search" size="3xl" color="darkgray" />
        <input
          type="text"
          placeholder="Search..."
          className=" text-gray-600 bg-transparent outline-none md:px-5 px-2 border-0 md:flex-grow text-base"
        />
      </div>
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        ripple="dark"
        className="ml-0 h-10 hidden md:block w-10 border-0"
      >
        <Icon name="apps" size="3xl" color="gray" />
      </Button>
      <img
        src={user?.photoURL}
        alt={user?.displayName}
        title={user?.displayName}
        className="cursor-pointer h-8 w-8 rounded-full "
        onClick={() => {
          signOut(auth);
          setUser(null);
        }}
      />
    </header>
  );
};

export default Header;
