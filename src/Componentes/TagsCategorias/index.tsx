import { AbTags } from "alurabooksbase"

import './TagsCategorias.css'

const TagsCategorias = () => {

    const tags = [
        'Android',
        'Orientação a Objetos',
        'Marketing Digital',
        'Agile',
        'Startups',
        'HTML & CSS',
        'Java',
        'Python',
    ]

    return (<section className="TagsCategorias">
        <h4>CATEGORIAS MAIS BUSCADAS</h4>
        <div className="container">
            {tags.map(tag => <AbTags texto={tag} key={tag} />)}
        </div>
    </section>)
}

export default TagsCategorias