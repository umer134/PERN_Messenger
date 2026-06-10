type Props = {
  src: string;
};

export const VideoViewer = ({
  src,
}: Props) => {
  return (
    <video
      src={src}
      controls
      autoPlay
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
      }}
    />
  );
};