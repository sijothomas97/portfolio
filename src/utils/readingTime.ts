const WORDS_PER_MINUTE = 200;

/**
 * Estimate reading time from raw markdown body.
 * Strips markdown syntax to a rough word count, then divides by an
 * average reading speed. Always returns at least "1 min read".
 */
export function readingTime(markdown: string): string {
  const text = markdown
    .replace(/```[\s\S]*?```/g, '') // fenced code blocks
    .replace(/`[^`]*`/g, '') // inline code
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1') // links/images → their text
    .replace(/[#>*_~`-]/g, ' '); // residual markdown punctuation
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}
