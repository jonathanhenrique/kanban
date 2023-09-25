export default function Homepage() {
  return (
    <main
      style={{
        backgroundColor: 'var(--bg-color)',
        width: '100%',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'start',
      }}
    >
      <h1
        style={{
          fontSize: '5rem',
        }}
      >
        Kanban
      </h1>
      <div
        style={{
          flex: '1 0 50dvw',
          height: '50dvh',
          backgroundImage: 'url(/public/scrum.svg)',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
    </main>
  );
}
