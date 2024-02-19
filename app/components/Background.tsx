import { useEffect, useState } from "react";
import farfalle from "../../assets/farfalle.png";
import fusilli from "../../assets/fusilli.png";
import pasta from "../../assets/pasta.png";
import penne from "../../assets/penne.png";
import "../styles/Background.css";

const ROWS = 10;
const COLS = 10;
const PASTAS = [farfalle, fusilli, pasta, penne];

const pickRandomPasta = () => {
  return PASTAS[Math.floor(Math.random() * PASTAS.length)];
};

const Row = ({ pastas }: { pastas: string[] }) => {
  return (
    <div className="row">
      {Array.from({ length: COLS }).map((_, i) => (
        <img key={i} src={pastas[i]} alt="farfaelle" />
      ))}
    </div>
  );
};

const Background = () => {
  const [arrayOfPastas, setArrayOfPastas] = useState<string[][]>([]);

  useEffect(() => {
    setArrayOfPastas(
      Array.from({ length: ROWS }).map(() =>
        Array.from({ length: COLS }).map(pickRandomPasta),
      ),
    );
  }, []);

  return (
    <div className="background">
      {arrayOfPastas.length > 0 &&
        Array.from({ length: ROWS }).map((_, i) => (
          <Row key={i} pastas={arrayOfPastas[i]} />
        ))}
    </div>
  );
};

export default Background;
