import './CProgrammingForm.css';

const CProgrammingForm = () => {
  const courseOutline = [
    {
      title: "Intro to:",
      topics: ["Emacs", "Vim", "Git/Github"]
    },
    {
      title: "Linux",
      topics: ["Basics", "Permissions", "Redirections"]
    },
    {
      title: "C",
      topics: [
        "Basics",
        "Functions",
        "Pointers",
        "Data Structures",
        "Singly Linked Lists",
        "Arrays",
        "Bit Manipulation",
        "Memory Management",
        "File Redirection"
      ]
    },
    {
      title: "Data Structure and Algorithm",
      topics: [
        "Single Linked List",
        "Double Linked List",
        "Hash Table",
        "Sorting Algorithm",
        "Binary Trees",
        "Search Algorithm"
      ]
    },
    {
      title: "Short Details",
      topics: [
        "Programme Duration: 4 Months",
        "Fee: ₦5,000 Monthly",
        "Teaching Method: Physical Classes",
        "Commencement Date: Starts 1 Week Post-Exam",
        "Availability: Limited Slots Available!!!",
        
      ]
    }
  ];

  return (
    <div className="form-container">
      <div className="max-width-container">
        {/* Header */}
        <h1 className="main-header">
          Introduction to Low Level Language (C Programming) & Data Structure and Algorithm
        </h1>

        {/* Course Outline */}
        <div className="course-outline">
          <h2 className="outline-header">Course Outline</h2>
          {courseOutline.map((section, index) => (
            <div key={index} className="outline-section">
              <h3 className="section-title">{section.title}</h3>
              <ul className="outline-list">
                {section.topics.map((topic, idx) => (
                  <li key={idx} className="outline-item">
                    <span className="bullet-point">•</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment Instructions */}
        <div className="payment-instructions">
          <h2 className="details-header">Payment Details</h2>
          <div className="bank-details">
            <p className="instruction-text">
              After making payment, kindly click the "Mark as Paid" button below 
              and send your name and payment receipt to our support team.
            </p>
            
            <div className="bank-info">
              <p><strong>Bank Name:</strong> Opay/Palmpay</p>
              <p><strong>Account Number:</strong> 9169199340</p>
              <p><strong>Account Name:</strong>Ogunleye Emmanuel</p>
              <p className="payment-amount">
                <strong>Amount:</strong> ₦5,000 (Monthly)
              </p>
            </div>

            <a 
              href="https://wa.link/s3kx6o" 
              target="_blank"
              rel="noopener noreferrer"
              className="pay-button"
            >
              Mark as Paid
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CProgrammingForm;