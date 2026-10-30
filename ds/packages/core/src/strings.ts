export type DSStrings = {
  loading: string; clear: string; showPassword: string; hidePassword: string; close: string
  increment: string; decrement: string; send: string; stop: string; record: string; attach: string
  approve: string; reject: string; confirm: string; cancel: string; confirmDestructive: string
  retry: string; scrollToBottom: string; reconnecting: string; showMore: string; showLess: string
  sources: string; files: string; new: string
  waiting: { working: string; searching: string; solving: string; listening: string; waiting: string; retrying: string }
  step: { pending: string; active: string; done: string; error: string }
  tool: { running: string; ok: string; error: string; rejected: string; deferred: string; cancelled: string }
}

export const defaultStrings: DSStrings = {
  loading: 'Carregando',
  clear: 'Limpar',
  showPassword: 'Mostrar senha',
  hidePassword: 'Ocultar senha',
  close: 'Fechar',
  increment: 'Aumentar',
  decrement: 'Diminuir',
  send: 'Enviar',
  stop: 'Parar',
  record: 'Gravar áudio',
  attach: 'Anexar',
  approve: 'Aprovar',
  reject: 'Recusar',
  confirm: 'Confirmar',
  cancel: 'Cancelar',
  confirmDestructive: 'Toque de novo para confirmar',
  retry: 'Tentar de novo',
  scrollToBottom: 'Ir para o fim',
  reconnecting: 'Reconectando…',
  showMore: 'Ver mais',
  showLess: 'Ver menos',
  sources: 'Fontes',
  files: 'Arquivos',
  new: 'Novo',
  waiting: { working: 'Pensando', searching: 'Buscando', solving: 'Resolvendo', listening: 'Ouvindo', waiting: 'Aguardando', retrying: 'Tentando de novo' },
  step: { pending: 'Pendente', active: 'Em andamento', done: 'Concluída', error: 'Falhou' },
  tool: { running: 'Executando', ok: 'Concluída', error: 'Falhou', rejected: 'Recusada', deferred: 'Adiada', cancelled: 'Cancelada' },
}
