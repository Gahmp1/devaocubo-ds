import { Geist_400Regular, Geist_500Medium, Geist_600SemiBold, Geist_700Bold } from '@expo-google-fonts/geist'
import { IBMPlexMono_400Regular, IBMPlexMono_600SemiBold, IBMPlexMono_700Bold } from '@expo-google-fonts/ibm-plex-mono'
import { Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold } from '@expo-google-fonts/outfit'
import { createStyles, DSProvider, Press, useTheme } from '@gahmp1/ds-native'
import { themes } from '@gahmp1/ds-theme'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { Linking, ScrollView, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { CatalogIcon } from './src/CatalogIcon'
import { Gallery } from './src/Gallery'

type SchemeChoice = 'system' | 'light' | 'dark'
type MotionChoice = 'system' | boolean

const MOTION_CHOICES: { label: string; value: MotionChoice }[] = [
  { label: 'movimento: sistema', value: 'system' },
  { label: 'movimento: normal', value: false },
  { label: 'movimento: reduzido', value: true },
]

const useStyles = createStyles((t) => {
  const { density: d, shape, color: c, type } = t
  return {
    root: { flex: 1, backgroundColor: c.bg },
    bar: { gap: d.space.xs, padding: d.space.md, borderBottomWidth: shape.borderWidth.thin, borderColor: c.borderMuted },
    row: { gap: d.space.xs },
    chip: { paddingHorizontal: d.space.sm, height: d.control.sm, justifyContent: 'center', borderRadius: shape.radius.full, backgroundColor: c.surface2 },
    chipOn: { backgroundColor: c.accent },
    chipText: { color: c.text, fontSize: type.scale.sm.size },
    chipTextOn: { color: c.onAccent },
  }
})

type Selection = { theme: string; scheme: SchemeChoice; reduced: MotionChoice; screen: string | null }

function Chip({ label, on, onPress }: { label: string; on: boolean; onPress: () => void }) {
  const s = useStyles()
  return (
    <Press component="CatalogChip" interactionId={label} onPress={onPress} accessibilityRole="button" accessibilityState={{ selected: on }} style={[s.chip, on && s.chipOn]}>
      <Text style={[s.chipText, on && s.chipTextOn]}>{label}</Text>
    </Press>
  )
}

function Shell({ sel, set }: { sel: Selection; set: (p: Partial<Selection>) => void }) {
  const s = useStyles()
  return (
    <SafeAreaView style={s.root} edges={['top']}>
      <StatusBar style={useTheme().scheme === 'dark' ? 'light' : 'dark'} />
      <View style={s.bar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.row}>
          {themes.map((t) => <Chip key={t.name} label={t.name} on={t.name === sel.theme} onPress={() => set({ theme: t.name })} />)}
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.row}>
          {(['system', 'light', 'dark'] as const).map((v) => <Chip key={v} label={v} on={v === sel.scheme} onPress={() => set({ scheme: v })} />)}
          {MOTION_CHOICES.map((m) => <Chip key={m.label} label={m.label} on={m.value === sel.reduced} onPress={() => set({ reduced: m.value })} />)}
        </ScrollView>
      </View>
      <Gallery screenId={sel.screen} onSelect={(screen) => set({ screen })} />
    </SafeAreaView>
  )
}

export default function App() {
  const [loaded] = useFonts({
    // Gilroy não vem para o catálogo (licença a verificar): Outfit registrada com os nomes do tema swfitness.
    'Gilroy-Regular': Outfit_400Regular,
    'Gilroy-Medium': Outfit_500Medium,
    'Gilroy-SemiBold': Outfit_600SemiBold,
    IBMPlexMono_400Regular,
    IBMPlexMono_600SemiBold,
    IBMPlexMono_700Bold,
    Geist_400Regular,
    Geist_500Medium,
    Geist_600SemiBold,
    Geist_700Bold,
  })
  const [sel, setSel] = useState<Selection>({ theme: 'swfitness', scheme: 'system', reduced: 'system', screen: null })
  const set = (p: Partial<Selection>) => setSel((prev) => ({ ...prev, ...p }))
  // Deep link ...?theme=somma&scheme=dark&reduced=true&screen=tokens abre direto numa combinação (QA reproduzível sem tocar na tela).
  useEffect(() => {
    const apply = (url: string | null | undefined) => {
      const q = new URLSearchParams(url?.split('?')[1] ?? '')
      const t = q.get('theme')
      const s = q.get('scheme')
      const r = q.get('reduced')
      const screen = q.get('screen')
      setSel((prev) => ({
        theme: t && themes.some((x) => x.name === t) ? t : prev.theme,
        scheme: s === 'system' || s === 'light' || s === 'dark' ? s : prev.scheme,
        reduced: r === 'system' ? 'system' : r === 'true' ? true : r === 'false' ? false : prev.reduced,
        screen: screen ?? prev.screen,
      }))
    }
    Linking.getInitialURL().then(apply)
    const sub = Linking.addEventListener('url', (e) => apply(e.url))
    return () => sub.remove()
  }, [])
  const theme = themes.find((t) => t.name === sel.theme) ?? themes[0]
  if (!loaded) return null
  return (
    <SafeAreaProvider>
      <DSProvider theme={theme} scheme={sel.scheme} reducedMotion={sel.reduced} Icon={CatalogIcon}>
        <Shell sel={sel} set={set} />
      </DSProvider>
    </SafeAreaProvider>
  )
}
