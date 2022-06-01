import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
import StateToPdfMake from "draft-js-export-pdfmake";
import TextEditor from "../../components/TextEditor";
import { AuthContext } from "../../context/firebase";
import { useContext, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { signOut } from "@firebase/auth";
import { auth, firestore } from "../../fireabase/config";
import { doc, getDoc } from "@firebase/firestore";
import { useState } from "react";

const Editor = () => {
  const { user, setUser } = useContext(AuthContext);
  const [userDoc, setUserDoc] = useState(null);
  const history = useHistory();
  const { id } = useParams();
  if (user === null) history.push("/");

  useEffect(() => {
    const getUerDoc = async () => {
      const docRef = doc(
        firestore,
        "userDocs",
        `${user?.uid}`,
        "docs",
        `${id}`
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setUserDoc(docSnap.data());
      else history.push("/");
    };
    getUerDoc();
  }, [id, user?.uid, history]);
  return (
    <>
      <header className="flex justify-between items-center p-3 pb-1">
        <span className="cursor-pointer">
          <Link to="/">
            <Icon name="description" color="blue" size="5xl" />
          </Link>
        </span>
        <div className="flex-grow px-2">
          <h2 className="">{userDoc?.name}</h2>
          <div className="flex items-center overflow-x-scroll text-sm space-x-1 ml-1 text-gray-600">
            <p className="options">File</p>
            <p className="options">Edit</p>
            <p className="options">View</p>
            <p className="options">Insert</p>
            <p className="options">Format</p>
            <p className="options">Tools</p>
            <p className="options">Add-ons</p>
            <p className="options">Help</p>
          </div>
        </div>
        <Button
          size="regular"
          style={{ background: "#1A73E8" }}
          className="!bg-[#1A73E8] hover:bg-blue-500 !rounded-md md:inline-flex h-10"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple="light"
          onClick={() => {
            const stateToPdfMake = new StateToPdfMake(userDoc?.editorState);
            // console.log(stateToPdfMake.generate());
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
            pdfMake
              .createPdf(stateToPdfMake.generate())
              .download(`${userDoc?.name}.pdf`);
          }}
        >
          <Icon name="download" size="md" />
          <span>Download</span>
        </Button>
        <img
          src={user?.photoURL}
          alt={user?.displayName}
          title={user?.displayName}
          onClick={() => {
            signOut(auth);
            setUser(null);
          }}
          className="cursor-pointer rounded-full h-10 w-10 ml-2"
        />
      </header>
      <TextEditor uid={user?.uid} id={id} />
    </>
  );
};

export default Editor;
