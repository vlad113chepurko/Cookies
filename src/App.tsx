import Cookies from "js-cookie";
import './App.css'
import { useEffect, useState } from "react";

export default function App() {

  const [theme, setTheme] = useState('white');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [isDinamicContainer, setIsDinamicContainer] = useState(false)
  const [isSettings, setIsSettings] = useState(false);

  useEffect(() => {
    window.onload = () => {
      const GetTheme = Cookies.get('theme');
      const GetName = Cookies.get('username');
      const GetAge = Cookies.get('userage');
      if (GetTheme) {
        document.body.style.backgroundColor = GetTheme;
        setTheme(GetTheme);
      }
      if (GetName) {
        setName(GetName);
      }
      if (GetAge) {
        setAge(GetAge);
      }
    }
  }, [])

  const acceptCookies = () => {
    setIsDinamicContainer(true);
    console.log(isDinamicContainer);
    
    Cookies.set('theme', theme, { expires: 7, path: '/' });
    Cookies.set('username', name, { expires: 7, path: '/' });
    Cookies.set('userage', age, { expires: 7, path: '/' });
  }

  const handleChangeTheme = (e: any) => {
    const currentTheme = e.target.value;
    if (['white', 'black', 'pink'].includes(currentTheme)) {
      document.body.style.backgroundColor = currentTheme;
      setTheme(currentTheme)
    } else {
      return setTheme('white');
    }
  }

  return (
    <div className="wrapper">
      {isSettings ? (
        <main className="settings-container">
          <select name="theme" id="1" onChange={handleChangeTheme}>
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="pink">Pink</option>
          </select>
          <input
            type="text"
            placeholder="Enter name..."
            onChange={(e) => setName(e.target.value)} />
          <input
            type="number"
            placeholder="Enter age..."
            onChange={(e) => setAge(e.target.value)} />
          <button
            onClick={acceptCookies}>Accept Cookies</button>
          <button
            onClick={() => setIsSettings(false)}>Go back</button>
        </main>
      ) : (
        <main className="user-container">
          <section className="name-container">
            <h1>{name}:</h1>
            <h2>{age} years</h2>
          </section>
          <button onClick={() => setIsSettings(true)}>Go to Settings</button>
        </main>
      )}

      {isDinamicContainer ? (
        <div className="dinamic-container">
          <span>Cookies was Accepted!</span>
          <button onClick={() => setIsDinamicContainer(false)}>X</button>
        </div>
      ) : null}
    </div>
  )
}