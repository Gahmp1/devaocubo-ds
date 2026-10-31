import { createStyles, StatCard, Text } from '@gahmp1/ds-native'
import { useDS } from '@gahmp1/ds-core'
import { ScrollView } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import type { GalleryEntry } from '../Gallery'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.lg },
}))

const W = 160
const H = 40

function Sparkline() {
  const { theme } = useDS()
  return (
    <Svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <Path d="M0 32 L24 26 L48 30 L72 18 L96 22 L120 10 L160 6" fill="none" stroke={theme.color.accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}

function StatCardScreen() {
  const s = useStyles()
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted" label>com delta (sobe, desce, estável)</Text>
      <StatCard label="Sequência" value={12} icon="success" delta={{ value: '+3 dias', direction: 'up' }} />
      <StatCard label="Peso médio" value="72,4 kg" icon="info" delta={{ value: '-1,2 kg', direction: 'down' }} />
      <StatCard label="Sessões" value={8} icon="file" delta={{ value: '0%', direction: 'flat' }} />
      <Text variant="xs" color="textMuted" label>sem delta e sem ícone</Text>
      <StatCard label="Volume total" value="14.320 kg" />
      <Text variant="xs" color="textMuted" label>com minigráfico</Text>
      <StatCard label="Carga na semana" value="3.480 kg" icon="arrow-down" delta={{ value: '+8%', direction: 'up' }} chart={<Sparkline />} />
      <Text variant="xs" color="textMuted" label>rótulo longo quebrando</Text>
      <StatCard label="Média de repetições por série nos últimos trinta dias de treino" value={9.5} delta={{ value: '+0,4', direction: 'up' }} />
    </ScrollView>
  )
}

export default { id: 'stat-card', title: 'StatCard', group: 'composição', Screen: StatCardScreen } satisfies GalleryEntry
