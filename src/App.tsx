import { useState, type FormEvent } from 'react'
import './App.css'

type Appointment = { id: string; date: string; time: string; client: string }

const periods = [
  { name: 'Manhã', range: '09h – 12h', times: ['09:00', '10:00', '11:00'] },
  { name: 'Tarde', range: '13h – 18h', times: ['13:00', '14:00', '15:00', '16:00', '17:00'] },
  { name: 'Noite', range: '19h – 21h', times: ['19:00', '20:00'] },
]

function localDate() {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function App() {
  const [date, setDate] = useState(localDate)
  const [agendaDate, setAgendaDate] = useState(localDate)
  const [time, setTime] = useState('')
  const [client, setClient] = useState('')
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [message, setMessage] = useState('')

  function schedule(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const name = client.trim()
    if (!date || !time || !name) {
      setMessage('Informe a data, selecione um horário e preencha o nome do cliente.')
      return
    }
    if (appointments.some((item) => item.date === date && item.time === time)) {
      setMessage('Este horário já está ocupado. Selecione outro horário.')
      setTime('')
      return
    }
    setAppointments((items) => [...items, { id: crypto.randomUUID(), date, time, client: name }])
    setAgendaDate(date)
    setClient('')
    setTime('')
    setMessage('Agendamento realizado para esta sessão.')
  }

  return (
    <main className="layout">
      <section className="booking" aria-labelledby="booking-title">
        <div className="brand"><span aria-hidden="true">✂</span> HairDay</div>
        <form className="booking-content" onSubmit={schedule} noValidate>
          <h1 id="booking-title">Agende um atendimento</h1>
          <p className="intro">Selecione a data e horário para realizar o agendamento.</p>
          <label htmlFor="booking-date">Data</label>
          <input id="booking-date" type="date" value={date} onChange={(event) => { setDate(event.target.value); setTime(''); setMessage('') }} />
          <fieldset className="times">
            <legend>Horários</legend>
            {periods.map((period) => (
              <div className="time-group" key={period.name}>
                <div className="group-heading"><strong>{period.name}</strong><span>{period.range}</span></div>
                <div className="time-options">
                  {period.times.map((slot) => {
                    const occupied = appointments.some((item) => item.date === date && item.time === slot)
                    return <button key={slot} type="button" className="time-slot" disabled={!date || occupied} aria-pressed={time === slot} aria-label={`${slot}${occupied ? ', ocupado' : ''}`} onClick={() => { setTime(slot); setMessage('') }}>{slot}</button>
                  })}
                </div>
              </div>
            ))}
          </fieldset>
          <label htmlFor="client">Cliente</label>
          <input id="client" type="text" placeholder="Nome do cliente" value={client} onChange={(event) => setClient(event.target.value)} />
          <p className="feedback" role="status" aria-live="polite">{message}</p>
          <button className="submit" type="submit">Agendar</button>
        </form>
      </section>
      <section className="agenda" aria-labelledby="agenda-title">
        <div className="agenda-header">
          <div><h2 id="agenda-title">Sua agenda</h2><p>Consulte seus agendamentos por dia.</p></div>
          <div><label className="sr-only" htmlFor="agenda-date">Data da agenda</label><input id="agenda-date" type="date" value={agendaDate} onChange={(event) => setAgendaDate(event.target.value)} /></div>
        </div>
        <div className="agenda-groups">
          {periods.map((period) => {
            const entries = appointments.filter((item) => item.date === agendaDate && period.times.includes(item.time)).sort((a, b) => a.time.localeCompare(b.time))
            return <section className="agenda-card" key={period.name} aria-label={period.name}>
              <div className="card-heading"><strong>{period.name}</strong><span>{period.range}</span></div>
              {entries.length ? <ul>{entries.map((item) => <li key={item.id}><strong>{item.time}</strong><span>{item.client}</span></li>)}</ul> : <p className="empty">Nenhum agendamento neste período.</p>}
            </section>
          })}
        </div>
        <p className="session-note">Os agendamentos ficam disponíveis apenas nesta sessão.</p>
      </section>
    </main>
  )
}

export default App
