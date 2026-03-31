import './App.css'
import assets from './assets/assets'
import { useEffect, useState } from 'react'

const App = () => {

  const [words, setWord] = useState("");
  const [result, setResult] = useState(null);
  const[Error,setError]=useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (!words) return;

    const timer = setTimeout(async () => {
      try {

        setLoading(true);

        const response = await fetch(`https://freedictionaryapi.com/api/v1/entries/en/${words}`);
        if(!response.ok){
          throw new Error("Word Not Found")
        }
        setError('');
        const data = await response.json();
        console.log(data);

        setResult({
          name: data.word,
          pronunciations: data.entries[1]?.pronunciations?.[0]?.text,
          synonyms: data.entries[1]?.synonyms?.[0],
          meaning: data.entries[1]?.senses?.[0]?.definition,
          antonyms: data.entries[0]?.antonyms?.[0],
          verb: data.entries[2]?.senses?.[0]?.definition,
          interjection: data.entries[0]?.senses?.[0]?.examples?.[0]
        });

        setLoading(false);

      }
      catch (err) {
        console.log(err);
        setLoading(false);
      }

    }, 500)

    return () => clearTimeout(timer)

  }, [words])


  return (
    <>
      <div className="header">
        <div className="container">

          <div className="heading">
            <img src={assets.logo} alt="" />
            <h1>Dictionary</h1>
          </div>

          <div className="search">
            <img src={assets.search} alt="" />
            <input
              type="text"
              placeholder='Search Word'
              value={words}
              onChange={(e) =>{
                const value = e.target.value
                setWord(value)
                if(!value.trim()){
                  setResult(null)
                  setError("")
                }
              }
              }
            />
          </div>
        </div>
        {/* Loading Image */}
        {loading && (
          <div className="loading">
            <img src={assets.loading} alt="loading" />
          </div>
        )}

        {/* Result Box */}
        {result && !loading && (
          <div className="box">
            <div className="words">
              <h2>{result.name.toUpperCase()}</h2>
            </div>
            <div className="pronunciations">
              {
                result.pronunciations &&
                (<h3>Pronunciations: <span>{result.pronunciations}</span></h3>)
              }
            </div>

            <div className="synonyms">
              {
                result.synonyms &&
                (<h3>Synonyms: <span>{result.synonyms}</span></h3>)
              }
            </div>

            <div className="meanings">
              {
                result.meaning &&
                (<h3>Definitions: <span>{result.meaning}</span></h3>)
              }
            </div>

            <div className="antonyms">
              {
                result.antonyms &&
                (<h3>Antonyms: <span>{result.antonyms}</span></h3>)
              }
            </div>

            <div className="verbs">
              {
                result.verb &&
                (<h3>Verb: <span>{result.verb}</span></h3>)
              }
            </div>

            <div className="interject">
              {
                result.interjection &&
                (<h3>Interjection: <span>example:- {result.interjection}</span></h3>)
              }
            </div>

          </div>
        )}

      </div>
    </>
  )
};

export default App