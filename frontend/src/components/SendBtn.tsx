export const SendBtn = () => {
  return (
    <div>
      <input type="checkbox" id="send-checkbox" className="send-checkbox" />
      <label className="send-button">
        <svg
          className="svg-style"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          height="20px"
          width="20px"
        >
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="1.5"
            stroke="#292D32"
            d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"
          ></path>
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="1.5"
            stroke="#292D32"
            d="M10.11 13.6501L13.69 10.0601"
          ></path>
        </svg>
        <span className="message">Send Message</span>
        <span className="message-sent">Message Sent</span>
      </label>
    </div>
  );
};