import "./App.css";

import React, { useState } from "react";

import Modal from "react-modal";

import SongTable from "./components/SongTable";
import AddSongForm from "./components/AddSongForm";

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="App">
      <div className="App-header">
        <SongTable />

        <button style={{ marginTop: 50 }} className="btn" onClick={openModal}>
          Request Song
        </button>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={modalStyle}
        >
          <AddSongForm />
        </Modal>
      </div>
    </div>
  );
};

export default App;
