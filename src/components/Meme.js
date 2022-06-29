import React from "react"

export default function Meme() {
    // const arr = [1, 2, 3, 4, 5]
    // // console.log(Math.floor(Math.random() * arr.length) + 1);
    // // console.log(memesData.data.memes);
    
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });

    const [allMemes, setAllMemes] = React.useState([]);

    React.useEffect(function() {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, []);
    
    function getMemeImage() {
        const memesArray = allMemes;
        const randomIndex = Math.floor(Math.random() * memesArray.length);
        const url = memesArray[randomIndex].url
        setMeme(function (prevMeme) {
            return {
                ...prevMeme,
                randomImage: url
            }
        })
    }
    console.log(meme);

    function handleChange(event) {
        const {name, value} = event.target;
        setMeme(function (prevMeme) {
            return {
                ...prevMeme,
                [name]: value,
            }
        })
    }
    
    return (
        <div className="meme-container">
            <main>
                <div className="form">
                    <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Top text"
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                    <input
                        type="text"
                        className="form-input" 
                        placeholder="Bottom text" 
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomText}
                    />
                    <button className="form-button" onClick={getMemeImage}>Get a new meme image 🖼</button>
                </div>
                <div className="meme">
                    <h2 className="meme-text top">{meme.topText}</h2>
                    <h2 className="meme-text bottom">{meme.bottomText}</h2>
                    <img src={meme.randomImage} alt="" className="meme-img" />
                </div>
            </main>
        </div>
    )
}