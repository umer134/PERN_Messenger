type Props = {
  src: string;
};

export const AudioViewer = ({
  src,
}: Props) => {
  return (
    <audio
      src={src}
      controls
      autoPlay
      style={{
        width: "100%",
      }}
    />
  );
};