let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioCtx;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  volume = 0.3
): void {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch {
    // Audio context may be blocked; ignore errors.
  }
}

export function playTaskCompleteSound(): void {
  playTone(523.25, 0.15, "sine", 0.2);
  setTimeout(() => playTone(659.25, 0.15, "sine", 0.2), 120);
  setTimeout(() => playTone(783.99, 0.25, "sine", 0.2), 240);
}

export function playTimerCompleteSound(): void {
  playTone(440, 0.15, "square", 0.15);
  setTimeout(() => playTone(554, 0.15, "square", 0.15), 150);
  setTimeout(() => playTone(659, 0.15, "square", 0.15), 300);
  setTimeout(() => playTone(880, 0.5, "square", 0.2), 450);
}

export function playAchievementSound(): void {
  const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.25, "triangle", 0.25), i * 120);
  });
}

export function resumeAudioContext(): void {
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
}
