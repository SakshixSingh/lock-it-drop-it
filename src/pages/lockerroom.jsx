import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Modal, Button, Form } from "react-bootstrap";
import "./lockerroom.css";

function LockerRoom() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newType, setNewType] = useState("note");
  const [newContent, setNewContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Load saved items and apply dark mode
  useEffect(() => {
    document.body.classList.add("dark-mode");
    const saved = localStorage.getItem("lockerCanvasItems");
    if (saved) setItems(JSON.parse(saved));

    return () => {
      document.body.classList.remove("dark-mode");
    };
  }, []);

  // Save items to localStorage on update
  useEffect(() => {
    localStorage.setItem("lockerCanvasItems", JSON.stringify(items));
  }, [items]);

  // Add or Update item
  const handleAddOrEditItem = (e) => {
    e.preventDefault();
    if (newContent.trim() === "") return;

    if (isEditing && editIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editIndex] = {
        ...updatedItems[editIndex],
        type: newType,
        content: newContent,
      };
      setItems(updatedItems);
    } else {
      const newItem = {
        type: newType,
        content: newContent,
        x: 100 + Math.random() * 300,
        y: 100 + Math.random() * 200,
      };
      setItems([...items, newItem]);
    }

    setNewContent("");
    setNewType("note");
    setEditIndex(null);
    setIsEditing(false);
    setShowModal(false);
  };

  const handleEditItem = (index) => {
    setNewType(items[index].type);
    setNewContent(items[index].content);
    setEditIndex(index);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteItem = (indexToDelete) => {
    const newItems = items.filter((_, i) => i !== indexToDelete);
    setItems(newItems);
  };

  const handleDragEnd = (event, info, index) => {
    const newItems = [...items];
    newItems[index].x = info.point.x;
    newItems[index].y = info.point.y;
    setItems(newItems);
  };

  return (
    <div className="locker-container">
      <div className="background-effect">
        <div className="stars"></div>
      </div>

      <h2 className="locker-title">Your Canvas Locker</h2>

      <div className="locker-button-container">
        <Button variant="success" onClick={() => setShowModal(true)}>
          ➕ Add to Locker
        </Button>
      </div>

      {/* Locker Cards */}
      {items.map((item, index) => (
        <motion.div
          key={index}
          drag
          dragMomentum={false}
          whileDrag={{ scale: 1.05 }}
          onDragEnd={(e, info) => handleDragEnd(e, info, index)}
          initial={false}
          className={`locker-card card-${item.type}`}
          style={{
            top: 0,
            left: 0,
            x: item.x,
            y: item.y,
          }}
        >
          <h5 className="text-capitalize">{item.type}</h5>
          <div className="mb-2">
            {item.type === "link" ? (
              <a href={item.content} target="_blank" rel="noreferrer">
                {item.content}
              </a>
            ) : item.type === "video" ? (
              <iframe
                width="100%"
                height="180"
                src={item.content}
                title="YouTube video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ) : (
              <p>{item.content}</p>
            )}
          </div>

          <Button
            variant="outline-primary"
            size="sm"
            className="me-2"
            onClick={() => handleEditItem(index)}
          >
            ✏️ Edit
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => handleDeleteItem(index)}
          >
            🗑️ Delete
          </Button>
        </motion.div>
      ))}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit" : "Add"} Locker Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddOrEditItem}>
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
              >
                <option value="note">Note</option>
                <option value="link">Link</option>
                <option value="video">YouTube Video</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                placeholder={
                  newType === "note"
                    ? "Write your note"
                    : newType === "link"
                    ? "Paste your link (https://...)"
                    : "Paste YouTube embed link"
                }
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {isEditing ? "Update" : "Add"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default LockerRoom;
