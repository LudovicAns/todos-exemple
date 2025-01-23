import React from 'react';
import {Text, TextLink} from "../composants/catalyst-ui/text.jsx";

function Home(props) {
    document.body.classList.add('bg-zinc-900');
    return (
        <ul>
            <li><Text>Pour s'enregistrer c'est par <TextLink href={"/register"}>ici</TextLink></Text></li>
            <li><Text>Et la Todo List c'est par <TextLink href={"/todos"}>ici</TextLink></Text></li>
        </ul>
    );
}

export default Home;