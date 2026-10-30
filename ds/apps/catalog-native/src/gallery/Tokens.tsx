import { contrastRatio, type ColorRoles, type FontFamily, type FontWeight, type TypeStep } from '@gahmp1/ds-theme'
import { createStyles, useTheme, useThemeMotion } from '@gahmp1/ds-native'
import { useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'
import Animated, { cancelAnimation, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated'
import type { GalleryEntry } from '../Gallery'

// Fonte carregada para o peso, se o tema tiver; senão a do sistema com o peso.
const font = (f: FontFamily, w: FontWeight) => (f.native[w] ? { fontFamily: f.native[w] } : { fontWeight: String(w) as '400' })

function ratio(c: ColorRoles, role: keyof ColorRoles): string {
  try {
    return contrastRatio(c[role], c.bg).toFixed(2)
  } catch {
    return 'alfa'
  }
}

const useStyles = createStyles((t) => {
  const { type, density: d, shape, color: c } = t
  const body = type.family.body
  return {
    scroll: { backgroundColor: c.bg },
    content: { padding: d.space.md, gap: d.space.xl },
    section: { gap: d.space.sm },
    h1: { ...font(type.family.display, type.weight.semibold), color: c.text, fontSize: type.scale.xl.size, lineHeight: type.scale.xl.lineHeight },
    h2: { ...font(type.family.display, type.weight.semibold), color: c.text, fontSize: type.scale.lg.size, lineHeight: type.scale.lg.lineHeight },
    text: { ...font(body, type.weight.regular), color: c.text, fontSize: type.scale.sm.size, lineHeight: type.scale.sm.lineHeight },
    label: {
      ...font(body, type.weight.medium), color: c.textMuted, fontSize: type.scale.xs.size, lineHeight: type.scale.xs.lineHeight,
      textTransform: type.labelCase, fontVariant: type.numeric === 'tabular' ? ['tabular-nums'] : [],
    },
    badge: { alignSelf: 'flex-start', backgroundColor: c.warning, borderRadius: shape.radius.full, paddingHorizontal: d.space.xs, paddingVertical: 2 },
    badgeText: { color: c.onWarning },
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: d.space.sm },
    cell: { width: '47%', gap: d.space.xxs },
    swatch: { height: 48, borderRadius: shape.radius.sm, borderWidth: 1, borderColor: c.borderMuted },
    row: { flexDirection: 'row', alignItems: 'center', gap: d.space.sm },
    rowWrap: { flexDirection: 'row', alignItems: 'center', gap: d.space.sm, flexWrap: 'wrap' },
    radiusCell: { alignItems: 'center', gap: d.space.xxs },
    radius: { width: 56, height: 56, backgroundColor: c.surface2, borderWidth: shape.borderWidth.thin, borderColor: c.border },
    bar: { height: 12, backgroundColor: c.accent, borderRadius: 2 },
    control: {
      paddingHorizontal: d.space.md, justifyContent: 'center', backgroundColor: c.accent,
      borderRadius: shape.control === 'pill' ? shape.radius.full : shape.control === 'square' ? 0 : shape.radius.md,
    },
    controlText: { ...font(body, type.weight.medium), color: c.onAccent, fontSize: type.scale.sm.size, textTransform: type.labelCase },
    track: { height: 56, maxWidth: 240, padding: d.space.xs, backgroundColor: c.surface1, borderRadius: shape.radius.md, overflow: 'hidden' },
    box: { width: 40, height: 40, borderRadius: shape.radius.sm, backgroundColor: c.aiOrb },
  }
})

function MotionBox() {
  const s = useStyles()
  const { duration, easing, reduced } = useThemeMotion()
  const x = useSharedValue(0)
  useEffect(() => {
    x.value = 0
    if (reduced) return
    // Mesmo ciclo da página web: anda em duration.base, pausa 2×, volta, pausa 2×.
    const cfg = { duration: duration.base, easing: easing.standard }
    x.value = withRepeat(
      withSequence(withTiming(120, cfg), withDelay(duration.base * 2, withTiming(0, cfg)), withDelay(duration.base * 2, withTiming(0, { duration: 0 }))),
      -1,
    )
    return () => cancelAnimation(x)
  }, [reduced, duration.base, easing.standard, x])
  const animated = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }))
  return <Animated.View testID="motion-box" style={[s.box, animated]} />
}

function Tokens() {
  const theme = useTheme()
  const s = useStyles()
  const { color: c, scheme, motion } = theme
  const steps = Object.keys(theme.type.scale) as TypeStep[]
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <View style={s.section}>
        <Text style={s.h1}>{theme.name} · {scheme === 'dark' ? 'escuro' : 'claro'}</Text>
        {theme.provisional && (
          <View style={s.badge}>
            <Text style={[s.label, s.badgeText]}>provisório</Text>
          </View>
        )}
      </View>

      {/* Movimento logo após o cabeçalho: o estado de "Reduzir movimento" fica visível sem rolar. */}
      <View style={s.section}>
        <Text style={s.h2}>Movimento</Text>
        <View style={s.track}>
          <MotionBox />
        </View>
        <Text style={s.label}>{motion.duration.base} ms · {motion.personality} · {motion.reduced ? 'reduzir movimento: parado' : 'em loop'}</Text>
      </View>

      <View style={s.section}>
        <Text style={s.h2}>Cor (razão contra bg)</Text>
        <View style={s.grid}>
          {(Object.keys(c) as (keyof ColorRoles)[]).map((role) => (
            <View key={role} style={s.cell}>
              <View style={[s.swatch, { backgroundColor: c[role] }]} />
              <Text style={s.text}>{role}</Text>
              <Text style={s.label}>{ratio(c, role)}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={s.section}>
        <Text style={s.h2}>Tipo</Text>
        {steps.map((k) => {
          const st = theme.type.scale[k]
          return (
            <View key={k} style={s.row}>
              <Text style={[s.label, { width: 64 }]}>{k} {st.size}/{st.lineHeight}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ ...font(theme.type.family.display, theme.type.weight.semibold), color: c.text, fontSize: st.size, lineHeight: st.lineHeight }}>Display 1.234,56</Text>
                <Text style={{ ...font(theme.type.family.body, theme.type.weight.regular), color: c.text, fontSize: st.size, lineHeight: st.lineHeight }}>Corpo do texto</Text>
              </View>
            </View>
          )
        })}
      </View>

      <View style={s.section}>
        <Text style={s.h2}>Raio, espaço e controle</Text>
        <View style={s.grid}>
          {Object.entries(theme.shape.radius).map(([k, r]) => (
            <View key={k} style={s.radiusCell}>
              <View style={[s.radius, { borderRadius: r }]} />
              <Text style={s.label}>{k}</Text>
            </View>
          ))}
        </View>
        {Object.entries(theme.density.space).map(([k, w]) => (
          <View key={k} style={s.row}>
            <Text style={[s.label, { width: 40 }]}>{k}</Text>
            <View style={[s.bar, { width: w }]} />
          </View>
        ))}
        <View style={s.rowWrap}>
          {Object.entries(theme.density.control).map(([k, h]) => (
            <View key={k} style={[s.control, { height: h }]}>
              <Text style={s.controlText}>controle {k}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default { id: 'tokens', title: 'Tokens', group: 'fundação', Screen: Tokens } satisfies GalleryEntry
