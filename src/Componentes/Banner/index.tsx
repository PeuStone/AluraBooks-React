import { ReactNode } from "react";
import fundo from './assets/fundo.png';
import './Banner.css'

interface BannerProps {
    titulo?: string
    subtitulo?: string
    children?: ReactNode
}

const Banner = ({ titulo, subtitulo, children }: BannerProps) => {
    return (
        <section className="banner-principal" style={{ backgroundImage: `url(${fundo})` }}>
            <h2>{titulo}</h2>
            <h3>{subtitulo}</h3>
            {children}
        </section>
    )
}

export default Banner