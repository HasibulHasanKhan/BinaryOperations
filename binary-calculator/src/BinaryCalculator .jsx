import { useState } from "react";
import styles from "./BinaryCalculator.module.css";

const BinaryCalculator = () => {
  const [binary1, setBinary1] = useState("10100");
  const [binary2, setBinary2] = useState("01010");
  const [resultAddition, setResultAddition] = useState("");
  const [resultSubtraction, setResultSubtraction] = useState("");
  const [resultMultiplication, setResultMultiplication] = useState("");
  const [resultDivision, setResultDivision] = useState("");

  const padBinary = (bin1, bin2) => {
    const maxLength = Math.max(bin1.length, bin2.length);
    return [bin1.padStart(maxLength, "0"), bin2.padStart(maxLength, "0")];
  };

  const binaryAddition = (bin1, bin2) => {
    [bin1, bin2] = padBinary(bin1, bin2);
    let result = "";
    let carry = 0;

    for (let i = bin1.length - 1; i >= 0; i--) {
      const sum = parseInt(bin1[i]) + parseInt(bin2[i]) + carry;
      result = (sum % 2) + result;
      carry = Math.floor(sum / 2);
    }
    if (carry) {
      result = carry + result;
    }
    return result;
  };

  const binarySubtraction = (bin1, bin2) => {
    [bin1, bin2] = padBinary(bin1, bin2);
    let result = "";
    let borrow = 0;
    for (let i = bin1.length - 1; i >= 0; i--) {
      let diff = parseInt(bin1[i]) - parseInt(bin2[i]) - borrow;
      if (diff < 0) {
        diff += 2;
        borrow = 1;
      } else {
        borrow = 0;
      }
      result = diff + result;
    }
    return result.replace(/^0+(?!$)/, ""); // Remove leading zeros
  };

  const binaryMultiplication = (bin1, bin2) => {
    let result = "0";
    for (let i = bin2.length - 1; i >= 0; i--) {
      if (bin2[i] === "1") {
        let temp = bin1;
        for (let j = 0; j < bin2.length - 1 - i; j++) {
          temp += "0";
        }
        result = binaryAddition(result, temp);
      }
    }
    return result;
  };

  const binaryDivision = (dividend, divisor) => {
    if (divisor === "0") {
      return "Division by zero error";
    }

    let quotient = "";
    let remainder = "";

    for (let i = 0; i < dividend.length; i++) {
      remainder += dividend[i];
      if (parseInt(remainder, 2) >= parseInt(divisor, 2)) {
        quotient += "1";
        remainder = binarySubtraction(remainder, divisor);
      } else {
        quotient += "0";
      }
    }

    return quotient.replace(/^0+(?!$)/, ""); // Remove leading zeros
  };

  const handleAddition = () => {
    setResultAddition(binaryAddition(binary1, binary2));
  };

  const handleSubtraction = () => {
    setResultSubtraction(binarySubtraction(binary1, binary2));
  };

  const handleMultiplication = () => {
    setResultMultiplication(binaryMultiplication(binary1, binary2));
  };

  const handleDivision = () => {
    setResultDivision(binaryDivision(binary1, binary2));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Binary Calculator</h2>
      <div className={styles.operationContainer}>
        <h3 className={styles.operationTitle}>Binary Addition:</h3>
        <div className={styles.inputs}>
          <input
            type="text"
            value={binary1}
            onChange={(e) => setBinary1(e.target.value)}
            className={styles.input}
          />
          +
          <input
            type="text"
            value={binary2}
            onChange={(e) => setBinary2(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleAddition} className={styles.button}>
            Calculate
          </button>
          <div className={styles.result}>Result: {resultAddition}</div>
        </div>
      </div>
      <div className={styles.operationContainer}>
        <h3 className={styles.operationTitle}>Binary Subtraction:</h3>
        <div className={styles.inputs}>
          <input
            type="text"
            value={binary1}
            onChange={(e) => setBinary1(e.target.value)}
            className={styles.input}
          />
          -
          <input
            type="text"
            value={binary2}
            onChange={(e) => setBinary2(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleSubtraction} className={styles.button}>
            Calculate
          </button>
          <div className={styles.result}>Result: {resultSubtraction}</div>
        </div>
      </div>
      <div className={styles.operationContainer}>
        <h3 className={styles.operationTitle}>Binary Multiplication:</h3>
        <div className={styles.inputs}>
          <input
            type="text"
            value={binary1}
            onChange={(e) => setBinary1(e.target.value)}
            className={styles.input}
          />
          *
          <input
            type="text"
            value={binary2}
            onChange={(e) => setBinary2(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleMultiplication} className={styles.button}>
            Calculate
          </button>
          <div className={styles.result}>Result: {resultMultiplication}</div>
        </div>
      </div>
      <div className={styles.operationContainer}>
        <h3 className={styles.operationTitle}>Binary Division:</h3>
        <div className={styles.inputs}>
          <input
            type="text"
            value={binary1}
            onChange={(e) => setBinary1(e.target.value)}
            className={styles.input}
          />
          ÷
          <input
            type="text"
            value={binary2}
            onChange={(e) => setBinary2(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleDivision} className={styles.button}>
            Calculate
          </button>
          <div className={styles.result}>Result: {resultDivision}</div>
        </div>
      </div>
    </div>
  );
};

export default BinaryCalculator;
