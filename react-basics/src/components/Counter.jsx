import { useState } from "react";

function Counter(){

const [count, setCount] = useState(0);

return(
    <div style={ {marginTop: "1rem"} }>

        <h3>Count: {count}</h3>
        
        <button onClick={() => setCount(count + 1)}>+ Ajouter</button>
        <button onClick={() => setCount(count - 1)}>- Supprimer</button>
    </div>
);
}
export default Counter;