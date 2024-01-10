import { useState } from 'react';
import './App.css';

function App() {
  const [display,setDisplay] = useState('0');
  const [decimalDisabled, setDecimalDisabled] = useState(false);

  const handleNumber = (e) => {
    const number = e.target.textContent;
    if(display === "0") {
      setDisplay(number);
    }else{
      setDisplay(display + number);
    }
    console.log(String(display));
  }
  
  const cancel = () => {
    setDisplay('0');
    setDecimalDisabled(false);
  }

  const opperateNum = (e) => {
    const opperateNumber = e.target.textContent;

    const lastChars = String(display).split('');
    const lastChar = lastChars[lastChars.length - 1];
    const secondChar = lastChars[lastChars.length - 2];
    console.log(lastChars);
    console.log(lastChar);
    console.log(secondChar);

    const someChars = ['+'||'-'||'*'||'/'];

  // 演算子は最大で2回までしかクリックできない。マイナス以外がターゲットの時直前がマイナスの場合
    if (opperateNumber === '-') {
      if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') {
        // 直前が演算子の場合は直前のマイナスとその前の演算子を削除して新しい演算子を追加
        setDisplay(display + opperateNumber);
        console.log('発火1');
      } else {
        // それ以外の場合は通常の処理
        setDisplay(display + opperateNumber);
        console.log('発火2');
      }
    } else {
      if (lastChar === '+' || lastChar === '*' || lastChar === '/') {
        // 直前が演算子の場合は新しい演算子で置き換え
        setDisplay(display.slice(0, -1) + opperateNumber);
        console.log('発火3');
      } else if(lastChar === '-') {
        if (secondChar === '+' || secondChar === '-' || secondChar === '*' || secondChar === '/') {
          setDisplay(display.slice(0, -2) + opperateNumber);
          console.log('発火4');
        }
      }else{
        setDisplay(display + opperateNumber);
      }
    };
    setDecimalDisabled(false);
  };

const opperateEquol = () => {
  try {
    const result = eval(display);
    if (!isNaN(result)) {
      setDisplay(result.toString());
    } else {
      setDisplay('Error');
    }
  } catch (error) {
    setDisplay('Error');
  }
  setDecimalDisabled(false);
};

  const opperateDecimal = () => {
    if(!decimalDisabled) {
      const lastElements = String(display).split('');
    const lastElement = lastElements[lastElements.length - 1];

    if (lastElement.indexOf('.') === -1) {
      setDisplay(display + '.');
    } else if (lastElement.includes('/') || lastElement.includes('*') || lastElement.includes('-') || lastElement.includes('+')) {
      setDisplay(display + '0.');
    } else {
      setDisplay(display);
    }
    setDecimalDisabled(true);
    }
  };


  return (
    <div className="App">
     <div id='calc'>
      <div id='display'>{display}</div>
      <button id='clear' onClick={cancel}>AC</button>
      <button id='divide' onClick={opperateNum}>/</button>
      <button id='multiply' onClick={opperateNum}>*</button>
      <button id='seven' onClick={handleNumber}>7</button>
      <button id='eight' onClick={handleNumber}>8</button>
      <button id='nine' onClick={handleNumber}>9</button>
      <button id='subtract' onClick={opperateNum}>-</button>
      <button id='four' onClick={handleNumber}>4</button>
      <button id='five' onClick={handleNumber}>5</button>
      <button id='six' onClick={handleNumber}>6</button>
      <button id='add' onClick={opperateNum}>+</button>
      <button id='one' onClick={handleNumber}>1</button>
      <button id='two' onClick={handleNumber}>2</button>
      <button id='three' onClick={handleNumber}>3</button>
      <button id='equals' onClick={opperateEquol}>=</button>
      <button id='zero' onClick={handleNumber}>0</button>
      <button id='decimal' onClick={opperateDecimal}>.</button>
      </div>
    </div>
  );
}

export default App;
