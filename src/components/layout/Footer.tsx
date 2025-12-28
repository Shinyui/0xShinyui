export default function Footer() {
  return (
    <footer
      className="w-full py-6 px-4 text-center text-sm"
      style={{
        color: 'var(--text-muted)',
        borderTop: '1px solid var(--border-color)',
      }}
    >
      ©2025 0xShinyui. All rights reserved. Created with{' '}
      <span style={{ color: 'var(--accent-gold)' }}>❤️</span>
    </footer>
  );
}
