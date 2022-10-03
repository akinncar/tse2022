/* eslint-disable @next/next/no-sync-scripts */
import { useEffect, useState } from 'react'
import { ForkMe } from 'fork-me-corner';

/**
 * Decodes HTML entities from strings.
 */
function decodeHTMLEntities(text: string): string {
  var textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}

/**
 * An element that centers text.
 */
function Center(props) {
  return <>
    <div {...props} style={{ textAlign: 'center' }}>{props.children}</div>
  </>
}

export default function Home() {
  const [candList, setCandList] = useState([])
  const [lastHt, setLastHt] = useState('-')
  const [lastDt, setLastDt] = useState('-')
  const [totalAccurated, setTotalAccurated] = useState('-')

  useEffect(() => {
    loadResults()
    setInterval(loadResults, 30000);
  }, [])

  async function loadResults() {
    const response = await fetch('https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json')
    const result = await response.json()
    setCandList(result.cand)
    setLastHt(result.ht)
    setLastDt(result.dt ? result.dt.split('/').reverse().join('-') : '-')

    console.log(result);

    setTotalAccurated(result.psi)
  }

  if (candList.length === 0) return <Center>Carregando...</Center>

  return (
    <div className="container py-4">
      <ForkMe repo="https://github.com/akinncar/tse2022" />

      <header>
        <h1>Eleições presidenciais 2022</h1>
        <p className="text-secondary">Última atualização: <time dateTime={lastDt + ' ' + lastHt}>{lastHt}</time></p>
      </header>

      <main>
        <div className="card mb-4">
          <div className="row w-100 card-body d-flex flex-row align-items-center">
            <div className="col">
              <h6>{totalAccurated}% das seções totalizadas</h6>
              <progress className="w-100" max="100" value={Number(totalAccurated.replace(',', '.'))}>{totalAccurated}%</progress>
            </div>
            <div className="col">
              <button className="btn btn-primary" onClick={loadResults}>Recarregar resultados</button>
            </div>
          </div>
        </div>

        <div className="card">
          <table className="table table-striped-bg m-0">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Porcentagem</th>
                <th scope="col">Votos</th>
              </tr>
            </thead>
            <tbody>
              {candList.map((cand, index) => (
                <tr key={cand.nm}>
                  <th scope="row">{index + 1}</th>
                  <td>{decodeHTMLEntities(cand.nm)}</td>
                  <td>
                    <span className="votes-percentage-textval">{cand.pvap}%</span>
                    <progress style={{ display: 'block', width: '100%' }} className="votes-percentage-progress" max="100" value={Number(cand.pvap.replace(',', '.'))}>{cand.pvap}%</progress>
                  </td>
                  <td>{Number(cand.vap).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Center className="card-footer">
            <button className="btn btn-primary" onClick={loadResults}>Recarregar resultados</button>
          </Center>
        </div>

      </main>

      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossOrigin="anonymous" />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossOrigin="anonymous"></script>
    </div>
  )
}
