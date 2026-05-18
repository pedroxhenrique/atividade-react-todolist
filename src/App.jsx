import { useState } from 'react'
import './App.css'

function App() {
  const [tarefas, setTarefas] = useState([
    { id: 1, texto: 'Estudar Inglês', concluida: false },
    { id: 2, texto: 'Estudar Programação em React', concluida: false },
    { id: 3, texto: 'Revisar Banco de Dados', concluida: true },
    { id: 4, texto: 'Entregar atividade da faculdade', concluida: false },
    { id: 5, texto: 'Estudar Lógica de Programação', concluida: true },
    { id: 6, texto: 'Ler material da aula', concluida: false }
  ])
  const [novaTarefa, setNovaTarefa] = useState('')
  const [filtro, setFiltro] = useState('todas')

  const adicionarTarefa = () => {
    if (novaTarefa.trim() === '') return
    const nova = {
      id: Date.now(),
      texto: novaTarefa,
      concluida: false
    }
    setTarefas([...tarefas, nova])
    setNovaTarefa('')
  }

  const alternarConcluida = (id) => {
    setTarefas(tarefas.map(t => 
      t.id === id ? { ...t, concluida: !t.concluida } : t
    ))
  }

  const removerTarefa = (id) => {
    setTarefas(tarefas.filter(t => t.id !== id))
  }

  const tarefasFiltradas = tarefas.filter(t => {
    if (filtro === 'pendentes') return !t.concluida
    if (filtro === 'concluidas') return t.concluida
    return true
  })

  const pendentes = tarefas.filter(t => !t.concluida).length
  const concluidas = tarefas.filter(t => t.concluida).length

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        background: 'rgba(26, 26, 46, 0.6)',
        backdropFilter: 'blur(10px)',
        border: '1px solid #2a2a40',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '550px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
      }}>
        {/* Cabeçalho */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              color: 'white'
            }}>
              ✓
            </div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '600',
              color: 'white',
              margin: 0
            }}>
              Minhas Tarefas
            </h1>
          </div>
          <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>
            Organize seus estudos de forma simples e elegante
          </p>
        </div>

        {/* Campo de adicionar */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <input
            type="text"
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && adicionarTarefa()}
            placeholder="O que precisa ser feito?"
            style={{
              flex: 1,
              background: '#1a1a2e',
              border: '1px solid #2a2a40',
              color: 'white',
              padding: '14px 16px',
              borderRadius: '10px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <button
            onClick={adicionarTarefa}
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              color: 'white',
              border: 'none',
              padding: '0 24px',
              borderRadius: '10px',
              fontWeight: '500',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            + Adicionar
          </button>
        </div>

        {/* Filtros */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '20px',
          justifyContent: 'center'
        }}>
          {[
            { id: 'todas', label: `Todas (${tarefas.length})` },
            { id: 'pendentes', label: `Pendentes (${pendentes})` },
            { id: 'concluidas', label: `Concluídas (${concluidas})` }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFiltro(f.id)}
              style={{
                background: filtro === f.id 
                  ? 'linear-gradient(135deg, #8b5cf6, #3b82f6)' 
                  : 'transparent',
                color: filtro === f.id ? 'white' : '#9ca3af',
                border: filtro === f.id ? 'none' : '1px solid #2a2a40',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Lista de tarefas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {tarefasFiltradas.map(tarefa => (
            <div
              key={tarefa.id}
              style={{
                background: '#1a1a2e',
                border: '1px solid #2a2a40',
                borderRadius: '10px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div
                onClick={() => alternarConcluida(tarefa.id)}
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '6px',
                  border: tarefa.concluida ? 'none' : '2px solid #6b7280',
                  background: tarefa.concluida 
                    ? 'linear-gradient(135deg, #8b5cf6, #3b82f6)' 
                    : 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: 'white',
                  fontSize: '14px'
                }}
              >
                {tarefa.concluida && '✓'}
              </div>
              <span style={{
                flex: 1,
                color: tarefa.concluida ? '#6b7280' : 'white',
                fontSize: '14px',
                textDecoration: tarefa.concluida ? 'line-through' : 'none'
              }}>
                {tarefa.texto}
              </span>
              <button
                onClick={() => removerTarefa(tarefa.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#6b7280',
                  cursor: 'pointer',
                  fontSize: '18px',
                  padding: '4px'
                }}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        {/* Rodapé */}
        <div style={{
          textAlign: 'center',
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: '1px solid #2a2a40'
        }}>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>
            ⚡ Você tem <strong style={{ color: '#8b5cf6' }}>{pendentes} {pendentes === 1 ? 'tarefa' : 'tarefas'}</strong> {pendentes === 1 ? 'pendente' : 'pendentes'}
          </span>
        </div>

        {/* Assinatura */}
        <p style={{
          textAlign: 'center',
          marginTop: '24px',
          fontSize: '11px',
          color: '#4b5563'
        }}>
          Desenvolvido com React ⚛️ | Atividade da Faculdade
        </p>
      </div>
    </div>
  )
}

export default App