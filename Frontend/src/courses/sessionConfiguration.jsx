import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Session = ({ isOpen, setIsOpen, outline, courseId, topic }) => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("");
  const [noteData, setNoteData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
//   console.log(outline,courseId, topic );
  

  // Fetch notes with Axios
  const fetchNotes = async () => {
    // if (!outline?.id){
    //     console.log("i invokes");
    //      return;
    // }
         // Skip if no outline ID
    // setIsLoading(true);
    // setError(null);
    console.log("this",outline);

    

    try {
        console.log("i invoke");
        
      const response = await axios.get(`https://api.coursepass.me/api/v1//outline/${outline}/notes`);
      console.log(response);
      
      setNoteData(response.data); // Assume [{ session, ... }, ...]
      setSuccess(true);
      if (response.data.length > 0 && !selectedValue) {
        setSelectedValue(response.data[0].session);
      }
      console.log("Note data:", response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch notes");
      setSuccess(false);
      console.log("Note error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchNotes();
    }
  }, [isOpen, outline?.id]);

  const handleSelect = () => {
       navigate(`/notes/${selectedValue}/${outline}/${courseId}/${topic}`);
    // navigate("/notes", {
    //   state: { selectedValue, outline, courseId, topic },
    // });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <style>
        {`
          /* CSS Variables */
          :root {
            --bg-light: #f5f2f5;
            --bg-dark: #252627;
            --text-light: #333;
            --text-dark: #d4d4d4;
            --accent: #007bff;
            --secondary: #6c757d;
            --spacing-sm: 0.5rem;
            --spacing-md: 1rem;
            --spacing-lg: 1.25rem;
            --border-radius: 8px;
          }

          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            overflow: auto;
            padding: var(--spacing-md);
          }

          .modal {
            background: white;
            border-radius: var(--border-radius);
            width: 100%;
            max-width: 400px;
            min-height: 300px;
            padding: var(--spacing-md);
            position: relative;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            gap: var(--spacing-md);
          }

          .close-button {
            position: absolute;
            top: var(--spacing-sm);
            right: var(--spacing-sm);
            background: none;
            border: none;
            cursor: pointer;
            color: #dc3545;
            font-size: 1.5rem;
            padding: var(--spacing-sm);
          }
          .close-button:hover,
          .close-button:focus {
            color: #b02a37;
            outline: 2px solid #dc3545;
            outline-offset: 2px;
          }

          .modal-title {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--text-light);
            text-align: center;
            margin: 0;
          }

          .select-container {
            width: 100%;
            padding: var(--spacing-sm);
          }
          .select {
            width: 100%;
            padding: var(--spacing-sm);
            font-size: 1rem;
            border: 1px solid var(--secondary);
            border-radius: var(--border-radius);
            background: white;
            color: var(--text-light);
            cursor: pointer;
          }
          .select:focus {
            outline: 2px solid var(--accent);
            border-color: var(--accent);
          }

          .open-button {
            background: var(--accent);
            color: white;
            border: none;
            border-radius: var(--border-radius);
            padding: var(--spacing-md);
            font-size: 1.125rem;
            font-weight: bold;
            cursor: pointer;
            width: 100%;
            max-width: 200px;
            margin: 0 auto;
            text-align: center;
          }
          .open-button:hover,
          .open-button:focus {
            background: #0056b3;
            outline: 2px solid var(--accent);
            outline-offset: 2px;
          }

          .loader,
          .error {
            text-align: center;
            color: var(--text-light);
            font-size: 1rem;
            margin: var(--spacing-lg) 0;
          }

          /* Responsive styles */
          @media (max-width: 768px) {
            .modal {
              max-width: 350px;
              min-height: 250px;
              padding: var(--spacing-sm);
            }
            .modal-title {
              font-size: 1.25rem;
            }
            .select {
              font-size: 0.875rem;
            }
            .open-button {
              font-size: 1rem;
              padding: var(--spacing-sm);
              max-width: 180px;
            }
            .close-button {
              font-size: 1.25rem;
            }
          }
          @media (max-width: 480px) {
            .modal {
              max-width: 90%;
              min-height: 200px;
            }
            .modal-title {
              font-size: 1.125rem;
            }
            .select {
              font-size: 0.75rem;
              padding: 0.375rem;
            }
            .open-button {
              font-size: 0.875rem;
              max-width: 150px;
            }
            .close-button {
              font-size: 1rem;
              padding: 0.25rem;
            }
            .loader,
            .error {
              font-size: 0.875rem;
            }
          }
        `}
      </style>
      <div className="modal-overlay">
        <div className="modal">
          <button
            className="close-button"
            onClick={handleClose}
            aria-label="Close modal"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          {isLoading ? (
            <div className="loader">Loading...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <>
              <h2 className="modal-title">Select Session</h2>
              <div className="select-container">
                <select
                  className="select"
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                >
                  {noteData.map((note, id) => (
                    <option key={id} value={note.session}>
                      {note.session}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="open-button"
                onClick={handleSelect}
                disabled={!selectedValue}
                aria-label="Open note"
              >
                Open Note
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Session;