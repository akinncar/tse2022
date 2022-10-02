/* eslint-disable @next/next/no-sync-scripts */
import { useEffect, useState } from 'react'

export default function Home() {
  const [candList, setCandList] = useState([])
  const [lastHt, setLastHt] = useState('-')

  useEffect(() => {
    loadResults()
    setInterval(loadResults, 30000);
  }, [])

  async function loadResults() {
    const response = await fetch('https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json')
    const result = await response.json()
    setCandList(result.cand)
    setLastHt(result.ht)
  }

  if(candList.length === 0) return <center>Carregando...</center>

  return (
    <div>
      <h3>Última atualização: {lastHt}</h3>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Porcentagem</th>
          </tr>
        </thead>
        <tbody>
          {candList.map((cand, index) => (
             <tr key={cand.nm}>
              <th scope="row">{index + 1}</th>
              <td>{cand.nm === 'FELIPE D&apos;AVILA' ? 'FELIPE DÁVILA' : cand.nm}</td>
              <td>{cand.pvap}%</td>
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
