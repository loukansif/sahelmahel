function createAudioContext(): AudioContext {
  return new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
}

export function playDrumRoll(duration = 2800): void {
  const ctx = createAudioContext();
  const gainNode = ctx.createGain();
  gainNode.connect(ctx.destination);
  let time = ctx.currentTime;
  const totalBeats = Math.floor(duration / 80);
  for (let i = 0; i < totalBeats; i++) {
    const progress = i / totalBeats;
    const bufferSize = ctx.sampleRate * 0.04;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let j = 0; j < bufferSize; j++) {
      data[j] = (Math.random() * 2 - 1) * Math.exp(-j / (bufferSize * 0.15));
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 180 + Math.random() * 40;
    filter.Q.value = 0.8;
    source.connect(filter);
    filter.connect(gainNode);
    gainNode.gain.setValueAtTime(0.35, time);
    source.start(time);
    time += 0.08 * (1 - progress * 0.4) * (1 + progress * 1.5);
  }
}

export function playVictorySound(): void {
  const ctx = createAudioContext();
  const master = ctx.createGain();
  master.gain.setValueAtTime(0.55, ctx.currentTime);
  master.connect(ctx.destination);

  [880, 1100, 1320, 1760].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq * 0.5, ctx.currentTime + i * 0.06);
    osc.frequency.exponentialRampToValueAtTime(freq, ctx.currentTime + i * 0.06 + 0.08);
    gain.gain.setValueAtTime(0.35, ctx.currentTime + i * 0.06);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.06 + 0.55);
    osc.connect(gain); gain.connect(master);
    osc.start(ctx.currentTime + i * 0.06);
    osc.stop(ctx.currentTime + i * 0.06 + 0.6);
  });

  const kick = ctx.createOscillator();
  const kickGain = ctx.createGain();
  kick.type = "sine";
  kick.frequency.setValueAtTime(160, ctx.currentTime);
  kick.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.18);
  kickGain.gain.setValueAtTime(0.7, ctx.currentTime);
  kickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
  kick.connect(kickGain); kickGain.connect(master);
  kick.start(ctx.currentTime); kick.stop(ctx.currentTime + 0.25);
}