/* eslint-disable @next/next/no-sync-scripts */
import { useEffect, useState } from 'react'
import { ForkMe } from 'fork-me-corner';

/**
 * 
 * @param {string} text 
 * @returns {string}
 */
function decodeHTMLEntities(text) {
  var textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}

export default function Home() {
  const [candList, setCandList] = useState([])
  const [lastHt, setLastHt] = useState('-')
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
    setTotalAccurated(result.psi)
  }

  if (candList.length === 0) return <center>Carregando...</center>

  return (
    <div>
      <ForkMe repo="https://github.com/akinncar/tse2022" />

      <h3>Última atualização: {lastHt}</h3>
      <h3>{totalAccurated}% das seções totalizadas</h3>
      <table className="table table-striped-bg">
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
              <td>{Number(cand.vap).toLocaleString(undefined, {  minimumFractionDigits: 2 })}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <center>
        <button onClick={loadResults}>Recarregar resultados</button>
      </center>

      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous" />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
    </div>
  )
}
