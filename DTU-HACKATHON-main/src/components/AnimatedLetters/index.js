import './index.scss'

//class to be applied to charaecters , array of characters , start index to set deplay effect in letters
const AnimatedLetters = ({ letterClass, strArray, idx }) => {
    return (
        <>
            <span>
                {
                    strArray.map((char, i) => (
                        <span key={char + i} className={`${letterClass} _${i + idx}`}>
                            {char}
                        </span>
                    ))
                }
            </span>
        </>
    );
}
export default AnimatedLetters
//we have to return a span 