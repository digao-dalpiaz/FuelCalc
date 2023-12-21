import { useState } from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { VERSION } from "./defs";

export default function Calc() {

  const [precoLitroGas, setPrecoLitroGas] = useState('');
  const [precoLitroAlc, setPrecoLitroAlc] = useState('');

  const [autonomiaGas, setAutonomiaGas] = useState('');
  const [autonomiaAlc, setAutonomiaAlc] = useState('');

  const [quantidadeKm, setQuantidadeKm] = useState('100');

  const [totalGas, setTotalGas] = useState();
  const [totalAlc, setTotalAlc] = useState();

  const [done, setDone] = useState(false);
  const [erro, setErro] = useState();
  const [resultado, setResultado] = useState();

  return (
    <>
      <Container>
        <Row>
          <Col><h1>Calculadora de Combustível</h1></Col>
          <Col md="3" className="text-end">Version {VERSION}</Col>
        </Row>

        <Card>
          <Card.Header>
            <b>Preço de Combustíveis</b>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                Preço por Litro de Gasolina (R$):
                <input type="number" className="form-control"
                  value={precoLitroGas} onChange={ev => setPrecoLitroGas(ev.target.value)} />
              </Col>
              <Col>
                Preço por Litro de Alcool (R$):
                <input type="number" className="form-control"
                  value={precoLitroAlc} onChange={ev => setPrecoLitroAlc(ev.target.value)} />
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <br />

        <Card>
          <Card.Header>
            <b>Autonomia do Carro</b>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                Autonomia por Litro na Gasolina (KM):
                <input type="number" className="form-control"
                  value={autonomiaGas} onChange={ev => setAutonomiaGas(ev.target.value)} />
              </Col>
              <Col>
                Autonomia por Litro no Alcool (KM):
                <input type="number" className="form-control"
                  value={autonomiaAlc} onChange={ev => setAutonomiaAlc(ev.target.value)} />
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <br />

        <Row className="align-items-end">
          <Col>
            Exibir resultados baseados na distância (KM):
            <input type="number" className="form-control"
              value={quantidadeKm} onChange={ev => setQuantidadeKm(ev.target.value)} />
          </Col>
          <Col>
            <Button variant="warning" onClick={executarCalculos}>Calcular usando Computador Quântico</Button>
          </Col>
        </Row>

        <br />

        {erro &&
          <Alert variant="danger">
            <b>{erro}</b>
          </Alert>
        }

        {done &&
          <>
            <table className="table">
              <thead>
                <tr>
                  <th width="50%">Total com Gasolina</th>
                  <th>Total com Alcool</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-end"><h2>R$ {totalGas}</h2></td>
                  <td className="text-end"><h2>R$ {totalAlc}</h2></td>
                </tr>
              </tbody>
            </table>

            <h5>Resultado: <b className="text-success">{resultado}</b></h5>
          </>
        }

        <hr />
        <i>ATENÇÃO: As informações e valores aqui disponibilizados são meramente para fins de demonstração da aplicação Web.
          Para uso real, confira os valores realizando seus próprios cálculos.</i>

      </Container>
    </>
  )

  function executarCalculos() {
    const nQtd = Number(quantidadeKm);

    const nPrecoGas = Number(precoLitroGas);
    const nPrecoAlc = Number(precoLitroAlc);

    const nAutoGas = Number(autonomiaGas);
    const nAutoAlc = Number(autonomiaAlc);

    if (!(nQtd > 0 &&
      nPrecoGas > 0 && nPrecoAlc > 0 &&
      nAutoGas > 0 && nAutoAlc > 0)) {
      setErro('Estão faltando informações!');
      setDone(false);
      return;
    }

    const gas = nPrecoGas * nQtd / nAutoGas;
    const alc = nPrecoAlc * nQtd / nAutoAlc;

    setTotalGas(gas);
    setTotalAlc(alc);

    setErro(false);
    setDone(true);

    setResultado(
      gas < alc ? 'É melhor colocar GASOLINA' :
        alc < gas ? 'É melhor colocar ALCOOL' :
          'Dá tudo na mesma'
    );
  }

}