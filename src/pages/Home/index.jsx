// importing components
import Header from "../../components/Header";
import DocRow from "../../components/DocRow/";

// importing material ui
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Modal from "@material-tailwind/react/Modal";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import ModalBody from "@material-tailwind/react/ModalBody";
import { useContext, useEffect, useState } from "react";

// Firestore
import { firestore } from "../../fireabase/config";
import {
  addDoc,
//   getDocs,
  collection,
  serverTimestamp,
//   query,
//   orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useHistory } from "react-router";
import { AuthContext } from "../../context/firebase";

const Home = () => {
  const [showModel, setShoModel] = useState(false);
  const [input, setInput] = useState("");
  const [userDoc, setUserDoc] = useState([]);
  const history = useHistory();

  const { user } = useContext(AuthContext);

  if (user === null) history.push("/login");
  const createDoc = async () => {
    if (!input) return;
    setInput("");
    setShoModel(false);

    const docRef = await addDoc(
      collection(firestore, "userDocs", `${user?.uid}`, "docs"),
      {
        name: `${input}`,
        time: serverTimestamp(),
      }
    );
    history.push(`/doc/${docRef?.id}`);
  };
  const model = (
    <Modal size="sm" active={showModel} toggler={() => setShoModel(false)}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createDoc();
        }}
      >
        <ModalBody>
          <input
            type="text"
            className="outline-none w-full bg-gray-200  p-3 rounded-md"
            placeholder="Enter name of the document."
            onChange={({ target }) => setInput(target.value)}
            value={input}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="blue"
            buttonType="link"
            onClick={() => setShoModel(false)}
            ripple="dark"
          >
            Cancle
          </Button>
          <Button color="blue" onClick={createDoc} ripple="dark" type="submit">
            Create
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );

  useEffect(() => {
    const unsub = onSnapshot(
      collection(firestore, "userDocs", `${user?.uid}`, "docs"),
      (snap) => {
        setUserDoc(
          snap.docs?.map((doc) => ({
            id: doc?.id,
            ...doc.data(),
          }))
        );
      }
    );
    return () => unsub();
  }, [user?.uid]);
  return (
    <>
      <Header />
      {model}
      <section
        style={{ background: "#f8f9fa" }}
        className="bg-[#f8f9fa] p-2 w-full mx-auto md:pb-10 md:px-10 "
      >
        <div className="max-w-3xl w-full mx-auto">
          <div className="py-6 flex items-center justify-between">
            <h2 className="text-gray-700">Start a new document</h2>
            <Button
              color="gray"
              ripple="dark"
              buttonType="outline"
              iconOnly={true}
              className="border-0"
            >
              <Icon name="more_vert" size="3xl" />
            </Button>
          </div>
          <div>
            <div
              className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700"
              onClick={() => setShoModel(true)}
            >
              <img src="https://links.papareact.com/pju" alt="add-doc" />
            </div>
            <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">
              Blank
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white w-full md:px-10 md:mb-20">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex p-4 items-center justify-between">
            <h2 className="font-medium flex-grow">My Document</h2>
            <p className="mr-12">Date Created</p>
            <Icon name="folder" size="3xl" color="gray" />
          </div>
        </div>
        {userDoc.length === 0 ? (
          <div className="w-full text-center py-5">No documents</div>
        ) : (
          ""
        )}
        {userDoc?.map((doc) => (
          <DocRow
            id={doc?.id}
            key={doc?.id}
            fileName={doc?.name}
            date={doc?.time}
          />
        ))}
      </section>
    </>
  );
};

export default Home;
