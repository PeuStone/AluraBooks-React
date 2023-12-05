import { Outlet } from "react-router-dom"
import BarraNavegacao from "../../Componentes/BarraNavegacao"
import Rodape from "../../Componentes/Rodape"

const PaginaBase = () => {
    return (<main>
        <BarraNavegacao />
        <Outlet />
        <Rodape />
    </main>)
}

export default PaginaBase