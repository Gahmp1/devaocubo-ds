// Zenith: atoms/Spinner/fluidSpinnerShader.ts (SkSL idêntico; as cores chegam do tema por uniform).
// Porte 1:1 do metaball field de sw-fluid-spinner.js (handoff do design) pra SkSL.
// A JS original reconstrói o field a cada frame na CPU (canvas 2D, 1 thread, teto de 30fps);
// aqui o field roda por pixel na GPU via RuntimeEffect, então não precisa de teto de fps.
// ponytail: NUM_FIELDS fixo em 20 em vez do `5 + round(14*life)` variável da JS original —
// o loop do SkSL exige bound constante em tempo de compilação; como o span (abertura do arco)
// já é controlado por `life` independente da contagem de fontes, 20 fica igual ou mais suave
// que o variável em todo o ciclo. Sem suporte a `blur` (config.blur fica em 0 no uso atual).
export const FLUID_SPINNER_SOURCE = `
uniform float2 resolution;
uniform float time;
uniform float thickness;
uniform float softness;
uniform float opacity;
uniform float3 headColor;
uniform float3 energyColor;
uniform float3 depthColor;
uniform float3 tailColor;

const int NUM_FIELDS = 20;
const float PI = 3.14159265359;

float3 colorAt(float progress) {
  if (progress < 0.22) {
    return mix(headColor, energyColor, smoothstep(0.0, 1.0, progress / 0.22));
  }
  if (progress < 0.62) {
    return mix(energyColor, depthColor, smoothstep(0.0, 1.0, (progress - 0.22) / 0.4));
  }
  return mix(depthColor, tailColor, smoothstep(0.0, 1.0, (progress - 0.62) / 0.38));
}

half4 main(float2 fragCoord) {
  float t = fract(time);

  float life = 0.0;
  if (t < 0.58) {
    life = smoothstep(0.0, 1.0, t / 0.58);
  } else if (t < 0.9) {
    life = 1.0 - smoothstep(0.0, 1.0, (t - 0.58) / 0.32);
  }

  float head = -PI / 2.0 + PI * 4.0 * t;
  float span = PI * (0.22 + 1.42 * life);
  float fieldThickness = thickness * (0.9 + 0.1 * life);

  float2 p = (fragCoord / resolution) * 2.0 - 1.0;

  float field = 0.0;
  float3 colorSum = float3(0.0);

  for (int i = 0; i < NUM_FIELDS; i++) {
    float progress = float(i) / float(NUM_FIELDS - 1);
    float motion = PI * 4.0 * t - progress * 2.65;
    float angle = head - progress * span + 0.045 * sin(motion * 1.9) * sin(PI * progress);
    float radius = 0.46 + 0.04 * sin(motion * 1.45) + 0.012 * sin(motion * 3.2);
    float cosA = cos(angle);
    float sinA = sin(angle);

    float sx = cosA * radius;
    float sy = sinA * radius * 0.94;
    float radial = (0.16 + 0.035 * (1.0 - progress) + 0.018 * sin(motion * 1.15)) * fieldThickness;
    float tangent = (0.205 + 0.03 * cos(motion * 1.4) + 0.012 * sin(motion * 2.7)) * fieldThickness;
    float weight = (0.98 - 0.58 * progress) * (0.58 + 0.42 * life);

    float dx = p.x - sx;
    float dy = p.y - sy;
    float r = dx * cosA + dy * sinA;
    float tg = -dx * sinA + dy * cosA;
    float dist = (r * r) / (radial * radial) + (tg * tg) / (tangent * tangent);
    float influence = exp(-dist * 0.5) * weight;

    field += influence;
    colorSum += influence * colorAt(progress);
  }

  float edgeLow = max(0.03, 0.16 - 0.065 * softness);
  float edgeHigh = 0.72 + 0.7 * softness;
  float alpha = smoothstep(edgeLow, edgeHigh, field) * opacity * (0.76 + 0.24 * life);

  if (alpha <= 0.002 || field <= 0.0) {
    return half4(0.0);
  }

  float body = 0.88 + 0.12 * alpha;
  float3 rgb = (colorSum / field) * body;
  return half4(rgb * alpha, alpha);
}
`
