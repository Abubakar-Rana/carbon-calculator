// import React from 'react';
// import styled from 'styled-components';
// // Import the Calculator icon from lucide-react
// import { Calculator } from 'lucide-react';

// // The component now accepts the same props as your original button
// interface CalculateButtonProps {
//   onClick: () => void;
//   isProcessing: boolean;
// }

// const CalculateButton: React.FC<CalculateButtonProps> = ({ onClick, isProcessing }) => {
//   return (
//     <StyledWrapper>
//       <button 
//         className="button" 
//         onClick={onClick} 
//         disabled={isProcessing}
//       >
//         <div className="icon">
//           <span className="text-icon hide">Icon</span>
//           {/* Replaced SVG with the Calculator icon */}
//           <Calculator 
//             className="css-i6dzq1" 
//             height={24} 
//             width={24} 
//             stroke="currentColor"
//             strokeWidth={2}
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </div>
//         {/* The title is now dynamic */}
//         <span className="title"> 
//           {isProcessing ? "Calculating..." : "Calculate Emissions"}
//         </span>
//         <div className="padding-left hide">
//           <div className="padding-left-line">
//             <span className="padding-left-text">Left Padding</span>
//           </div>
//         </div>
//         <div className="padding-right hide">
//           <div className="padding-right-line">
//             <span className="padding-right-text">Right Padding</span>
//           </div>
//         </div>
//         <div className="background hide">
//           <span className="background-text">Background</span>
//         </div>
//         <div className="border hide">
//           <span className="border-text">Border Radius</span>
//         </div>
//       </button>
//     </StyledWrapper>
//   );
// }

// const StyledWrapper = styled.div`
//   .button {
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 10px;
//     font-size: 14px;
//     /* --- COLOR UPDATED --- */
//     background-image: linear-gradient(#10b981, #059669);
//     color: white;
//     /* --- COLOR UPDATED --- */
//     border: solid 2px #047857;
//     height: 50px;
//     padding: 0px 20px;
//     border-radius: 5px;
//     font-weight: 600;
//     transform: scale(0.89);
//     position: relative;
//     transition: all 0.2s ease; /* Added transition for disabled state */
//   }
//   .button:not(:hover) .hide,
//   .button:not(:hover) .icon::before,
//   .button:not(:hover) .icon::after {
//     opacity: 0;
//     visibility: hidden;
//     transform: scale(1.4);
//   }
//   .hide {
//     transition: all 0.2s ease;
//   }
//   .button:active {
//     /* --- COLOR UPDATED --- */
//     background-image: linear-gradient(#059669, #10b981);
//     /* --- COLOR UPDATED --- */
//     border-color: #059669;
//   }

//   /* --- NEW: DISABLED STATE --- */
//   .button:disabled {
//     opacity: 0.7;
//     cursor: not-allowed;
//   }
//   /* Hide anatomy on disabled button */
//   .button:disabled .hide,
//   .button:disabled .icon::before,
//   .button:disabled .icon::after {
//      opacity: 0;
//      visibility: hidden;
//   }


//   .icon {
//     position: relative;
//   }
//   .icon::before {
//     content: "";
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 6px;
//     height: 6px;
//     transform: translate(-50%, -50%);
//     background-color: #ffffff;
//     border-radius: 100%;
//   }
//   .icon::after {
//     content: "";
//     position: absolute;
//     right: 0;
//     bottom: 0;
//     transform: translate(-19%, -60%);
//     width: 100px;
//     height: 33px;
//     background-color: transparent;
//     border-radius: 12px 22px 2px 2px;
//     border-right: solid 2px #ffffff;
//     border-top: solid 2px transparent;
//   }
//   .icon .text-icon {
//     color: #ffffff;
//     position: absolute;
//     font-size: 12px;
//     left: -37px;
//     top: -38px;
//   }
//   .icon svg {
//     width: 20px;
//     height: 20px;
//     border: solid 2px transparent;
//     display: flex;
//   }
//   .button:hover .icon svg {
//     border: solid 2px #ffffff;
//   }
//   /* Don't show border on disabled hover */
//   .button:disabled:hover .icon svg {
//      border: solid 2px transparent;
//   }

//   .padding-left {
//     position: absolute;
//     width: 20px;
//     height: 2px;
//     background-color: #ffffff;
//     left: 0;
//     top: 50%;
//     transform: translateY(-50%);
//   }
//   .padding-left:before {
//     content: "";
//     width: 2px;
//     height: 10px;
//     background-color: #ffffff;
//     position: absolute;
//     left: 0;
//     top: 50%;
//     transform: translateY(-50%);
//   }
//   .padding-left:after {
//     content: "";
//     width: 2px;
//     height: 10px;
//     background-color: #ffffff;
//     position: absolute;
//     right: 0;
//     top: 50%;
//     transform: translateY(-50%);
//   }
//   .padding-left-line {
//     position: absolute;
//     width: 30px;
//     height: 2px;
//     background-color: #ffffff;
//     left: -24px;
//     top: 11px;
//     transform: rotate(-50deg);
//   }
//   .padding-left-line::before {
//     content: "";
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 6px;
//     height: 6px;
//     transform: translate(-50%, -50%);
//     background-color: #ffffff;
//     border-radius: 100%;
//   }
//   .padding-left-text {
//     color: #ffffff;
//     font-size: 12px;
//     position: absolute;
//     white-space: nowrap;
//     transform: rotate(50deg);
//     bottom: 30px;
//     left: -67px;
//   }

//   .padding-right {
//     position: absolute;
//     width: 20px;
//     height: 2px;
//     background-color: #ffffff;
//     right: 0;
//     top: 50%;
//     transform: translateY(-50%);
//   }
//   .padding-right:before {
//     content: "";
//     width: 2px;
//     height: 10px;
//     background-color: #ffffff;
//     position: absolute;
//     left: 0;
//     top: 50%;
//     transform: translateY(-50%);
//   }
//   .padding-right:after {
//     content: "";
//     width: 2px;
//     height: 10px;
//     background-color: #ffffff;
//     position: absolute;
//     right: 0;
//     top: 50%;
//     transform: translateY(-50%);
//   }
//   .padding-right-line {
//     position: absolute;
//     width: 30px;
//     height: 2px;
//     background-color: #ffffff;
//     right: -24px;
//     top: 11px;
//     transform: rotate(50deg);
//   }
//   .padding-right-line::before {
//     content: "";
//     position: absolute;
//     left: 30px;
//     top: 0;
//     width: 6px;
//     height: 6px;
//     transform: translate(-50%, -50%);
//     background-color: #ffffff;
//     border-radius: 100%;
//   }
//   .padding-right-text {
//     color: #ffffff;
//     font-size: 12px;
//     position: absolute;
//     white-space: nowrap;
//     transform: rotate(-50deg);
//     bottom: 34px;
//     left: 21px;
//   }
//   .background {
//     position: absolute;
//   }
//   .background::before {
//     content: "";
//     position: absolute;
//     right: 27px;
//     bottom: -70px;
//     width: 100px;
//     height: 53px;
//     background-color: transparent;
//     border-radius: 0px 0px 22px 22px;
//     border-right: solid 2px #ffffff;
//     border-bottom: solid 2px transparent;
//   }
//   .background::after {
//     content: "";
//     position: absolute;
//     right: 25px;
//     bottom: -20px;
//     width: 6px;
//     height: 6px;
//     background-color: #ffffff;
//     border-radius: 100%;
//   }
//   .background-text {
//     position: absolute;
//     color: #ffffff;
//     font-size: 12px;
//     bottom: -70px;
//     left: -115px;
//   }
//   .border {
//     position: absolute;
//     right: 0;
//     top: 0;
//   }
//   .border:before {
//     content: "";
//     width: 15px;
//     height: 15px;
//     border: solid 2px #ffffff;
//     position: absolute;
//     right: 0%;
//     top: 0;
//     transform: translate(50%, -50%);
//     border-radius: 100%;
//   }
//   .border:after {
//     content: "";
//     width: 2px;
//     height: 25px;
//     background-color: #ffffff;
//     position: absolute;
//     right: -10px;
//     top: -15px;
//     transform: translate(50%, -50%) rotate(60deg);
//   }
//   .border .border-text {
//     position: absolute;
//     color: #ffffff;
//     font-size: 12px;
//     right: -112px;
//     top: -30px;
//     white-space: nowrap;
//   }
// `;

// export default CalculateButton;

import React from 'react';
import styled from 'styled-components';
// Import the Calculator icon from lucide-react
import { Calculator } from 'lucide-react';

// The component now accepts the same props as your original button
interface CalculateButtonProps {
  onClick: () => void;
  isProcessing: boolean;
}

const CalculateButton: React.FC<CalculateButtonProps> = ({ onClick, isProcessing }) => {
  return (
    <StyledWrapper>
      <button 
        className="button" 
        onClick={onClick} 
        disabled={isProcessing}
      >
        <div className="icon">
          {/* --- TEXT UPDATED --- */}
          <span className="text-icon hide">Scope 1</span>
          {/* Replaced SVG with the Calculator icon */}
          <Calculator 
            className="css-i6dzq1" 
            height={24} 
            width={24} 
            stroke="currentColor"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </div>
        {/* The title is now dynamic */}
        <span className="title"> 
          {isProcessing ? "Calculating..." : "Calculate Emissions"}
        </span>
        <div className="padding-left hide">
          <div className="padding-left-line">
            {/* --- TEXT UPDATED --- */}
            <span className="padding-left-text">Scope 2</span>
          </div>
        </div>
        <div className="padding-right hide">
          <div className="padding-right-line">
            {/* --- TEXT UPDATED --- */}
            <span className="padding-right-text">Scope 3</span>
          </div>
        </div>
        <div className="background hide">
          {/* --- TEXT UPDATED --- */}
          <span className="background-text">Total CO₂e</span>
        </div>
        <div className="border hide">
          {/* --- TEXT UPDATED --- */}
          <span className="border-text">Analytics</span>
        </div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    /* --- SIZE UPDATED --- */
    font-size: 16px;
    background-image: linear-gradient(#10b981, #059669);
    color: white;
    border: solid 2px #047857;
    height: 50px;
    padding: 0px 20px;
    border-radius: 5px;
    font-weight: 600;
    /* --- SIZE UPDATED --- */
    transform: scale(1.0);
    position: relative;
    transition: all 0.2s ease; /* Added transition for disabled state */
  }
  .button:not(:hover) .hide,
  .button:not(:hover) .icon::before,
  .button:not(:hover) .icon::after {
    opacity: 0;
    visibility: hidden;
    transform: scale(1.4);
  }
  .hide {
    transition: all 0.2s ease;
  }
  .button:active {
    background-image: linear-gradient(#059669, #10b981);
    border-color: #059669;
  }

  /* --- NEW: DISABLED STATE --- */
  .button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  /* Hide anatomy on disabled button */
  .button:disabled .hide,
  .button:disabled .icon::before,
  .button:disabled .icon::after {
     opacity: 0;
     visibility: hidden;
  }


  .icon {
    position: relative;
  }
  .icon::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 6px;
    height: 6px;
    transform: translate(-50%, -50%);
    /* --- COLOR UPDATED (Scope 1 Green) --- */
    background-color: #10b981;
    border-radius: 100%;
  }
  .icon::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(-19%, -60%);
    width: 100px;
    height: 33px;
    background-color: transparent;
    border-radius: 12px 22px 2px 2px;
    /* --- COLOR UPDATED (Scope 1 Green) --- */
    border-right: solid 2px #10b981;
    border-top: solid 2px transparent;
  }
  .icon .text-icon {
    /* --- COLOR UPDATED (Scope 1 Green) --- */
    color: #10b981;
    font-weight: 700;
    position: absolute;
    font-size: 12px;
    left: -37px;
    top: -38px;
  }
  .icon svg {
    width: 20px;
    height: 20px;
    border: solid 2px transparent;
    display: flex;
  }
  .button:hover .icon svg {
    border: solid 2px #ffffff;
  }
  /* Don't show border on disabled hover */
  .button:disabled:hover .icon svg {
     border: solid 2px transparent;
  }

  .padding-left {
    position: absolute;
    width: 20px;
    height: 2px;
    /* --- COLOR UPDATED (Scope 2 Blue) --- */
    background-color: #3b82f6;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .padding-left:before {
    content: "";
    width: 2px;
    height: 10px;
    /* --- COLOR UPDATED (Scope 2 Blue) --- */
    background-color: #3b82f6;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .padding-left:after {
    content: "";
    width: 2px;
    height: 10px;
    /* --- COLOR UPDATED (Scope 2 Blue) --- */
    background-color: #3b82f6;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .padding-left-line {
    position: absolute;
    width: 30px;
    height: 2px;
    /* --- COLOR UPDATED (Scope 2 Blue) --- */
    background-color: #3b82f6;
    left: -24px;
    top: 11px;
    transform: rotate(-50deg);
  }
  .padding-left-line::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 6px;
    height: 6px;
    transform: translate(-50%, -50%);
    /* --- COLOR UPDATED (Scope 2 Blue) --- */
    background-color: #3b82f6;
    border-radius: 100%;
  }
  .padding-left-text {
    /* --- COLOR UPDATED (Scope 2 Blue) --- */
    color: #3b82f6;
    font-weight: 700;
    font-size: 12px;
    position: absolute;
    white-space: nowrap;
    transform: rotate(50deg);
    bottom: 30px;
    left: -67px;
  }

  .padding-right {
    position: absolute;
    width: 20px;
    height: 2px;
    /* --- COLOR UPDATED (Scope 3 Purple) --- */
    background-color: #8b5cf6;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .padding-right:before {
    content: "";
    width: 2px;
    height: 10px;
    /* --- COLOR UPDATED (Scope 3 Purple) --- */
    background-color: #8b5cf6;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .padding-right:after {
    content: "";
    width: 2px;
    height: 10px;
    /* --- COLOR UPDATED (Scope 3 Purple) --- */
    background-color: #8b5cf6;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .padding-right-line {
    position: absolute;
    width: 30px;
    height: 2px;
    /* --- COLOR UPDATED (Scope 3 Purple) --- */
    background-color: #8b5cf6;
    right: -24px;
    top: 11px;
    transform: rotate(50deg);
  }
  .padding-right-line::before {
    content: "";
    position: absolute;
    left: 30px;
    top: 0;
    width: 6px;
    height: 6px;
    transform: translate(-50%, -50%);
    /* --- COLOR UPDATED (Scope 3 Purple) --- */
    background-color: #8b5cf6;
    border-radius: 100%;
  }
  .padding-right-text {
    /* --- COLOR UPDATED (Scope 3 Purple) --- */
    color: #8b5cf6;
    font-weight: 700;
    font-size: 12px;
    position: absolute;
    white-space: nowrap;
    transform: rotate(-50deg);
    bottom: 34px;
    left: 21px;
  }
  .background {
    position: absolute;
  }
  .background::before {
    content: "";
    position: absolute;
    right: 27px;
    bottom: -70px;
    width: 100px;
    height: 53px;
    background-color: transparent;
    border-radius: 0px 0px 22px 22px;
    /* --- COLOR RETAINED (White) --- */
    border-right: solid 2px #ffffff;
    border-bottom: solid 2px transparent;
  }
  .background::after {
    content: "";
    position: absolute;
    right: 25px;
    bottom: -20px;
    width: 6px;
    height: 6px;
    /* --- COLOR RETAINED (White) --- */
    background-color: #ffffff;
    border-radius: 100%;
  }
  .background-text {
    position: absolute;
    /* --- COLOR RETAINED (White) --- */
    color: #ffffff;
    font-weight: 700;
    font-size: 12px;
    bottom: -70px;
    left: -115px;
  }
  .border {
    position: absolute;
    right: 0;
    top: 0;
  }
  .border:before {
    content: "";
    width: 15px;
    height: 15px;
    /* --- COLOR UPDATED (Analytics Yellow) --- */
    border: solid 2px #f59e0b;
    position: absolute;
    right: 0%;
    top: 0;
    transform: translate(50%, -50%);
    border-radius: 100%;
  }
  .border:after {
    content: "";
    width: 2px;
    height: 25px;
    /* --- COLOR UPDATED (Analytics Yellow) --- */
    background-color: #f59e0b;
    position: absolute;
    right: -10px;
    top: -15px;
    transform: translate(50%, -50%) rotate(60deg);
  }
  .border .border-text {
    position: absolute;
    /* --- COLOR UPDATED (Analytics Yellow) --- */
    color: #f59e0b; /* Amber/Yellow */
    font-weight: 700;
    font-size: 12px;
    right: -112px;
    top: -30px;
    white-space: nowrap;
  }
`;

export default CalculateButton;