import ResultImage from "@images/institute/segunda-casa.jpg";

import antes from "@images/institute/antes.png";
import depois from "@images/institute/depois.png";

import Button from "../Button";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ResultsSection = () => {
  const navigate = useNavigate();
  const blockRef1 = useRef<HTMLDivElement | unknown>(null);
  const blockRef2 = useRef<HTMLDivElement | unknown>(null);

  useEffect(() => {
    const animateOnScroll = () => {
      [blockRef1, blockRef2].forEach((ref) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const inView = rect.top < window.innerHeight && rect.bottom > 0;

          if (inView) {
            ref.current.classList.add("fadeIn");
            ref.current.classList.remove("fadeOut");
          } else {
            ref.current.classList.add("fadeOut");
            ref.current.classList.remove("fadeIn");
          }
        }
      });
    };

    window.addEventListener("scroll", animateOnScroll);
    return () => window.removeEventListener("scroll", animateOnScroll);
  }, []);

  return (
    <div className="results-container">
      <div className="results">
        <h2 className="mt-5 text-secondary">RESULTADOS DO IJB</h2>
        <div className="result-item">
          <div className="text-justify col-12 col-md-6">
            <p>
              Os resultados que alcançamos são refletidos nas histórias de
              superação e nas vidas que foram impactadas pelo nosso trabalho.
              Através de nossos esforços, conseguimos promover inclusão,
              oferecer apoio e criar oportunidades para quem mais precisa. Não é
              apenas sobre o que fazemos, mas sobre as mudanças que
              possibilitamos — mudanças que ecoam em toda a sociedade e geram um
              futuro mais solidário.
            </p>
            <Button
              outline
              variant="secondary"
              onClick={() => {
                navigate("/sobre");
              }}
            >
              SAIBA MAIS
            </Button>
          </div>
          <img
            className="col-12 col-md-6"
            src={ResultImage}
            alt="Resultado-IJB"
          />
        </div>

        <div className="mt-5">
          <h1 className="text-secondary mt-2">Projeto Atual</h1>
          <div className="view">
            <div className="block fadeOut" ref={blockRef1}>
              <h2>Antes</h2>
              <img src={antes} alt="Imagem de Resultado 1" />
            </div>
            <div className="block fadeOut" ref={blockRef2}>
              <h2>Depois</h2>
              <img src={depois} alt="Imagem de Resultado 2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ResultsSection };
