import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer >
        <article>
            <p> Preguntas Frecuentes</p>
            <p> Privacidad</p>
            <p>Centro de Ayuda</p>
        </article>
        <article >
            <h3>Redes Sociales</h3>
            <div className="redes">
              <p><FontAwesomeIcon icon={faInstagram} className="red instagram"></FontAwesomeIcon></p>
              <p><FontAwesomeIcon icon={faWhatsapp} className="red whatsapp"></FontAwesomeIcon></p>
              <p><FontAwesomeIcon icon={faFacebook} className="red facebook"></FontAwesomeIcon></p>
            </div>
            
            
        </article>
        <article>
            <p>Términos de uso</p>
            <p>Contáctanos</p>
            <p>Información</p>
        </article>
    </footer>
  )
}
