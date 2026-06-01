
type Props = {
  title: string;
  subtitle?: string;
};

export const AuthHeader = ({ title, subtitle }: Props) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <h1 style={{ fontSize: 22, fontWeight: 600 }}>
        {title}
      </h1>

      {subtitle && (
        <p style={{opacity: 0.6, fontSize: 14, marginTop: 6}}>
          {subtitle}
        </p>
      )}
    </div>
  )
}