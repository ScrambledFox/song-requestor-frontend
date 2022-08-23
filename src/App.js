import React, { useState, useEffect } from "react";
import { useDocumentTitle } from "./hooks/useDocumentTitle";

import Modal from "react-modal";

import "./App.css";

import SongTable from "./components/SongTable";
import AddSongForm from "./components/AddSongForm";

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useDocumentTitle("List");

  return (
    <div className="App">
      <div className="App-header">
        <button
          style={{ marginBottom: 50 }}
          className="btn"
          onClick={openModal}
        >
          Request Song
        </button>

        <SongTable />

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="modal"
          overlayClassName="modal-overlay"
          ariaHideApp={false}
        >
          <AddSongForm />
        </Modal>
      </div>
    </div>
  );
};

export default App;
